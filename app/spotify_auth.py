from tornado import web
from tornado import gen
from tornado import ioloop
from tornado import httpclient

import ujson as json
import app.spotifyMix as spot
from lib.database import save_token

from lib.basehandler import OAuthRequestHandler

class SpotifyAuth(OAuthRequestHandler, spot.SpotifyOAuth2Mixin):
    def initialize(self):
        super(SpotifyAuth, self).setProvider("spotify")

    def startFlow(self):
        self.authorize_redirect(
                redirect_uri = '{0}/auth/spotify'.format(self.application.settings['base_url']),
                client_id = self.application.settings['spotify_oauth']['key'],
                response_type='code',
                scope = ['playlist-read-private', 'playlist-read-collaborative', 'user-follow-read', 'user-library-read','user-read-birthdate', 'user-read-email']
                )

    def handleAuthCallBack(self, code, user_id):
        access = yield self.get_authenticated_user(
                redirect_uri= '{0}/auth/spotify'.format(self.application.settings['base_url']),
                code=code)
        print(access)
        #from here use spotipy - pass it over to a scraper context
        self._ioloop.add_callback(save_token, provider="spotify", user_id=user_id, token_data=access)
