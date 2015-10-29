from tornado import ioloop
from tornado import web
from tornado import httpserver
from tornado import options
import os

from app.ChatSocket import EchoWebSocket
from app.user_auth import UserAuth
from app.google_auth import GoogleAuth
from app.facebook_auth import FacebookAuth
from app.spotify_auth import SpotifyAuth
from app.twitter_auth import TwitterAuth
from app.reddit_auth import RedditAuth
from app.tumblr_auth import TumblrAuth
from app.instagram_auth import InstagramAuth
from app.creds import *

#Set basic options
options.define("port", default=6060, type=int, help="What port to run on")
options.define("debug", default=False, type=bool, help="Debug Mode")


class MainHandler(web.RequestHandler):
    def get(self):
        self.render("home.html")

class TestHandler(web.RequestHandler):
    def get(self):
        self.render("index.html")

class SignupHandler(web.RequestHandler):
    def get(self):
        self.render("signup.html")

class ChatHandler(web.RequestHandler):
    def get(self):
        self.render("chat.html")

class PolicyHandler(web.RequestHandler):
    def get(self):
        self.render("policy.html")

class AboutHandler(web.RequestHandler):
    def get(self):
        self.render("about.html")

if __name__ == "__main__":
    options.parse_command_line()
    port = options.options.port
    debug = options.options.debug

    app = web.Application(
        [
                 ( r'/'               , MainHandler   )  ,
                 ( r'/test'           , TestHandler   )  ,
                 ( r'/signup'         , SignupHandler )  ,
                 ( r'/user/info'      , UserAuth      )  ,
                 ( r'/policy'         , PolicyHandler )  ,
                 ( r'/about'          , AboutHandler  )  ,
                 ( r'/auth/google'    , GoogleAuth    )  ,
                 ( r'/auth/facebook'  , FacebookAuth  )  ,
                 ( r'/auth/spotify'   , SpotifyAuth   )  ,
                 ( r'/auth/twitter'   , TwitterAuth   )  ,
                 ( r'/auth/reddit'    , RedditAuth    )  ,
                 ( r'/auth/tumblr'    , TumblrAuth    )  ,
                 ( r'/auth/instagram' , InstagramAuth )  ,
                 ( r'/chat'           , EchoWebSocket )  ,
                 ( r'/chatroom'       , ChatHandler   )  ,
            ( r"/favicon.ico" , web.StaticFileHandler , {"path":""} )  ,
        ],
        template_path      = "./templates/",
        static_path        = "./static/",
        debug              = debug,
        cookie_secret      = "weareseriouslyquantifyingyousohard&**@8274djfkaJJ%%93823#9djdk$<PP?",
        base_url           = BASE_URL,
        google_oauth       = { "key": GOOGLE_CLIENT_ID,    "secret": GOOGLE_CLIENT_SECRET   },
        facebook_oauth     = { "key": FACEBOOK_CLIENT_ID,  "secret": FACEBOOK_CLIENT_SECRET },
        spotify_oauth      = { "key": SPOTIFY_CLIENT_ID, "secret": SPOTIFY_CLIENT_SECRET  },
	    twitter_oauth      = { "key": TWITTER_CLIENT_ID, "secret": TWITTER_CLIENT_SECRET  },
	    tumblr_oauth       = { "key": TUMBLR_CLIENT_ID, "secret": TUMBLR_CLIENT_SECRET  },
        instagram_oauth    = { "key": INSTAGRAM_CLIENT_ID, "secret": INSTAGRAM_CLIENT_SECRET  },
        reddit_oauth       = { "key": REDDIT_CLIENT_ID, "secret": REDDIT_CLIENT_SECRET  }
        )

    print "Listening on port: " + str(port)
    app.listen(port, protocol='https')
    ioloop.IOLoop.current().start()
