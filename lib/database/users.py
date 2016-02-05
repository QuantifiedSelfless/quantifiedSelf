from tornado import gen
import rethinkdb as r

from .connection import connection


@gen.coroutine
def user_insert(data):
    conn = yield connection()
    result = yield r.table('users').insert(
            data,
            conflict="update",
            ).run(conn)
    return result


@gen.coroutine
def get_user(id):
    conn = yield connection()
    result = yield r.table('users').get(id).run(conn)
    return result


@gen.coroutine
def get_user_from_email(email):
    conn = yield connection()
    result = yield r.table('users').filter({"email": email}).run(conn)
    if result.items:
        return result.items[0]
    return None
