from tornado import gen
from tornado import web
from tornado import ioloop
from tornado import httpclient
from tornado import escape

from lib.database import user_insert
from lib.database import create_ticket_reservation
from lib.database import get_reservations_for_showtime
from lib.database import get_reservation_for_user
from lib.database import get_showtime
from lib.database import get_user_from_email
from lib.basehandler import BaseHandler
import ujson as json

import uuid

class UserAuth(BaseHandler):
    _ioloop = ioloop.IOLoop().instance()
    @web.asynchronous
    @gen.coroutine
    def post(self):

        params = escape.json_decode(self.request.body)
        name = self.safe_get_argument(params, "name")
        email = self.safe_get_argument(params, "email")
        showtime_id = self.safe_get_argument(params, "showtime_id")

        # Validate the show time
        if showtime_id == None:
            self.error(403, "Must provide showtime_id to proceed.")
            return

        showtime = yield get_showtime(showtime_id)
        if showtime == None:
            self.error(404, "Could not find the selected showtime.")
            return

        if not self.isShowTimeAvailable(showtime):
            self.error(404, "The showtime is sold out.")
            return

        # Validate user and email entries
        if name == None or email == None:
            self.error(403, "Must provide valid username and email address to continue")
            return

        # Grab or create a user
        user = yield get_user_from_email(email)
        print user
        if user != None:
            user_id = user['id']
            self.set_secure_cookie("user_id", user_id)
            # check for any previous confirmed booking
            reservation = yield get_reservation_for_user(user_id)
            if reservation != None and reservation.confirmation_code != "":
                self.error(403, "Sorry, you already have a ticket for the show.")
                return
        else:
            user_id = str(uuid.uuid1())
            self.set_secure_cookie("user_id", user_id)
            data = {"id": str(id), "name":name, "email": email}
            yield user_insert(data)

        # Create a reservation: note that all previous unconfirmed reservations will be lost
        yield create_ticket_reservation(showtime["id"], user_id)
        return

    @gen.coroutine
    def isShowTimeAvailable(showtime):
        allReservations = yield get_reservations_for_showtime(showtime["id"])
        yield (len(allReservations)+40 < showtime["max_booking"])
        return

    def safe_get_argument(self, object, key):
        if key in object:
            return object[key]
        else:
            return None
