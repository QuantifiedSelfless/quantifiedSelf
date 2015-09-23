from tornado import web
from tornado import gen
from tornado import ioloop
from tornado import httpclient
import ujson as json
from oauth2client import client
import httplib2
from apiclient.discovery import build
import spotifyMix.py as spot

class SpotifyAuth(web.RequestHandler, spot.SpotifyGraphMixin):
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
            user = yield self.oauth2_request(
                            "https://www.googleapis.com/oauth2/v1/userinfo",
                            access_token=access["access_token"])
            #Set Cookie, Eventually (change cookie_secret)
            # creds = client.OAuth2Credentials(
            #         access_token=access['access_token'],
            #         client_id=self.application.settings['spotify_oauth']['key'],
            #         client_secret=self.application.settings['spotify_oauth']['secret'],
            #         refresh_token=access.get('refresh_token', None),
            #         token_uri=client.GOOGLE_TOKEN_URI,
            #         token_expiry=access.get('expires_in', None),
            #         user_agent='QS-server-agent/1.0',
            #         id_token=access.get('id_token', None)
            #         )
            # http = httplib2.Http()
            # http = creds.authorize(http)
            # info_service = build('oauth2', 'v2', http=http)
            # myinfo = info_service.userinfo().get().execute()
            # print myinfo
            self.redirect('https://iamadatapoint.com/test')
            return
        else:
            yield self.authorize_redirect(
              redirect_uri='https://iamadatapoint.com/auth/spotify',
              client_id=self.application.settings['spotify_oauth']['key'],
              extra_params={"scope": 'playlist-read-private playlist-read-collaborative user-follow-read user-library-read user-read-birthdate user-read-email'
})
