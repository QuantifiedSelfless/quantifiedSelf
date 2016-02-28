import configparser

CONFIG = {}
MODE = None


def read_config(mode):
    global CONFIG, MODE
    print("Loading config with mode: {}".format(mode))
    MODE = mode
    config = configparser.ConfigParser()
    config.read('config.conf')
    CONFIG.update(config['default'])
    CONFIG.update(config[mode])
