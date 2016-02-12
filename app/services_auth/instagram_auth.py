from tornado import gen
from instagram.client import InstagramAPI
from lib.database import save_token

from lib.basehandler import OAuthRequestHandler

# hack because the instagram team won't get their shit together and merge a
# year-old issue on their codebase
# (https://github.com/Instagram/python-instagram/pull/139)
import instagram.oauth2
from httplib2 import Http
instagram.oauth2.Http = lambda *args, **kwargs: Http()


class InstagramAuth(OAuthRequestHandler):
    scope = [
        'basic',
        'comments',
        'likes',
        'relationships',
    ]

    def initialize(self):
        super(InstagramAuth, self).setProvider("instagram")
        consumer_key = self.application.settings['instagram_oauth']['key']
        consumer_secret = \
            self.application.settings['instagram_oauth']['secret']
        redir_uri = "{0}/auth/instagram".format(
            self.application.settings['base_url'])
        self.api = InstagramAPI(
            client_id=consumer_key,
            client_secret=consumer_secret,
            redirect_uri=redir_uri,
        )

    def startFlow(self):
        self.redirect(self.api.get_authorize_login_url(scope=self.scope))

    @gen.coroutine
    def handleAuthCallBack(self, code, user_id):
        access_info = self.api.exchange_code_for_access_token(code)

        # Confirmation & Saving token
        yield save_token(
            provider="instagram",
            user_id = user_id,
            token_data=access_info
        )
