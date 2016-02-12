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

Finally, run the script,

```
$ python3 api.py
```

