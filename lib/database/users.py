from tornado import gen
import rethinkdb as r

from .connection import connection
from .encryption import create_user_keys


@gen.coroutine
def user_insert(name, email, showid):
    conn = yield connection()
    result = yield r.table('users').insert({
        "name": name,
        "email": email,
        "status": "signup",
    }, conflict="update").run(conn)
    user_id = result['generated_keys'][0]
    yield create_user_keys(user_id, showid)
    return user_id


@gen.coroutine
def user_set_status(uid, status):
    conn = yield connection()
    result = yield r.table('users').get(uid).\
        update({'status': status}).run(conn)
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
