from tornado import gen
from tornado import web
from tornado import ioloop

from lib.database import get_showtimes
from lib.database import get_reservations
from lib.database import remove_expired_tickets
from lib.basehandler import BaseHandler

from dateutil import tz


class TicketHandler(BaseHandler):
    _ioloop = ioloop.IOLoop().instance()

    @web.asynchronous
    @gen.coroutine
    def get(self):
        # inefficient databse query, figure out how to perform this query in
        # db.

        # remove all expired tickets
        print(1)
        yield remove_expired_tickets()

        print(2)
        showtimes = yield get_showtimes()
        reservations = yield get_reservations()
        showtime_map = {}
        for reservation in reservations:
            ticket_id = reservation["showtime_id"]
            if ticket_id in showtime_map:
                showtime_map[ticket_id] += 1
            else:
                showtime_map[ticket_id] = 1

        print(3)
        result = []
        timezone = tz.gettz("America/Denver")
        timeformat = "%A %d, %B - %I:%M%p"
        for showtime in showtimes:
            showid = showtime["id"]
            dateString = showtime["start_date"]. \
                astimezone(timezone). \
                strftime(timeformat)

            if showid in showtime_map:
                available_tickets = \
                        showtime["max_booking"] - showtime_map[showid]
                if available_tickets < 0:
                    available_tickets = 0
            else:
                available_tickets = showtime["max_booking"]

            result.append({"id": showid,
                           "date": dateString,
                           "available_tickets": available_tickets,
                           "duration": showtime["duration"]})

        print(4)
        self.write({"result": result})
