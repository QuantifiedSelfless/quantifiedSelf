import app.spotifyMix as spot
from lib.database import save_token

from lib.basehandler import OAuthRequestHandler


class SpotifyAuth(OAuthRequestHandler, spot.SpotifyOAuth2Mixin):
    scope = [
        'playlist-read-private', 
        'playlist-read-collaborative',
        'user-follow-read',
        'user-library-read',
        'user-read-birthdate',
        'user-read-email',
    ]

    def initialize(self):
        super(SpotifyAuth, self).setProvider("spotify")

    def startFlow(self):
        uri = '{0}/auth/spotify'.format(self.application.settings['base_url'])
        self.authorize_redirect(
                redirect_uri=uri,
                client_id=self.application.settings['spotify_oauth']['key'],
                response_type='code',
                scope=self.scope,
                )

    def handleAuthCallBack(self, code, user_id):
        redir_uri = '{0}/auth/spotify'.format(
            self.application.settings['base_url'])
        access = yield self.get_authenticated_user(
                redirect_uri=redir_uri,
                code=code)
        print(access)
        # from here use spotipy - pass it over to a scraper context
        self._ioloop.add_callback(
            save_token,
            provider="spotify",
            user_id=user_id,
            token_data=access
        )
