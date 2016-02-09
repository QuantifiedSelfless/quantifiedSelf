from tornado import gen
import rethinkdb as r

from .connection import connection
from .encryption import create_user_keys


@gen.coroutine
def user_insert(user_id, name, email, showid):
    yield create_user_keys(user_id, showid)
    conn = yield connection()
    result = yield r.table('users').insert({
        "id": user_id,
        "name": name,
        "email": email,
    }, conflict="update").run(conn)
    return result


@gen.coroutine
def get_user(uid):
    conn = yield connection()
    result = yield r.table('users').get(uid).run(conn)
    return result


@gen.coroutine
def get_user_from_email(email):
    conn = yield connection()
    result = yield r.table('users').filter({"email": email}).run(conn)
    if result.items:
        return result.items[0]
    return None
