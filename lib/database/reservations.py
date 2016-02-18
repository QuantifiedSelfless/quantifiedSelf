from tornado import gen
import rethinkdb as r
from datetime import datetime, timedelta

from ..config import CONFIG
from .utils import dump_cursor
from .connection import connection


@gen.coroutine
def get_reservation_for_user(id):
    conn = yield connection()
    result = yield r.table('showtimes').\
        filter({"user_id": id}).run(conn)
    if result.items:
        return result.items[0]
    return None


@gen.coroutine
def create_ticket_reservation(showtime_id, user_id, is_shitty=False):
    conn = yield connection()
    data = {
        "showtime_id": showtime_id,
        "user_id": user_id,
        "confirmation_code": "",
        "reserved_on": r.now(),
        "is_shitty": is_shitty
    }
    reservations = r.table('reservations')
    yield reservations.filter({"user_id": user_id}).delete().run(conn)
    result = yield reservations.insert(
            data,
            conflict="update").run(conn)
    return result


@gen.coroutine
def remove_expired_tickets():
    conn = yield connection()
    expiration_time = int(CONFIG.get('ticket_expiration'))
    safeDate = datetime.now() - timedelta(seconds=expiration_time)
    safeDate = r.epoch_time(int(safeDate.strftime("%s")))
    result = yield r.table('reservations').\
        filter(r.row['reserved_on'] < safeDate).delete().run(conn)
    return result


@gen.coroutine
def confirm_ticket_reservation(id, confirmation_code, is_shitty=False):
    conn = yield connection()
    result = yield r.table('reservations').get(id).update({
        "confirmation_code": confirmation_code,
        "is_shitty": is_shitty
    }).run(conn)
    return result


@gen.coroutine
def get_reservations_for_showtime(id):
    conn = yield connection()
    result = yield r.table('reservations').\
        filter({"showtime_id": id}).run(conn)
    result = yield dump_cursor(result)
    return result


@gen.coroutine
def get_reservations():
    conn = yield connection()
    result = yield r.table('reservations').run(conn)
    result = yield dump_cursor(result)
    return result
