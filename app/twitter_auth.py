from tornado import web
from tornado import gen
from tornado import ioloop
from tornado import httpclient
import ujson as json
import requests
from requests_oauthlib import OAuth1
from urlparse import parse_qs


class TwitterAuth(web.RequestHandler):
    @web.asynchronous
    @gen.coroutine
    def get(self):
        consumer_key = self.application.settings['twitter_oauth']['key']
        consumer_secret = self.application.settings['twitter_oauth']['secret']
        if self.get_argument('error', None):
            raise web.HTTPError(
                    '500',
                    'Error: {0}\nReason: {1}\nDescription: {2}'.format(self.get_argument('error'), self.get_argument('error_reason','na'), self.get_argument('error_description', 'na'))
                    )

        if self.get_argument('oauth_verifier', None): #access token
            oauth = OAuth1(consumer_key,
                    consumer_secret,
                    self.get_argument('oauth_token', None),
                    verifier=self.get_argument('oauth_verifier', None))

            #Make async
            r = requests.post(url='https://api.twitter.com/oauth/access_token', auth=oauth)
            credentials = parse_qs(r.content)
            print "\n\ncreds:"
            print credentials
            access_token_key = credentials.get('oauth_token')[0]
            access_token_secret = credentials.get('oauth_token_secret')[0]
            self.redirect("{0}/signup#reddit".format(self.application.settings['base_url']))
            return

        else:# request token
    	    oauth = OAuth1(consumer_key, consumer_secret)
    	    #Make async
            r = requests.post(
    	    url='https://api.twitter.com/oauth/request_token',auth=oauth)
    	    credentials = parse_qs(r.content)
    	    request_key = credentials.get('oauth_token')[0]
    	    request_secret = credentials.get('oauth_token_secret')[0]
    	    self.redirect('https://api.twitter.com/oauth/authorize?oauth_token={0}&oauth_secret={1}'.format(request_key, request_secret))
            return
