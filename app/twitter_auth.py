from tornado import web
from tornado import gen
from tornado import ioloop
from tornado import httpclient
import ujson as json
from oauth2client import client
import httplib2
from apiclient.discovery import build

class TwitterAuth(web.RequestHandler, auth.TwitterMixin):
    @web.asynchronous
    @gen.coroutine
    def get(self):
        if self.get_argument('error', None):
            raise web.HTTPError(
                    '500',
                    'Error: {0}\nReason: {1}\nDescription: {2}'.format(self.get_argument('error'), self.get_argument('error_reason','na'), self.get_argument('error_description', 'na'))
                    )
        if self.get_argument('code', None):
            access = yield self.get_authenticated_user()
            self.redirect('https://iamadatapoint.com/test')
            return
        else:
            yield self.authorize_redirect(
                    redirect_uri= base_url + '/auth/twitter',
                    client_id = self.application.settings['twitter_oauth']['key'],
					client_secret=self.application.settings['twitter_oauth']['secret'],
                    code=self.get_argument('code'))
            return
