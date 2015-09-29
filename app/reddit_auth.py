from tornado import web
from tornado import gen
from tornado import ioloop
from tornado import httpclient
import ujson as json

import praw


class RedditAuth(web.RequestHandler):
    reddit = praw.Reddit('application:qself-server /u/parallaxingposition')
    reddit.set_oauth_app_info(client_id=self.application.settings['reddit_oauth']['key'],
                                client_secret=self.application.settings['reddit_oauth']['secret'],
                                redirect_uri="https://iamadatapoint.com/auth/reddit")

    @web.asynchronous
    @gen.coroutine
    def get(self):
        if self.get_argument('error', None):
            raise web.HTTPError(
                    '500',
                    'Error: {0}\nReason: {1}\nDescription: {2}'.format(self.get_argument('error'), self.get_argument('error_reason','na'), self.get_argument('error_description', 'na'))
                    )
        if self.get_argument('code', None):
            access_info = self.reddit.get_access_information(self.get_argument('code',None))
            self.reddit.set_access_credentials(**access_info)
            print self.reddit.me
            self.redirect('https://iamadatapoint.com/test')
            return
        else:
            url = self.reddit.get_authorize_url('uniqueKey', 'identity', True)
            self.redirect(url)
            return


