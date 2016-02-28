from tornado import gen
import rethinkdb as r
from dateutil import tz

from . import encryption
from .connection import connection
from ..config import CONFIG


def format_showtime(showtime):
    timezone = tz.gettz(CONFIG.get('timezone'))
    timeformat = "%A %d, %B - %I:%M%p"
    showtime['date_str'] = showtime['date'].astimezone(timezone). \
        strftime(timeformat)
    return showtime


@gen.coroutine
def get_showtimes():
    conn = yield connection()
    result = yield r.table('showtimes').order_by('date').run(conn)
    return list(map(format_showtime, result))


@gen.coroutine
def get_showtime(showid):
    conn = yield connection()
    result = yield r.table('showtimes').get(showid).run(conn)
    return format_showtime(result)


@gen.coroutine
def create_showtime(date, available_tickets=40, shitty_tickets=5):
    conn = yield connection()
    dedup_shows = yield r.table('showtimes').\
        filter(r.row['date'] == date).count().run(conn)
    if dedup_shows:
        raise Exception("Show already exists")
    data = {
        'date': date,
        'max_shitty_booking': shitty_tickets,
        'max_normal_booking': available_tickets,
    }
    result = yield r.table('showtimes').insert(data).run(conn)
    show_id = result['generated_keys'][0]
    yield encryption.create_showtime_keys(show_id)
    return show_id
