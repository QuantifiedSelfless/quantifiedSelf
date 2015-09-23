from tornado import auth
class SpotifyOAuth2Mixin(OAuth2Mixin):
    """Spotify authentication using OAuth2.

    In order to use, register your application with Spotify and copy the
    relevant parameters to your application settings.

    """
    
    _OAUTH_AUTHORIZE_URL = "https://accounts.spotify.com/authorize"
    _OAUTH_ACCESS_TOKEN_URL = "https://account.spotify.com/api/token"
    _OAUTH_NO_CALLBACKS = False
    _SPOTIFY_BASE_URL_ = "https://account.spotify.com/v1"
    @_auth_return_future
     def get_authenticated_user(self, redirect_uri, client_id, client_secret,
                               code, callback, extra_fields=None):
       
        http = self.get_auth_http_client()
        args = {
            "redirect_uri": redirect_uri,
            "code": code,
            "client_id": client_id,
            "client_secret": client_secret,
        }

        fields = set([''])
        if extra_fields:
            fields.update(extra_fields)

        http.fetch(self._oauth_request_token_url(**args),
                   functools.partial(self._on_access_token, redirect_uri, client_id,
                                     client_secret, callback, fields))


    def _on_access_token(self, redirect_uri, client_id, client_secret,
                         future, fields, response):
        if response.error:
            future.set_exception(AuthError('Spotify auth error: %s' % str(response)))
            return

        args = escape.parse_qs_bytes(escape.native_str(response.body))
        session = {
            "access_token": args["access_token"][-1],
            "expires": args.get("expires")
        }

        self.spotify_request(
            path="/me",
            callback=functools.partial(
                self._on_get_user_info, future, session, fields),
            access_token=session["access_token"],
            fields=",".join(fields)
        )

    def spotify_request(self, path, callback, access_token=None, post_args=None, **args):
        url = self._SPOTIFY_BASE_URL + path
        return self.oauth2_request(url, callback, access_token, post_args, **args)
