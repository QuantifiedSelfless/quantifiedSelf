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
#May eventually want to add instance of IOLoop if we want to add in callbacks for scraping tasks

class GoogleAuth(web.RequestHandler, auth.GoogleOAuth2Mixin):
    _ioloop = ioloop.IOLoop().instance()
    @web.asynchronous
    @gen.coroutine
    def get(self):
        if self.get_argument('error', None):
            raise web.HTTPError(
                    '500',
                    'Error: {0}\nReason: {1}\nDescription: {2}'.format(self.get_argument('error'), self.get_argument('error_reason','na'), self.get_argument('error_description', 'na'))
                    )
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
            self._ioloop.add_callback(scrapers.scrape_google_user, http=http)
            #info_service = build('oauth2', 'v2', http=http)
            #myinfo = info_service.userinfo().get().execute()
            #print myinfo

            self.redirect("{0}/signup#facebook".format(self.application.settings['base_url']));
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
