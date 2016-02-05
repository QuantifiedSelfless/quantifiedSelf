from tornado import gen
from tornado import web
from tornado import ioloop

from lib.database import user_insert
from lib.database import create_ticket_reservation
from lib.database import get_reservations_for_showtime
from lib.database import get_reservation_for_user
from lib.database import get_showtime
from lib.database import get_user_from_email
from lib.basehandler import BaseHandler

import uuid


class UserAuth(BaseHandler):
    _ioloop = ioloop.IOLoop().instance()

    @web.asynchronous
    @gen.coroutine
    def post(self):
        name = self.get_argument("name", None)
        email = self.get_argument("email", None)
        showtime_id = self.get_argument("showtime_id", None)

        # Validate the show time
        if showtime_id is None:
            return self.error(403, "Must provide showtime_id to proceed.")

        showtime = yield get_showtime(showtime_id)
        if showtime is None:
            return self.error(404, "Could not find the selected showtime.")

        if not (yield self.isShowTimeAvailable(showtime)):
            return self.error(404, "The showtime is sold out.")

        # Validate user and email entries
        if name is None or email is None:
            return self.error(
                403,
                "Must provide valid username and email address to continue"
            )

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
            user_id = str(uuid.uuid1())
            self.set_secure_cookie("user_id", user_id)
            data = {"id": str(id), "name": name, "email": email}
            yield user_insert(data)

        # Create a reservation: note that all previous unconfirmed reservations
        # will be lost
        yield create_ticket_reservation(showtime["id"], user_id)

    @gen.coroutine
    def isShowTimeAvailable(self, showtime):
        allReservations = yield get_reservations_for_showtime(showtime["id"])
        return len(allReservations) < showtime["max_booking"]

    def safe_get_argument(self, object, key):
        if key in object:
            return object[key]
        else:
            return None
