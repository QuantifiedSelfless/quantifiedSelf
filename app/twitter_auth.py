from tornado import web
from tornado import gen
from tornado import ioloop
from tornado import httpclient
import ujson as json
import requests
from requests_oauthlib import OAuth1
from urlparse import parse_qs

from lib.scrapers import scrape_twitter_user
from lib.database import save_token

from lib.basehandler import OAuthRequestHandler

class TwitterAuth(OAuthRequestHandler):

    def initialize(self):
        super(TwitterAuth, self).setProvider("twitter")
        super(TwitterAuth, self).setCallBackArgumentName("oauth_verifier")
        self.consumer_key = self.application.settings['twitter_oauth']['key']
        self.consumer_secret = self.application.settings['twitter_oauth']['secret']

    def startFlow(self):
        oauth = OAuth1(self.consumer_key, self.consumer_secret)
        r = requests.post(url='https://api.twitter.com/oauth/request_token',auth=oauth)
        credentials = parse_qs(r.content)
        request_key = credentials.get('oauth_token')[0]
        request_secret = credentials.get('oauth_token_secret')[0]
        self.redirect('https://api.twitter.com/oauth/authorize?oauth_token={0}&oauth_secret={1}'.format(request_key, request_secret))

    def handleAuthCallBack(self, code, user_id):
        oauth = OAuth1(self.consumer_key,
                self.consumer_secret,
                self.get_argument('oauth_token', None),
                verifier=self.get_argument('oauth_verifier', None))

        #Make async
        r = requests.post(url='https://api.twitter.com/oauth/access_token', auth=oauth)
        credentials = parse_qs(r.content)
        print "\n\ncreds:"
        print credentials
        access_token_key = credentials.get('oauth_token')[0]
        access_token_secret = credentials.get('oauth_token_secret')[0]

        self._ioloop.add_callback(save_token, provider="twitter", user_id=user_id, token_data={"access_token":access_token_key, "access_token_secret":access_token_secret})
        self._ioloop.add_callback(scrape_twitter_user, user=id)

    # Old Shit
    # _ioloop = ioloop.IOLoop().instance()
    # @web.asynchronous
    # @gen.coroutine
    # def get(self):
    #     consumer_key = self.application.settings['twitter_oauth']['key']
    #     consumer_secret = self.application.settings['twitter_oauth']['secret']
    #     if self.get_argument('error', None):
    #         id = self.get_secure_cookie("user_id")
    #         self._ioloop.add_callback(deny, provider='twitter', share="login deny", user_id=id)
    #         self.redirect("{0}/auth/close".format(self.application.settings['base_url']));
    #         return
    #     if self.get_argument('oauth_verifier', None): #access token
    #         oauth = OAuth1(consumer_key,
    #                 consumer_secret,
    #                 self.get_argument('oauth_token', None),
    #                 verifier=self.get_argument('oauth_verifier', None))
    #
    #         #Make async
    #         r = requests.post(url='https://api.twitter.com/oauth/access_token', auth=oauth)
    #         credentials = parse_qs(r.content)
    #         print "\n\ncreds:"
    #         print credentials
    #         access_token_key = credentials.get('oauth_token')[0]
    #         access_token_secret = credentials.get('oauth_token_secret')[0]
    #
    #         # scrape
    #         id = self.get_secure_cookie("user_id")
    #         self._ioloop.add_callback(save_token, provider="twitter", user_id=id, token_data={"access_token":access_token_key, "access_token_secret":access_token_secret})
    #         self._ioloop.add_callback(scrape_twitter_user, user=id)
    #         self.redirect("{0}/auth/close".format(self.application.settings['base_url']))
    #         return
    #     elif self.get_argument('share', None):
    #         reason = self.get_argument('share', None)
    #         id = self.get_secure_cookie("user_id")
    #         self._ioloop.add_callback(deny, provider='twitter', share=reason, user_id=id)
    #         self.redirect("{0}/auth/close".format(self.application.settings['base_url']));
    #         return
    #     else:# request token
    # 	    oauth = OAuth1(consumer_key, consumer_secret)
    # 	    #Make async
    #         r = requests.post(
    # 	    url='https://api.twitter.com/oauth/request_token',auth=oauth)
    # 	    credentials = parse_qs(r.content)
    # 	    request_key = credentials.get('oauth_token')[0]
    # 	    request_secret = credentials.get('oauth_token_secret')[0]
    # 	    self.redirect('https://api.twitter.com/oauth/authorize?oauth_token={0}&oauth_secret={1}'.format(request_key, request_secret))
    #         return
