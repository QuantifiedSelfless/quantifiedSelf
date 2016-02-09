from tornado import gen
import rethinkdb as r

from .connection import connection
from .showtimes import get_showtime
from .. import crypto_helper


@gen.coroutine
def create_showtime_keys(showid, passphrase=None):
    show = yield get_showtime(showid)
    if passphrase is None:
        passphrase = crypto_helper.generate_passphrase()
    public_key, private_key = crypto_helper.create_keypair(passphrase)
    shares = crypto_helper.split_passphrase(passphrase)

    conn = yield connection()
    data = {
        'public_key': public_key,
        'private_key': private_key,
        'id': showid,
    }
    result = yield r.table('encryption_show').insert(data).run(conn)
    if not result['errors']:
        # email_sender.send_shares(show, shares)
        # TODO: this
        print(shares)
    return result


@gen.coroutine
def create_user_keys(userid, showid):
    conn = yield connection()
    show_publickey_pem = yield r.table('encryption_show'). \
        get(showid).pluck(['public_key']).run(conn)
    public_key, private_key = crypto_helper.create_keypair()

    show_publickey = crypto_helper.import_key(show_publickey_pem)
    enc_priv_key = crypto_helper.encrypt_blob(show_publickey, private_key)
    data = {
        'public_key': public_key,
        'enc_private_key': enc_priv_key,
        'showid': showid,
        'id': userid
    }
    result = yield r.table('encryption_user').insert(data).run(conn)
    return result


@gen.coroutine
def get_user_publickey(userid):
    conn = yield connection()
    publickey = yield r.table('encryption_user'). \
        get(userid).pluck('public_key').run(conn)
    return crypto_helper.import_key(publickey)
