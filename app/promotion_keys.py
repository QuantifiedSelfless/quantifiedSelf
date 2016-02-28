from tornado import gen
from tornado import web
from tornado import ioloop

from lib.database.showtimes import get_showtime
from lib.database.promotion_keys import create_promotion_key
from lib.database.promotion_keys import get_promotion_keys
from lib.basehandler import BaseHandler


class PromotionKeysHandler(BaseHandler):
    _ioloop = ioloop.IOLoop().instance()

    @web.asynchronous
    @gen.coroutine
    def post(self):
        showtime_id = self.get_argument('showtime_id', None)
        count = int(self.get_argument('count', 1))

        if showtime_id is None:
            return self.error(400, "Must provide 'showtime_id' to proceed.")

        # Verify that such a show exists.
        showtime = yield get_showtime(showtime_id)
        if showtime is None:
            return self.error(404, "Show time not found.")

        promotion_keys = yield [create_promotion_key(showtime_id)
                                for _ in range(count)]

        self.api_response({'promotion_keys': promotion_keys}, 201)

    @web.asynchronous
    @gen.coroutine
    def get(self):
        promotion_keys = yield get_promotion_keys()
        self.api_response(promotion_keys)
