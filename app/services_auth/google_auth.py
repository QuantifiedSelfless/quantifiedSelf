from tornado import auth
from tornado import gen

from oauth2client import client
import httplib2

from lib.database.auth import save_token
from lib.basehandler import OAuthRequestHandler


class GoogleAuth(OAuthRequestHandler, auth.GoogleOAuth2Mixin):
    scope = [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/calendar.readonly',
        'https://www.googleapis.com/auth/youtube.readonly',
    ]

    def initialize(self):
        super(GoogleAuth, self).setProvider("google")

    def startFlow(self):
        redir_uri = "{0}/auth/google".format(
            self.application.settings['base_url'])
        flow = client.OAuth2WebServerFlow(
            client_id=self.application.settings['google_oauth']['key'],
            client_secret=self.application.settings['google_oauth']['secret'],
            redirect_uri=redir_uri,
            scope=self.scope,
            approval_prompt='force',
            access_type='offline',
            response_type='code'
        )

        self.redirect(flow.step1_get_authorize_url())

    @gen.coroutine
    def handleAuthCallBack(self, code, user_id):
        redir_uri = "{0}/auth/google".format(
            self.application.settings['base_url'])
        access = yield self.get_authenticated_user(
            redirect_uri=redir_uri,
            code=code
        )
        # Set Cookie, Eventually (change cookie_secret)
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
        yield save_token(
            provider='google',
            user_id=user_id,
            token_data=access,
        )
