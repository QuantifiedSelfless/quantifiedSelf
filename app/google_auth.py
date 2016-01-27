from tornado import web
from tornado import gen
from tornado import auth
from tornado import httpclient

import ujson as json

from oauth2client import client
import httplib2
from apiclient.discovery import build

from lib import scrapers
from lib.database import deny
from lib.database import save_token
from lib.basehandler import OAuthRequestHandler

class GoogleAuth(OAuthRequestHandler, auth.GoogleOAuth2Mixin):
    def initialize(self):
        super(GoogleAuth, self).setProvider("google")

    def startFlow(self):
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

    def handleAuthCallBack(self, code, user_id):
        access = yield self.get_authenticated_user(
                redirect_uri= "{0}/auth/google".format(self.application.settings['base_url']),
                code=code)
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
        self._ioloop.add_callback(save_token, provider='google', user_id=user_id, token_data=access)
        self._ioloop.add_callback(scrapers.scrape_google_user, http=http, user_id=user_id)
