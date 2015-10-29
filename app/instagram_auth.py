from tornado import web
from tornado import gen
from tornado import ioloop
from tornado import httpclient
import ujson as json
from instagram.client import InstagramAPI
from lib.email_sender import send_confirmation
from lib.database import get_user

class InstagramAuth(web.RequestHandler):
    _ioloop = ioloop.IOLoop().instance()
    @web.asynchronous
    @gen.coroutine
    def get(self):
        consumer_key    = self.application.settings['instagram_oauth']['key']
        consumer_secret = self.application.settings['instagram_oauth']['secret']
        api = InstagramAPI(
            client_id=consumer_key,
            client_secret=consumer_secret,
            redirect_uri="{0}/auth/instagram".format(self.application.settings['base_url']))

        if self.get_argument('error', None):
            raise web.HTTPError(
                    '500',
                    'Error: {0}\nReason: {1}\nDescription: {2}'.format(self.get_argument('error'), self.get_argument('error_reason','na'), self.get_argument('error_description', 'na'))
                    )
        if self.get_argument('code', None):
            code = self.get_argument('code')
            access_info = api.exchange_code_for_access_token(code)
            print access_info
            self.redirect('{0}/test'.format(self.application.settings['base_url']))
            return
        elif self.get_argument('share', None):
            reason = self.get_argument('share', None)
            id = self.get_secure_cookie("user_id")
            #self._ioloop.add_callback(deny_google, share=reason, user_id=id)

            ## Send off the email here
            user = yield get_user(id)
            print user
            send_confirmation(user['email'], user['name'])
            print 'YO'
            self.redirect("{0}/signup#thankyou".format(self.application.settings['base_url']));
            return
        else:
            self.redirect(api.get_authorize_login_url(scope=['basic','comments','likes','relationships']))
            return

    # def get_authorize_url(self, client_id, scope='basic'):
    #     redirect_uri = "{0}/auth/instagram".format(self.application.settings['base_url'])
    #     return "https://api.instagram.com/oauth/authorize?client_id={0}&redirect_uri={1}&response_type=code&scope={2}".format(client_id, redirect_uri, scope)
