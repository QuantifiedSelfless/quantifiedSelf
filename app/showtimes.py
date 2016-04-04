from tornado import gen
from tornado import web
from tornado import ioloop

from lib.database.showtimes import get_showtimes
from lib.database.reservations import get_reservations
from lib.database.reservations import remove_expired_tickets
from lib.database.showtimes import create_showtime
from lib.database.encryption import get_show_privatekey
from lib.database.encryption import get_user_keypair_from_showid
from lib.database.auth import get_user_tokens
from lib.basehandler import BaseHandler
from lib.basehandler import secured
from lib.config import CONFIG

from dateutil import parser as date_parser
from dateutil import tz
import cryptohelper


class ShowtimeAccessTokens(BaseHandler):
    _ioloop = ioloop.IOLoop().instance()

    @web.asynchronous
    @gen.coroutine
    def get(self):
        showid = self.get_argument('showtime_id')
        shares = self.get_arguments('share')
        passphrase = self.get_argument('passphrase', None)
        if not passphrase:
            passphrase = cryptohelper.recover_passphrase(shares)
        if not (bool(shares) ^ bool(passphrase)):
            return self.error(
                400,
                'Either shares or passphrase needs to be provided'
            )
        privkey_show = yield get_show_privatekey(showid, passphrase)

        result = {
            'showid': showid,
            'users': [],
        }
        users = yield get_user_keypair_from_showid(showid)
        for user in users:
            user_id = user['id']
            user_privkey_pem = cryptohelper.decrypt_blob(
                privkey_show,
                user['enc_private_key']
            )
            cur_result = {
                'id': user_id,
                'publickey': user['public_key'],
                'privatekey': user_privkey_pem,
                'services': {},
            }
            user_privkey = cryptohelper.import_key(user_privkey_pem)
            access_tokens = yield get_user_tokens(user_id)
            if access_tokens is not None:
                for key, value in access_tokens.items():
                    if not isinstance(value, bytes):
                        continue
                    cur_result['services'][key] = cryptohelper.decrypt_blob(
                        user_privkey,
                        value
                    )
                result['users'].append(cur_result)
        return self.api_response(result)


@secured
class CreateShowtimeHandler(BaseHandler):
    _ioloop = ioloop.IOLoop().instance()

    @web.asynchronous
    @gen.coroutine
    def get(self):
        date_raw = self.get_argument('date')
        available_tickets = int(self.get_argument('tickets', 40))
        shitty_tickets = int(self.get_argument('shitty_tickets', 5))

        timezone = tz.gettz(CONFIG.get('timezone'))
        date = date_parser.parse(date_raw).replace(tzinfo=timezone)

        showid = yield create_showtime(date, available_tickets, shitty_tickets)
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
        showtime_map = {}  # Tuple (normal_tickets, shitty_tickets)
        for reservation in reservations:
            ticket_id = reservation["showtime_id"]
            ticketTuple = showtime_map.get(ticket_id, (0, 0))
            if reservation['is_shitty']:
                ticketTuple = (ticketTuple[0], ticketTuple[1]+1)
            else:
                ticketTuple = (ticketTuple[0]+1, ticketTuple[1])
            showtime_map[ticket_id] = ticketTuple

        result = []
        for showtime in showtimes:
            showid = showtime["id"]
            dateString = showtime["date_str"]

            if showid in showtime_map:
                available_tickets = \
                    showtime["max_normal_booking"]\
                    - showtime_map[showid][0]
                if available_tickets < 0:
                    available_tickets = 0
                available_shitty_tickets = \
                    showtime["max_shitty_booking"]\
                    - showtime_map[showid][1]
                if available_shitty_tickets < 0:
                    available_shitty_tickets = 0
            else:
                available_tickets = showtime["max_normal_booking"]
                available_shitty_tickets = showtime["max_shitty_booking"]
            result.append({
                "id": showid,
                "date": dateString,
                "available_tickets": available_tickets,
                "shitty_tickets": available_shitty_tickets
            })
        self.api_response(result)
