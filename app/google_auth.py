from tornado import web
from tornado import gen
from tornado import auth
from tornado import ioloop
from tornado import httpclient
import ujson as json

from creds import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET

#May eventually want to add instance of IOLoop if we want to add in callbacks for scraping tasks

class GoogleAuth(web.RequestHandler, auth.GoogleOAuth2Mixin):
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
                    redirect_uri='http://iamadatapoint.com/auth/google',
                    code=self.get_argument('code'))
            print access
            user = yield self.oauth2_request(
                    'https://googleapis.com/oauth2/v1/userinfo',
                    access_token = access['access_token'])
        else:
            yield self.authorize_redirect(
                    redirect_uri="http://iamadatapoint.com/auth/google",
                    client_id=self.application.settings['google_oauth']['key'],
                    scope = ['profile', 
                        'https://www.googleapis.com/auth/gmail.readonly', 
                        'https://www.googleapis.com/auth/calendar.readonly', 
                        'https://www.googleapis.com/auth/youtube.readonly'],
                    response_type = 'code',
                    extra_params={'approval_prompt' : 'auto'})

