from tornado import gen
import rethinkdb as r
from datetime import datetime, timedelta

from .utils import dump_cursor
from .connection import connection


@gen.coroutine
def create_ticket_reservation(showtime_id, user_id):
    conn = yield connection()
    data = {
        "showtime_id": showtime_id,
        "user_id": user_id,
        "confirmation_code": "",
        "reserved_on": r.now()
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
    safeDate = datetime.now() - timedelta(seconds=10)
    safeDate = r.epoch_time(int(safeDate.strftime("%s")))
    result = yield r.table('reservations').\
        filter(r.row['reserved_on'] < safeDate).delete().run(conn)
    return result


@gen.coroutine
def confirm_ticket_reservation(id, confirmation_code):
    conn = yield connection()
    result = yield r.table('reservations').get(id).update({
        "confirmation_code": confirmation_code
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
