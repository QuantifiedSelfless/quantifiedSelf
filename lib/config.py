import configparser

CONFIG = None


def read_config(debug):
    global CONFIG
    config = configparser.ConfigParser()
    config.read('config.conf')
    CONFIG = config[debug]
