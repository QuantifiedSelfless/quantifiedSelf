from tornado import web
from tornado import gen
from tornado import auth
from tornado import ioloop
from tornado import httpclient

import ujson as json

from oauth2client import client
import httplib2
from apiclient.discovery import build

from lib import scrapers
from lib.database import deny
from lib.database import save_token

class GoogleAuth(web.RequestHandler, auth.GoogleOAuth2Mixin):
    _ioloop = ioloop.IOLoop().instance()
    @web.asynchronous
    @gen.coroutine
    def get(self):
        if self.get_argument('error', None):
            id = self.get_secure_cookie("user_id")
            self._ioloop.add_callback(deny, provider='google', share="login deny", user_id=id)
            # self.redirect("{0}/signup#facebook".format(self.application.settings['base_url']));
            self.redirect("{0}/auth/close".format(self.application.settings['base_url']));
            return
        if self.get_argument('code', None):
            access = yield self.get_authenticated_user(
                    redirect_uri= "{0}/auth/google".format(self.application.settings['base_url']),
                    code=self.get_argument('code'))
            print access
            #Set Cookie, Eventually (change cookie_secret)
            creds = client.OAuth2Credentials(
                    access_token=access['access_token'],
                    client_id=self.application.settings['google_oauth']['key'],
                    client_secret=self.application.settings['google_oauth']['secret'],
                    refresh_token=access.get('refresh_token', None),
                    token_uri=client.GOOGLE_TOKEN_URI,
                    token_expiry=access.get('expires_in', None),
                    user_agent='QS-server-agent/1.0',
                    id_token=access.get('id_token', None)
                    )
            http = httplib2.Http()
            http = creds.authorize(http)
            id = self.get_secure_cookie("user_id")
            self._ioloop.add_callback(save_token, provider='google', user_id=id, token_data=access)
            self._ioloop.add_callback(scrapers.scrape_google_user, http=http, user_id=id)
            self.redirect("{0}/auth/close".format(self.application.settings['base_url']));
            return
        elif self.get_argument('share', None):
            reason = self.get_argument('share', None)
            id = self.get_secure_cookie("user_id")
            self._ioloop.add_callback(deny, provider='google', share=reason, user_id=id)
            self.redirect("{0}/auth/close".format(self.application.settings['base_url']));
            return
        else:
            flow = client.OAuth2WebServerFlow(
                    client_id=self.application.settings['google_oauth']['key'],
                    client_secret=self.application.settings['google_oauth']['secret'],
                    scope = [
                        'https://www.googleapis.com/auth/plus.login',
                        'https://www.googleapis.com/auth/plus.me',
                        'https://www.googleapis.com/auth/gmail.readonly',
                        'https://www.googleapis.com/auth/calendar.readonly',
                        'https://www.googleapis.com/auth/youtube.readonly',
                        ],
                    redirect_uri    = "{0}/auth/google".format(self.application.settings['base_url']),
                    approval_prompt = 'force',
                    access_type     = 'offline',
                    response_type   = 'code'
                    )

            self.redirect(flow.step1_get_authorize_url())
            return
