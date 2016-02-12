from tornado import gen
from tornado import web
from tornado import ioloop

from lib.database import get_showtimes
from lib.database import get_reservations
from lib.database import remove_expired_tickets
from lib.database import create_showtime
from lib.database import get_show_privatekey
from lib.database import get_user_privatekey_from_showid
from lib.database import get_user_tokens
from lib.basehandler import BaseHandler
from lib.config import CONFIG

from dateutil import parser as date_parser
from dateutil import tz
import cryptohelper


class ShowtimeAccessTokens(BaseHandler):
    _ioloop = ioloop.IOLoop().instance()

    @web.asynchronous
    @gen.coroutine
    def get(self):
        showid = self.get_argument('showid')
        shares = self.get_arguments('share')
        passphrase = cryptohelper.recover_passphrase(shares)
        privkey_show = yield get_show_privatekey(showid, passphrase)

        result = {
            'showid': showid,
            'users': [],
        }
        users = yield get_user_privatekey_from_showid(showid)
        for user in users:
            user_id = user['id']
            user_privkey_pem = cryptohelper.decrypt_blob(
                privkey_show,
                user['enc_private_key']
            )
            cur_result = {'id': user_id}
            user_privkey = cryptohelper.import_key(user_privkey_pem)
            access_tokens = yield get_user_tokens(user_id)
            for key, value in access_tokens.items():
                if not isinstance(value, bytes):
                    continue
                cur_result[key] = cryptohelper.decrypt_blob(
                    user_privkey,
                    value
                )
            result['users'].append(cur_result)
        return self.api_response(result)


class CreateShowtimeHandler(BaseHandler):
    _ioloop = ioloop.IOLoop().instance()

    @web.asynchronous
    @gen.coroutine
    def get(self):
        date_raw = self.get_argument('date')
        available_tickets = int(self.get_argument('tickets', 40))

        timezone = tz.gettz(CONFIG.get('timezone'))
        date = date_parser.parse(date_raw).replace(tzinfo=timezone)

        showid = yield create_showtime(date, available_tickets)
        return self.api_response({'showid': showid})


class ListShowtimesHandler(BaseHandler):
    _ioloop = ioloop.IOLoop().instance()

    @web.asynchronous
    @gen.coroutine
    def get(self):
        # inefficient databse query, figure out how to perform this query in
        # db.

        # remove all expired tickets
        yield remove_expired_tickets()

        showtimes = yield get_showtimes()
        reservations = yield get_reservations()
        showtime_map = {}
        for reservation in reservations:
            ticket_id = reservation["showtime_id"]
            if ticket_id in showtime_map:
                showtime_map[ticket_id] += 1
            else:
                showtime_map[ticket_id] = 1

        result = []
        timezone = tz.gettz(CONFIG.get('timezone'))
        timeformat = "%A %d, %B - %I:%M%p"
        for showtime in showtimes:
            showid = showtime["id"]
            dateString = showtime["date"]. \
                astimezone(timezone). \
                strftime(timeformat)

            if showid in showtime_map:
                available_tickets = \
                        showtime["max_booking"] - showtime_map[showid]
                if available_tickets < 0:
                    available_tickets = 0
            else:
                available_tickets = showtime["max_booking"]
            result.append({
                "id": showid,
                "date": dateString,
                "available_tickets": available_tickets,
            })
        self.api_response(result)
