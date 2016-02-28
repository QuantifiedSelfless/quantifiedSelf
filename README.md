[![Stories in Ready](https://badge.waffle.io/QuantifiedSelfless/quantifiedSelf.png?label=ready&title=Ready)](https://waffle.io/QuantifiedSelfless/quantifiedSelf)
# Quantified Self

## Install

First, make sure you have `pip` installed for python3 and `gulp`,

```
$ curl 'https://bootstrap.pypa.io/get-pip.py' | sudo python3 -
$ sudo npm install -g gulp
```

Now, install all the dependencies,

```
$ sudo pip3 install -r requirements.txt
```

Compile the front-end code,

```
$ cd web
$ npm install
$ gulp production
$ cd ..
```

Lastly, you'll want to decrypt the config files.  Simply run,

```
$ python3 config_packer.py decrypt config.conf.enc > config.conf
```

Similarly, if you changed the `config.conf` file, run the following to encrypt
your changes,

```
$ python3 config_packer.py encrypt config.conf > config.conf.enc
```

Finally, run the script,

```
$ python3 api.py
```

## Dev Notes

Normally when creating a showtime, we take the passphrase that encrypts that
show and split it into shares.  At least 2 of these shares are required to
decrypt the contents of that show.  If you set `share_threshold` in config to 1,
we instead just send out the passphrase to make development easier.  The
`ShowtimeAccessTokens` endpoint will take either multiple `shares` (as we would
expect in production) or a `passphrase` option for the dev case.  Just remember
to change the `dev:shares_email` config field in `config.conf` so that you get
the e-mail with the passphrase!
