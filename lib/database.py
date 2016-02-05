import rethinkdb as r
from tornado import gen
from tornado import ioloop

from datetime import datetime, timedelta

from .config import CONFIG

r.set_loop_type("tornado")
connection = None


@gen.engine
def init():
    global connection
    connection = r.connect(
        db=CONFIG.get('rethink_db'),
        host=CONFIG.get('rethink_host'),
        port=int(CONFIG.get('rethink_port'))
    )
    conn = yield connection
    print("Connecting")
    try:
        print("Creating DB")
        yield r.db_create("pilot").run(conn)
    except:
        print("database already exists")

    print("Creating tables")
    conn.use('pilot')
    tryCreateTable(conn, 'deauth')
    tryCreateTable(conn, 'instagram')
    tryCreateTable(conn, 'tumblr')
    tryCreateTable(conn, 'reddit')
    tryCreateTable(conn, 'twitter')
    tryCreateTable(conn, 'spotify')
    tryCreateTable(conn, 'facebook')
    tryCreateTable(conn, 'users')
    tryCreateTable(conn, 'google')
    tryCreateTable(conn, 'showtimes')
    tryCreateTable(conn, 'reservations')

ioloop.IOLoop().instance().add_callback(init)


@gen.coroutine
def tryCreateTable(conn, tableName):
    try:
        yield r.table_create(tableName).run(conn)
        print("created table {0}".format(tableName))
    except:
        print("table {0} already exists".format(tableName))


@gen.coroutine
def create_ticket_reservation(showtime_id, user_id):
    conn = yield connection
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
def get_reservations_for_showtime(id):
    conn = yield connection
    result = yield r.table('reservations').\
        filter({"showtime_id": id}).run(conn)
    result = yield dump_cursor(result)
    return result


@gen.coroutine
def remove_expired_tickets():
    conn = yield connection
    safeDate = datetime.now() - timedelta(seconds=10)
    safeDate = r.epoch_time(int(safeDate.strftime("%s")))
    result = yield r.table('reservations').\
        filter(r.row['reserved_on'] < safeDate).delete().run(conn)
    return result


@gen.coroutine
def confirm_ticket_reservation(id, confirmation_code):
    conn = yield connection
    result = yield r.table('reservations').get(id).update({
        "confirmation_code": confirmation_code
    }).run(conn)
    return result


@gen.coroutine
def get_reservation_for_user(id):
    conn = yield connection
    result = yield r.table('showtimes').\
        filter({"user_id": id}).run(conn)
    if result.items:
        return result.items[0]
    else:
        return None


@gen.coroutine
def get_reservations():
    conn = yield connection
    result = yield r.table('reservations').run(conn)
    result = yield dump_cursor(result)
    return result


@gen.coroutine
def get_showtimes():
    conn = yield connection
    result = yield r.table('showtimes').run(conn)
    result = yield dump_cursor(result)
    return result


@gen.coroutine
def get_showtime(id):
    conn = yield connection
    result = yield r.table('showtimes').get(id).run(conn)
    return result


@gen.coroutine
def dump_cursor(data):
    data_filter = []
    while (yield data.fetch_next()):
        item = yield data.next()
        data_filter.append(item)
    return data_filter


@gen.coroutine
def user_insert(data):
    conn = yield connection
    result = yield r.table('users').insert(
            data,
            conflict="update",
            ).run(conn)
    return result


@gen.coroutine
def get_user(id):
    conn = yield connection
    result = yield r.table('users').get(id).run(conn)
    return result


@gen.coroutine
def get_user_from_email(email):
    conn = yield connection
    result = yield r.table('users').filter({"email": email}).run(conn)
    if result.items:
        return result.items[0]
    else:
        return None


@gen.coroutine
def save_token(provider, user_id, token_data):
    conn = yield connection
    data = {"user_id": user_id, "token": token_data}
    result = yield r.table(provider).insert(
            data,
            conflict='update').run(conn)
    return result


@gen.coroutine
def google_user(data):
    conn = yield connection
    # start grabbing user ID
    result = yield r.table('google').insert(
            data,
            conflict='update',
            ).run(conn)
    return result


@gen.coroutine
def deny(provider, share, user_id):
    conn = yield connection
    result = yield r.table(provider).insert(
            {"id": user_id, "missing_reason": share},
            conflict='update',
            ).run(conn)
    return result


@gen.coroutine
def pop_deauth_request(id):
    conn = yield connection
    result = yield r.table('deauth').\
        get(id).delete(return_changes=True).run(conn)
    return result['changes'][0]['old_val']


@gen.coroutine
def create_deauth_request(id, user_id):
    conn = yield connection
    result = yield r.table('deauth').insert(
        {"id": id, "user_id": user_id},
        conflict='update'
    ).run(conn)
    return result


@gen.coroutine
def delete_user_data(id):
    conn = yield connection
    tables = ['google', 'facebook', 'spotify', 'reddit',
              'tumblr', 'instagram', 'twitter']
    lastResult = None
    for table in tables:
        print(table)
        lastResult = yield r.table(table). \
            filter({'user_id': id}).delete().run(conn)
        print(lastResult)
    lastResult = yield r.table('users').get(id).delete().run(conn)
    return lastResult
