from tornado import gen
from tornado import web
from tornado import ioloop

from lib.database import create_showtime, create_showtime_keys
from lib.basehandler import BaseHandler

from dateutil import parser as date_parser
from dateutil import tz


class CreateShowtimeHandler(BaseHandler):
    _ioloop = ioloop.IOLoop().instance()

    @web.asynchronous
    @gen.coroutine
    def get(self):
        date_raw = self.get_argument('date')
        available_tickets = int(self.get_argument('tickets', 40))
        duration = int(self.get_argument('duration', 2))

        timezone = tz.gettz("America/Denver")
        date = date_parser.parse(date_raw).replace(tzinfo=timezone)

        result = yield create_showtime(date, available_tickets, duration)
        yield create_showtime_keys(result)
        return self.api_response(result)
