import rethinkdb as r
from tornado import gen


from ..config import CONFIG
from .utils import try_create_table

r.set_loop_type("tornado")
_connection = None


@gen.coroutine
def connection():
    global _connection
    if _connection is None:
        _connection = yield init()
    conn = yield _connection
    return conn


@gen.coroutine
def init():
    print("starting db init")
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
    conn.use(CONFIG.get('rethink_db'))
    yield try_create_table(conn, 'deauth')
    yield try_create_table(conn, 'users')
    yield try_create_table(conn, 'auth')
    yield try_create_table(conn, 'showtimes')
    yield try_create_table(conn, 'reservations')
    yield try_create_table(conn, 'encryption_show')
    yield try_create_table(conn, 'encryption_user')
    return connection
