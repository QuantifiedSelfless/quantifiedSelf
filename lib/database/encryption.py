from tornado import gen
import rethinkdb as r
import cryptohelper

from .utils import dump_cursor
from .connection import connection
from ..email_sender import send_email
from ..config import CONFIG


@gen.coroutine
def create_showtime_keys(showid, passphrase=None):
    if passphrase is None:
        passphrase = cryptohelper.generate_passphrase()
    share_email = list(map(str.strip, CONFIG.get('shares_email').split(',')))
    share_threshold = int(CONFIG.get("shares_threshold"))
    num_shares = len(share_email)
    if share_threshold >= 2:
        shares = cryptohelper.split_passphrase(
            passphrase,
            share_threshold=share_threshold,
            num_shares=num_shares,
        )
    else:
        shares = [passphrase, ] * num_shares
    public_key, private_key = cryptohelper.create_keypair(passphrase)
    conn = yield connection()
    data = {
        'public_key': public_key,
        'private_key': private_key,
        'id': showid,
    }
    result = yield r.table('encryption_show').insert(data).run(conn)
    if not result['errors']:
        from .showtimes import get_showtime
        showtime = yield get_showtime(showid)
        meta = {
            "show_date": showtime['date_str'],
            "share_threshold": share_threshold,
        }
        for email, share in zip(share_email, shares):
            meta['share'] = share
            yield send_email(
                email,
                "[{}] Showtime Password".format(showtime['date_str']),
                "show_code.html",
                meta
            )
    return result


@gen.coroutine
def create_user_keys(userid, showid):
    conn = yield connection()
    public_key, private_key = cryptohelper.create_keypair()
    show_publickey = yield get_show_publickey(showid)
    enc_priv_key = cryptohelper.encrypt_blob(show_publickey, private_key)
    data = {
        'public_key': public_key,
        'enc_private_key': enc_priv_key,
        'showid': showid,
        'id': userid
    }
    result = yield r.table('encryption_user').insert(data).run(conn)
    return result


@gen.coroutine
def get_show_publickey(showid):
    conn = yield connection()
    publickey = yield r.table('encryption_show'). \
        get(showid).get_field('public_key').run(conn)
    return cryptohelper.import_key(publickey)


@gen.coroutine
def get_show_privatekey(showid, passphrase=None):
    conn = yield connection()
    privatekey = yield r.table('encryption_show'). \
        get(showid).get_field('private_key').run(conn)
    return cryptohelper.import_key(privatekey, passphrase)


@gen.coroutine
def get_user_publickey(userid):
    conn = yield connection()
    publickey = yield r.table('encryption_user'). \
        get(userid).get_field('public_key').run(conn)
    return cryptohelper.import_key(publickey)


@gen.coroutine
def get_user_keypair_from_showid(showid):
    conn = yield connection()
    result = yield r.table('encryption_user').filter({
        "showid": showid,
    }).run(conn)
    result = yield dump_cursor(result)
    return result
