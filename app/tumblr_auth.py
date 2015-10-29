from tornado import web
from tornado import gen
from tornado import ioloop
from tornado import httpclient
import ujson as json
import oauth2 as oauth
import pytumblr
import urlparse
import string
import random

# dictionary that matches auth-session-id to token secret
secrets = {}

class TumblrAuth(web.RequestHandler):
    _ioloop = ioloop.IOLoop().instance()
    @web.asynchronous
    @gen.coroutine
    def get(self):
        consumer_key    = self.application.settings['tumblr_oauth']['key']
        consumer_secret = self.application.settings['tumblr_oauth']['secret']

        request_token_url = 'http://www.tumblr.com/oauth/request_token'
        authorize_url = 'http://www.tumblr.com/oauth/authorize'
        access_token_url = 'http://www.tumblr.com/oauth/access_token'

        consumer = oauth.Consumer(consumer_key, consumer_secret)
        client = oauth.Client(consumer)

        # reddit = praw.Reddit('application:qself-server /u/parallaxingposition')
        # reddit.set_oauth_app_info(client_id=self.application.settings['reddit_oauth']['key'],
        #                           client_secret=self.application.settings['reddit_oauth']['secret'],
        #                           redirect_uri="{0}/auth/reddit".format(self.application.settings['base_url']))
        if self.get_argument('error', None):
            raise web.HTTPError(
                    '500',
                    'Error: {0}\nReason: {1}\nDescription: {2}'.format(self.get_argument('error'), self.get_argument('error_reason','na'), self.get_argument('error_description', 'na'))
                    )
        if self.get_argument('oauth_token', None):
            oauth_verifier     = self.get_argument('oauth_verifier', None)
            oauth_token        = self.get_argument('oauth_token', None)
            auth_session_id    = self.get_cookie("auth-session-id", None)
            oauth_token_secret = secrets[auth_session_id];

            # Clear cookies and dictionary
            self.clear_cookie("auth-session-id")
            secrets.pop(auth_session_id, None)

            # Request access token
            token = oauth.Token(oauth_token, oauth_token_secret)
            token.set_verifier(oauth_verifier)
            client = oauth.Client(consumer, token)

            resp, content = client.request(access_token_url, "POST")
            access_token  = urlparse.parse_qs(content)

            access_info = {
                'consumer_key':         consumer_key,
                'consumer_secret':      consumer_secret,
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

            # save the token
            id = self.get_secure_cookie("user_id")
            self._ioloop.add_callback(save_token, provider="tumblr", user_id=id, token_data={"access_token":access_info['oauth_token'],"access_token_secret":access_info["oauth_token_secret"]})

            print client.info() # Grabs the current user information

            self.redirect('{0}/signup#instagram'.format(self.application.settings['base_url']))
            return
        elif self.get_argument('share', None):
            reason = self.get_argument('share', None)
            id = self.get_secure_cookie("user_id")
            self._ioloop.add_callback(deny_google, share=reason, user_id=id)
            self.redirect("{0}/signup#instagram".format(self.application.settings['base_url']));
            return
        else:
            resp, content = client.request(request_token_url, "POST")
            request_token =  urlparse.parse_qs(content)
            auth_session_id = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(12));
            secrets[auth_session_id] = request_token['oauth_token_secret'][0]
            self.set_cookie("auth-session-id", auth_session_id)
            self.redirect("{0}?oauth_token={1}".format(authorize_url, request_token['oauth_token'][0]))
            return
