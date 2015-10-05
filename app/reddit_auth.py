from tornado import web
from tornado import gen
from tornado import ioloop
from tornado import httpclient
import ujson as json
import praw

class RedditAuth(web.RequestHandler):

    @web.asynchronous
    @gen.coroutine
    def get(self):
        reddit = praw.Reddit('application:qself-server /u/parallaxingposition')
        reddit.set_oauth_app_info(client_id=self.application.settings['reddit_oauth']['key'],
                                  client_secret=self.application.settings['reddit_oauth']['secret'],
                                  redirect_uri="{0}/auth/reddit".format(self.application.settings['base_url']))
        if self.get_argument('error', None):
            raise web.HTTPError(
                    '500',
                    'Error: {0}\nReason: {1}\nDescription: {2}'.format(self.get_argument('error'), self.get_argument('error_reason','na'), self.get_argument('error_description', 'na'))
                    )
        if self.get_argument('code', None):
            access_info = reddit.get_access_information(self.get_argument('code',None))
            reddit.set_access_credentials(**access_info)
            #evenutually do an async fetch
            user = reddit.get_me()
            print user
            self.redirect('{0}/test'.format(self.application.settings['base_url']))
            return
        else:
            url = reddit.get_authorize_url('uniqueKey', 'identity,flair,history,mysubreddits,privatemessages', True)
            self.redirect(url)
            return
