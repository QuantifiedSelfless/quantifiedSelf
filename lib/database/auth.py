from tornado import gen
import rethinkdb as r
import cryptohelper

from .connection import connection
from .encryption import get_user_publickey


@gen.coroutine
def pop_deauth_request(id):
    conn = yield connection()
    result = yield r.table('deauth').\
        get(id).delete(return_changes=True).run(conn)
    if result['changes']:
        return result['changes'][0]['old_val']
    return None


@gen.coroutine
def create_deauth_request(id, user_id):
    conn = yield connection()
    result = yield r.table('deauth').insert(
        {"id": id, "user_id": user_id},
        conflict='update'
    ).run(conn)
    return result


@gen.coroutine
def delete_user_data(user_id):
    conn = yield connection()
    auth = yield r.table('auth').get(user_id).delete().run(conn)
    user = yield r.table('users').get(user_id).delete().run(conn)
    encryption = yield r.table('encryption_user').get(user_id).delete().run(conn)
    return auth, user, encryption


@gen.coroutine
def save_token(provider, user_id, token_data):
    publickey = yield get_user_publickey(user_id)
    token_data_enc = cryptohelper.encrypt_blob(publickey, token_data)
    conn = yield connection()
    data = {
        "id": user_id,
        provider: token_data_enc,
    }
    result = yield r.table('auth').insert(data, conflict='update').run(conn)
    return result


@gen.coroutine
def deny(provider, user_id, reason):
    data = {"denied": reason}
    return (yield save_token(provider, user_id,  data))


@gen.coroutine
def get_user_tokens(user_id):
    conn = yield connection()
    result = yield r.table('auth').get(user_id).run(conn)
    return result
