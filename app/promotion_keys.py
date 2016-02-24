from tornado import gen
from tornado import web
from tornado import ioloop

from lib.database.showtimes import get_showtime
from lib.database.promotion_keys import create_promotion_key
from lib.database.promotion_keys import get_promotion_keys
from lib.basehandler import BaseHandler
from lib.config import CONFIG


class PromotionKeysHandler(BaseHandler):
    _ioloop = ioloop.IOLoop().instance()

    @web.asynchronous
    @gen.coroutine
    def post(self):
        showtime_id = self.get_argument('showtime_id', None)

        if showtime_id is None:
            self.error(400, "Must provide 'showtime_id' as url parameter.")
            return

        # Verify that such a show exists.
        showtime = yield get_showtime(showtime_id)
        if showtime is None:
            self.error(404, "Show time not found.")
            return

        promotion_key = yield create_promotion_key(showtime_id)
        self.set_header("Location", "{0}/api/promotion_keys/{1}".
                        format(CONFIG.get("base_url"), promotion_key))
        self.api_response({'promotion_key': promotion_key}, 201)

    @web.asynchronous
    @gen.coroutine
    def get(self):
        promotion_keys = yield get_promotion_keys()
        self.api_response(promotion_keys)