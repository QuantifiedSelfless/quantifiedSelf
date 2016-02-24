from tornado import gen
import rethinkdb as r

from .connection import connection


@gen.coroutine
def get_promotion_keys():
    conn = yield connection()
    result = yield r.table('promotion_keys').run(conn)
    return result


@gen.coroutine
def pop_promotion_key(promotion_key):
    conn = yield connection()
    result = yield r.table('promotion_keys').\
        get(promotion_key).delete(return_changes=True).run(conn)
    if result['changes']:
        return result['changes'][0]['old_val']
    return None


@gen.coroutine
def create_promotion_key(showtime_id):
    conn = yield connection()
    data = {
        'showtime_id': showtime_id
    }
    result = yield r.table('promotion_keys').insert(data).run(conn)
    promotion_key = result['generated_keys'][0]
    return promotion_key
