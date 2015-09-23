from tornado import ioloop
from tornado import web
from tornado import httpserver
from tornado import options

from app.google_auth import GoogleAuth
from app.facebook_auth import FacebookAuth
from app.creds import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET

#Set basic options
options.define("port", default=6060, type=int, help="What port to run on")
options.define("debug", default=False, type=bool, help="Debug Mode")


class MainHandler(web.RequestHandler):
    def get(self):
        self.render("index.html")

class TestHandler(web.RequestHandler):
    def get(self):
        self.render("home.html")

if __name__ == "__main__":
    options.parse_command_line()
    port = options.options.port
    debug = options.options.debug

    app = web.Application(
        [
             ( r'/'              , MainHandler  )  ,
             ( r'/test'          , TestHandler  )  ,
             ( r'/auth/google'   , GoogleAuth   )  ,
             ( r'/auth/facebook' , FacebookAuth )
        # ( r"/favicon.ico" , tornado.web.StaticFileHandler , {"path":"."} )  ,
        ],
        template_path = "./templates/",
        static_path = "./static/",
        debug = debug,
        cookie_secret = "weareseriouslyquantifyingyousohard&**@8274djfkaJJ%%93823#9djdk$<PP?",
        google_oauth = {"key": GOOGLE_CLIENT_ID, "secret": GOOGLE_CLIENT_SECRET},
        facebook_oauth = {"key": FACEBOOK_CLIENT_ID, "secret": FACEBOOK_CLIENT_SECRET} # to be changed
        )


    app.listen(6060)
    ioloop.IOLoop.current().start()
