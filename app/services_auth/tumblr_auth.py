import oauth2 as oauth
import pytumblr
import urllib.parse
import string
import random

from lib.database import save_token

from lib.basehandler import OAuthRequestHandler

# dictionary that matches auth-session-id to token secret
secrets = {}


class TumblrAuth(OAuthRequestHandler):
    def auth_session_id(self):
        characters = string.ascii_uppercase + string.digits
        _id = ''.join(random.choice(characters) for _ in range(12))
        return _id

    def initialize(self):
        super(TumblrAuth, self).setProvider("tumblr")
        super(TumblrAuth, self).setCallBackArgumentName("oauth_token")
        self.consumer_key = self.application.settings['tumblr_oauth']['key']
        self.consumer_secret = \
            self.application.settings['tumblr_oauth']['secret']

        self.request_token_url = 'http://www.tumblr.com/oauth/request_token'
        self.authorize_url = 'http://www.tumblr.com/oauth/authorize'
        self.access_token_url = 'http://www.tumblr.com/oauth/access_token'

        self.consumer = oauth.Consumer(self.consumer_key, self.consumer_secret)
        self.client = oauth.Client(self.consumer)

    def startFlow(self):
        resp, content = self.client.request(self.request_token_url, "POST")
        request_token = urllib.parse.parse_qs(content.decode())
        auth_session_id = self.auth_session_id()
        secrets[auth_session_id] = request_token['oauth_token_secret'][0]
        self.set_secure_cookie("auth-session-id", auth_session_id)
        self.redirect("{0}?oauth_token={1}".format(
            self.authorize_url,
            request_token['oauth_token'][0]
        ))

    def handleAuthCallBack(self, code, user_id):
        oauth_verifier = self.get_argument('oauth_verifier', None)
        oauth_token = self.get_argument('oauth_token', None)
        auth_session_id = self.get_secure_cookie("auth-session-id", None)
        oauth_token_secret = secrets[auth_session_id.decode()]

        # Clear cookies and dictionary
        self.clear_cookie("auth-session-id")
        secrets.pop(auth_session_id, None)

        # Request access token
        token = oauth.Token(oauth_token, oauth_token_secret)
        token.set_verifier(oauth_verifier)
        self.client = oauth.Client(self.consumer, token)

        resp, content = self.client.request(self.access_token_url, "POST")
        access_token = urllib.parse.parse_qs(content.decode())

        access_info = {
            'consumer_key':         self.consumer_key,
            'consumer_secret':      self.consumer_secret,
            'oauth_token':          access_token['oauth_token'][0],
            'oauth_token_secret':   access_token['oauth_token_secret'][0]
        }

        # just a test query
        client = pytumblr.TumblrRestClient(
            access_info['consumer_key'],
            access_info['consumer_secret'],
            access_info['oauth_token'],
            access_info['oauth_token_secret']
        )
        yield save_token(
            provider="tumblr",
            user_id=user_id,
            token_data={
                "access_token": access_info['oauth_token'],
                "access_token_secret": access_info["oauth_token_secret"]
            }
        )
        print(client.info())  # Grabs the current user information
