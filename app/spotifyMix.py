from tornado import auth
from tornado import escape

import functools
import urlparse
import urllib as urllib_parse

class SpotifyOAuth2Mixin(auth.OAuth2Mixin):
    """Spotify authentication using OAuth2.

    In order to use, register your application with Spotify and copy the
    relevant parameters to your application settings.

    """

    _OAUTH_AUTHORIZE_URL = "https://accounts.spotify.com/authorize"
    _OAUTH_ACCESS_TOKEN_URL = "https://accounts.spotify.com/api/token"
    _OAUTH_NO_CALLBACKS = True
    _SPOTIFY_BASE_URL = "https://api.spotify.com/v1/"
    
    @auth._auth_return_future
    def get_authenticated_user(self, redirect_uri, 
                               code, callback, extra_fields=None):

        client_id = self.application.settings['spotify_oauth']['key']
        client_secret = self.application.settings['spotify_oauth']['secret']
        http = self.get_auth_http_client()
        body = urllib_parse.urlencode({
            "redirect_uri": redirect_uri,
            "code": code,
            "client_id": client_id, 
            "client_secret": client_secret, 
            "grant_type": "authorization_code",
            })


        http.fetch(self._OAUTH_ACCESS_TOKEN_URL,
                   functools.partial(self._on_access_token, callback),
                   method="POST", 
                   headers={'Content-Type': 'application/x-www-form-urlencoded'},
                   body=body)

    def _on_access_token(self, future, response):
        if response.error:
            future.set_exception(auth.AuthError('Spotify auth error: %s' % str(response)))
            return
        args = escape.json_decode(response.body)
        future.set_result(args)

    @auth._auth_return_future
    def spotify_request(self, path, callback, access_token=None, post_args=None, **args):
        url = self._SPOTIFY_BASE_URL + path
        return self.oauth2_request(url, callback, access_token, post_args, **args)
