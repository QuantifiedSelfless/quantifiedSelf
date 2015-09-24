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
        base_url = self.request.protocol + '://' + self.request.host
        if self.get_argument('error', None):
            raise web.HTTPError(
                    '500',
                    'Error: {0}\nReason: {1}\nDescription: {2}'.format(self.get_argument('error'), self.get_argument('error_reason','na'), self.get_argument('error_description', 'na'))
                    )
        if self.get_argument('code', None):
            access = yield self.get_authenticated_user(
                    redirect_uri= base_url + '/auth/facebook',
                    client_id=self.application.settings['facebook_oauth']['key'],
                    client_secret=self.application.settings['facebook_oauth']['secret'],
                    code=self.get_argument('code'))
            #Set Cookie, Eventually (change cookie_secret)
            self.redirect('https://iamadatapoint.com/test')
            return
        else:
            print base_url + '/auth/facebook'
            yield self.authorize_redirect(
              redirect_uri= base_url + '/auth/facebook',
              client_id=self.application.settings['facebook_oauth']['key'],
              extra_params={"scope": "public_profile,email,user_friends"})
