from tornado import gen
from tornado import web
from tornado import ioloop

import uuid

from lib.database.users import user_insert
from lib.database.users import get_user_from_email
from lib.database.reservations import create_ticket_reservation
from lib.database.reservations import confirm_ticket_reservation
from lib.database.reservations import change_reservation_showtime
from lib.database.reservations import get_reservations_for_showtime
from lib.database.reservations import get_reservation_for_user
from lib.database.promotion_keys import pop_promotion_key
from lib.database.showtimes import get_showtime
from lib.basehandler import BaseHandler


class UserAuth(BaseHandler):
    _ioloop = ioloop.IOLoop().instance()

    @web.asynchronous
    @gen.coroutine
    def post(self):
        name = self.get_argument("name", None)
        email = self.get_argument("email", None)
        showtime_id = self.get_argument("showtime_id", None)
        promo_code = self.get_argument('promotion_key', None)

        # Validate user and email entries
        if name is None or email is None:
            return self.error(
                403,
                "Must provide valid username and email address to continue"
            )

        # Validate the show time
        if showtime_id is None:
            return self.error(400, "Must provide 'showtime_id' to proceed.")

        showtime = yield get_showtime(showtime_id)
        if showtime is None:
            return self.error(404, "Could not find the selected showtime.")

        if not (yield self.canBookTicketForShowtime(showtime, promo_code)):
            return self.error(400, "This showtime is sold out.")

        # Grab or create a user
        user = yield get_user_from_email(email)
        if user is not None:
            user_id = user['id']
            self.set_secure_cookie("user_id", user_id)
            # check for any previous confirmed booking
            reservation = yield get_reservation_for_user(user_id)
            if reservation is not None and reservation.confirmation_code != "":
                return self.error(
                    403,
                    "Sorry, you already have a ticket for the show."
                )
        else:
            user_id = yield user_insert(name, email, showtime_id)
            self.set_secure_cookie("user_id", user_id)

        # Create a reservation: note that all previous unconfirmed reservations
        # will be lost
        yield create_ticket_reservation(showtime["id"], user_id)

    @gen.coroutine
    def put(self):
        ticket_type = self.get_argument("type", "normal")
        showtime_id = self.get_argument("showtime_id", None)
        user_id = self.get_secure_cookie("user_id", None)

        if user_id is None:
            return self.error(403, "Must include the user cookie")

        # Now grab the reservation
        reservation = yield get_reservation_for_user(user_id)
        if reservation is None:
            return self.error(403, "There is no reservation for this account.")

        confirmation_code = str(uuid.uuid1)
        if ticket_type == "shitty":
            # Confirm a shitty ticket_type
            if reservation['showtime_id'] == showtime_id:
                yield confirm_ticket_reservation(
                    reservation['id'], confirmation_code, True)
            else:
                yield self.change_showtime(showtime_id, reservation,
                                         confirmation_code)
        else:
            # TODO: check the access_tokens, make sure we have enough.
            yield confirm_ticket_reservation(
                reservation['id'], confirmation_code, False)
        self.clear_cookie('user_id')

    @gen.coroutine
    def change_showtime(self, showtime_id, reservation, confirmation_code):
        showtime = yield get_showtime(showtime_id)
        if showtime is None:
            return self.error(404, "Showtime not found!")

        if not (yield self.isShowTimeAvailable(showtime, True)):
            return self.error(400, "Ticket is not available any more.")

        yield change_reservation_showtime(
            reservation['id'], showtime_id)

        yield confirm_ticket_reservation(
            reservation['id'], confirmation_code, True)

    @gen.coroutine
    def isShowTimeAvailable(self, showtime, is_shitty=False):
        allReservations = yield get_reservations_for_showtime(showtime["id"])
        if is_shitty:
            fieldName = "max_shitty_booking"
        else:
            fieldName = "max_normal_booking"
        return len(allReservations) < showtime[fieldName]

    @gen.coroutine
    def canBookTicketForShowtime(self, showtime, promo_code):
        if (yield self.isShowTimeAvailable(showtime)):
            return True
        if promo_code is None:
            return False
        promotion_key = yield pop_promotion_key(promo_code)
        return promotion_key is not None and\
            promotion_key['showtime_id'] == showtime['id']
