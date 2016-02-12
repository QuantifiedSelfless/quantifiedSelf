from tornado import gen

import requests
from requests_oauthlib import OAuth1
from urllib.parse import parse_qs

from lib.database.auth import save_token

from lib.basehandler import OAuthRequestHandler


class TwitterAuth(OAuthRequestHandler):

    def initialize(self):
        super(TwitterAuth, self).setProvider("twitter")
        super(TwitterAuth, self).setCallBackArgumentName("oauth_verifier")
        self.consumer_key = self.application.settings['twitter_oauth']['key']
        self.consumer_secret = \
            self.application.settings['twitter_oauth']['secret']

    def startFlow(self):
        oauth = OAuth1(self.consumer_key, self.consumer_secret)
        r = requests.post(
            url='https://api.twitter.com/oauth/request_token',
            auth=oauth
        )
        credentials = parse_qs(r.content.decode())
        request_key = credentials.get('oauth_token')[0]
        request_secret = credentials.get('oauth_token_secret')[0]
        base_url = 'https://api.twitter.com/oauth/authorize?oauth_token={0}&oauth_secret={1}'
        self.redirect(base_url.format(request_key, request_secret))

    @gen.coroutine
    def handleAuthCallBack(self, code, user_id):
        oauth = OAuth1(
            self.consumer_key,
            self.consumer_secret,
            self.get_argument('oauth_token', None),
            verifier=self.get_argument('oauth_verifier', None)
        )

        # Make async
        r = requests.post(
            url='https://api.twitter.com/oauth/access_token',
            auth=oauth
        )
        credentials = parse_qs(r.content.decode())
        access_token_key = credentials.get('oauth_token')[0]
        access_token_secret = credentials.get('oauth_token_secret')[0]

        token_data = {
            "access_token": access_token_key,
            "access_token_secret": access_token_secret,
        }
        yield save_token(
            provider="twitter",
            user_id=user_id,
            token_data=token_data,
        )
