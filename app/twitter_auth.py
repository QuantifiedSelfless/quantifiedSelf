from tornado import web
from tornado import gen
from tornado import ioloop
from tornado import httpclient
import ujson as json
import requests
from requests_oauthlib import OAuth1
from urlparse import parse_qs


class TwitterAuth(web.RequestHandler, auth.TwitterMixin):
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
        if self.get_argument('code', None): #access token
			oauth = OAuth1(consumer_key,
				consumer_secret,
				request_key,
				request_secret,
				verifier=self.get_argument('code', None))
			r = requests.post(url='https://api.twitter.com/oauth/access_token', auth=oauth)
			credentials = parse_qs(r.content)
			access_token_key = credentials.get('oauth_token')[0]
			access_token_secret = credentials.get('oauth_token_secret')[0]
            return
			
        else:# request token
			oauth = OAuth1(consumer_key, consumer_secret)
			r = requests.post(
			url='https://api.twitter.com/oauth/request_token',auth=oauth)
			credentials = parse_qs(r.content)
			request_key = credentials.get('oauth_token')[0]
			request_secret = credentials.get('oauth_token_secret')[0]
			self.redirect('https://api.twitter.com/oauth/authorize?oauth_token=%s'% request_key)
            return
