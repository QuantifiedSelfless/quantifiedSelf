from tornado import gen
import rethinkdb as r

from .connection import connection


@gen.coroutine
def pop_deauth_request(id):
    conn = yield connection()
    result = yield r.table('deauth').\
        get(id).delete(return_changes=True).run(conn)
    return result['changes'][0]['old_val']


@gen.coroutine
def create_deauth_request(id, user_id):
    conn = yield connection()
    result = yield r.table('deauth').insert(
        {"id": id, "user_id": user_id},
        conflict='update'
    ).run(conn)
    return result


@gen.coroutine
def delete_user_data(id):
    conn = yield connection()
    auth = yield r.table('auth').get(id).delete().run(conn)
    user = yield r.table('users').get(id).delete().run(conn)
    return auth, user


@gen.coroutine
def save_token(provider, user_id, token_data):
    conn = yield connection()
    data = {
        "id": user_id,
        provider: {
            "token": token_data,
        }
    }
    result = yield r.table('auth').insert(data, conflict='update').run(conn)
    return result


@gen.coroutine
def deny(provider, share, user_id):
    conn = yield connection()
    result = yield r.table('auth').insert({
        "id": user_id,
        provider: {
            "error": share,
            "token": None,
        }
    }, conflict='update',).run(conn)
    return result
