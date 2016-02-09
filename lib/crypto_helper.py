from Crypto.PublicKey import RSA
from Crypto.Cipher import AES, PKCS1_OAEP
from Crypto.Random import get_random_bytes
from secretsharing import HexToHexSecretSharer

import pickle


AES_MODE = AES.MODE_CFB


class InvalidData(Exception):
    pass


class InvalidBlob(Exception):
    pass


def create_keypair(passphrase=None, length=4096):
    rsa1 = RSA.generate(length)
    private_key = rsa1
    public_key = rsa1.publickey()
    private_exp = private_key. \
        exportKey('PEM', passphrase=passphrase)
    public_exp = public_key.exportKey('PEM')
    return public_exp, private_exp


def import_key(key_pem, passphrase=None):
    return RSA.importKey(key_pem, passphrase=None)


def generate_passphrase(length=32):
    pass_raw = get_random_bytes(length//2)
    return pass_raw.hex()


def split_passphrase(passphrase, share_threshold=2, num_shares=6):
    return HexToHexSecretSharer.split_secret(
        passphrase,
        share_threshold,
        num_shares
    )


def recover_passphrase(shares):
    return HexToHexSecretSharer.recover_secret(shares)


def pad_data(data, block_size=16):
    length = 16 - (len(data) % 16)
    padding = bytes([length])*length
    return data + padding


def encrypt_blob(public_key, data, aes_bytes=32, aes_mode=AES_MODE):
    public_crypto = PKCS1_OAEP.new(public_key)

    aes_key = get_random_bytes(aes_bytes)
    aes_iv = get_random_bytes(16)
    # TODO: what AES mode should we use here?
    aes_crypto = AES.new(aes_key, aes_mode, aes_iv)

    data_pickle = pickle.dumps(data, protocol=-1)
    data_enc = aes_crypto.encrypt(pad_data(data_pickle))

    aes_key_enc = public_crypto.encrypt(aes_key)
    return {
        'iv': aes_iv,
        'l': len(aes_key_enc),
        'data': aes_key_enc + data_enc,
    }


def decrypt_blob(private_key, data, aes_mode=AES_MODE):
    try:
        iv = data['iv']
        aes_length = data['l']
        aes_key_enc = data['data'][:aes_length]
        data_enc_padded = data['data'][aes_length:]
    except IndexError:
        raise InvalidBlob

    private_crypto = PKCS1_OAEP.new(private_key)
    aes_key = private_crypto.decrypt(aes_key_enc)
    aes_crypto = AES.new(aes_key, aes_mode, iv)

    data_padded = aes_crypto.decrypt(data_enc_padded)
    data = data_padded[:-data_padded[-1]]
    try:
        return pickle.loads(data)
    except Exception:
        raise InvalidData
