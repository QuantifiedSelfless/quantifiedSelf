from tornado import gen
import rethinkdb as r

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
def get_showtimes():
    conn = yield connection()
    result = yield r.table('showtimes').run(conn)
    result = yield dump_cursor(result)
    return result


@gen.coroutine
def get_showtime(id):
    conn = yield connection()
    result = yield r.table('showtimes').get(id).run(conn)
    return result
