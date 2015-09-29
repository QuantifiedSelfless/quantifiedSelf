from tornado import web
from tornado import gen
from tornado import ioloop
from tornado import httpclient

import ujson as json

import app.spotifyMix as spot

class SpotifyAuth(web.RequestHandler, spot.SpotifyOAuth2Mixin):
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
                    redirect_uri='https://iamadatapoint.com/auth/spotify',
                    code=self.get_argument('code'))
            print access
            #from here use spotipy - pass it over to a scraper context
            self.redirect('https://iamadatapoint.com/test')
            return
        else:
            yield self.authorize_redirect(
                    redirect_uri = 'https://iamadatapoint.com/auth/spotify',
                    client_id = self.application.settings['spotify_oauth']['key'],
                    response_type='code',
                    scope = ['playlist-read-private', 'playlist-read-collaborative', 'user-follow-read', 'user-library-read','user-read-birthdate', 'user-read-email']
)
            return
