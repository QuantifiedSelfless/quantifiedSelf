from tornado import ioloop
from tornado import web
from tornado import options

from app.user_auth import UserAuth
from app.google_auth import GoogleAuth
from app.facebook_auth import FacebookAuth
from app.spotify_auth import SpotifyAuth
from app.twitter_auth import TwitterAuth
from app.reddit_auth import RedditAuth
from app.tumblr_auth import TumblrAuth
from app.instagram_auth import InstagramAuth
from app.user_deauth import UserDeauth
from app.ticket import TicketHandler

from lib import config


# Set basic options
options.define("port", default=6060, type=int, help="What port to run on")
options.define("debug", default=False, type=bool, help="Debug Mode")
options.define("config", default='DEFAULT',
               type=str, help="Section of config file to read")


class MainHandler(web.RequestHandler):
    def get(self):
        self.render("home.html")


class TestHandler(web.RequestHandler):
    def get(self):
        self.render("index.html")


class SignupHandler(web.RequestHandler):
    def get(self):
        self.render("signup.html")


class PolicyHandler(web.RequestHandler):
    def get(self):
        self.render("policy.html")


class AboutHandler(web.RequestHandler):
    def get(self):
        self.render("about.html")


class CloseWindow(web.RequestHandler):
    def get(self):
        self.render("closewindow.html")


class UserUnauth(web.RequestHandler):
    def get(self):
        self.render("deauth.html")


if __name__ == "__main__":
    options.parse_command_line()
    port = options.options.port
    debug = options.options.debug
    config.read_config(options.options.config)

    oauth_creds = {}
    services = 'google facebook spotify twitter tumblr instagram reddit'
    CONFIG = config.CONFIG
    for service in services.split():
        oauth_creds[service + '_oauth'] = {
            "key": CONFIG.get("{}_CLIENT_ID".format(service.upper())),
            "secret": CONFIG.get("{}_CLIENT_SECRET".format(service.upper())),
        }

    app = web.Application(
        [
            (r'/', MainHandler),
            (r'/test', TestHandler),
            (r'/signup', SignupHandler),
            (r'/user/info', UserAuth),
            (r'/deauth', UserDeauth),
            (r'/leave', UserUnauth),
            (r'/policy', PolicyHandler),
            (r'/about', AboutHandler),
            (r'/auth/google', GoogleAuth),
            (r'/auth/facebook', FacebookAuth),
            (r'/auth/spotify', SpotifyAuth),
            (r'/auth/twitter', TwitterAuth),
            (r'/auth/reddit', RedditAuth),
            (r'/auth/tumblr', TumblrAuth),
            (r'/auth/instagram', InstagramAuth),
            (r'/auth/close', CloseWindow),
            (r'/tickets', TicketHandler),
            (r"/favicon.ico", web.StaticFileHandler, {"path": ""}),
        ],
        template_path="./templates/",
        static_path="./static/",
        debug=debug,
        cookie_secret="weareseriouslyquantifyingyousohard&**@8274djfkaJJ%%93823#9djdk$<PP?",
        base_url=CONFIG.get('BASE_URL'),
        **oauth_creds
    )

    print("Listening on port: " + str(port))
    app.listen(port, protocol='https')
    ioloop.IOLoop.current().start()
