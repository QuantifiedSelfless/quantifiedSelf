from tornado import web
from tornado import gen
from tornado import auth
from tornado import ioloop
from tornado import httpclient
import ujson as json
from oauth2client import client
import httplib2
from apiclient.discovery import build


class FacebookAuth(web.RequestHandler, auth.FacebookGraphMixin):
    @web.asynchronous
    @gen.coroutine
    def get(self):
        if self.get_argument('error', None):
            raise web.HTTPError(
                    '500',
                    'Error: {0}\nReason: {1}\nDescription: {2}'.format(self.get_argument('error'), self.get_argument('error_reason','na'), self.get_argument('error_description', 'na'))
                    )
        if self.get_argument('code', None):
            print "I'm right here. no code."
            access = yield self.get_authenticated_user(
                    redirect_uri='/auth/facebook',
                    code=self.get_argument('code'))
            print access
            #Set Cookie, Eventually (change cookie_secret)
            # creds = client.OAuth2Credentials(
            #         access_token=access['access_token'],
            #         client_id=self.application.settings['google_oauth']['key'], #Where is this set?
            #         client_secret=self.application.settings['google_oauth']['secret'],
            #         refresh_token=access.get('refresh_token', None),
            #         token_uri=client.GOOGLE_TOKEN_URI,
            #         token_expiry=access.get('expires_in', None),
            #         user_agent='QS-server-agent/1.0',
            #         id_token=access.get('id_token', None)
            #         )
            # http = httplib2.Http()
            # http = creds.authorize(http)
            # info_service = build('oauth2', 'v2', http=http)
            # myinfo = info_service.userinfo().get().execute()
            # print myinfo
            self.redirect('https://iamadatapoint.com/test')
            return
        else:
            yield self.authorize_redirect(
              redirect_uri='https://iamadatapoint.com/auth/google',
              client_id=self.application.settings['facebook_oauth']['key'],
              extra_params={"scope": "read_stream,offline_access"})
     #       yield self.authorize_redirect(
     #               redirect_uri="https://iamadatapoint.com/auth/google",
     #               client_id=self.application.settings['google_oauth']['key'],
     #               scope = [
     #                   'https://www.googleapis.com/auth/plus.login',
     #                   'https://www.googleapis.com/auth/plus.me',
     #                   'https://www.googleapis.com/auth/gmail.readonly',
     #                   'https://www.googleapis.com/auth/calendar.readonly',
     #                   'https://www.googleapis.com/auth/youtube.readonly',
     #                   ],
     #               response_type = 'code',
     #               extra_params={'approval_prompt' : 'force', 'access_type': 'offline'})
