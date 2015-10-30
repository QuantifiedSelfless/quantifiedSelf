from tornado import web
from tornado import gen
from tornado import ioloop
from tornado import httpclient

import ujson as json
import app.spotifyMix as spot
from lib.database import save_token
from lib.database import deny

class SpotifyAuth(web.RequestHandler, spot.SpotifyOAuth2Mixin):
    _ioloop = ioloop.IOLoop().instance()
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
                    redirect_uri= '{0}/auth/spotify'.format(self.application.settings['base_url']),
                    code=self.get_argument('code'))
            print access
            #from here use spotipy - pass it over to a scraper context
            id = self.get_secure_cookie("user_id")
            self._ioloop.add_callback(save_token, provider="spotify", user_id=id, token_data=access)
            self.redirect('{0}/signup#twitter'.format(self.application.settings['base_url']))
            return
        elif self.get_argument('share', None):
            reason = self.get_argument('share', None)
            id = self.get_secure_cookie("user_id")
            self._ioloop.add_callback(deny, provider='spotify', share=reason, user_id=id)
            self.redirect("{0}/signup#twitter".format(self.application.settings['base_url']));
            return
        else:
            yield self.authorize_redirect(
                    redirect_uri = '{0}/auth/spotify'.format(self.application.settings['base_url']),
                    client_id = self.application.settings['spotify_oauth']['key'],
                    response_type='code',
                    scope = ['playlist-read-private', 'playlist-read-collaborative', 'user-follow-read', 'user-library-read','user-read-birthdate', 'user-read-email']
)
            return
