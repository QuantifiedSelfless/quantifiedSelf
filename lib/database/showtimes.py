from tornado import gen
import rethinkdb as r

from .encryption import create_showtime_keys
from .connection import connection


@gen.coroutine
def get_showtimes():
    conn = yield connection()
    result = yield r.table('showtimes').order_by('date').run(conn)
    return result


@gen.coroutine
def get_showtime(showid):
    conn = yield connection()
    result = yield r.table('showtimes').get(showid).run(conn)
    return result


@gen.coroutine
def create_showtime(date, available_tickets=40):
    conn = yield connection()
    dedup_shows = yield r.table('showtimes').\
        filter(r.row['date'] == date).count().run(conn)
    if dedup_shows:
        raise Exception("Show already exists")
    data = {
        'date': date,
        'available_tickets': available_tickets,
        'max_booking': available_tickets,
    }
    result = yield r.table('showtimes').insert(data).run(conn)
    show_id = result['generated_keys'][0]
    yield create_showtime_keys(show_id)
    return show_id
