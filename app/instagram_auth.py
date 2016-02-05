from instagram.client import InstagramAPI
from lib.email_sender import send_confirmation
from lib.database import get_user
from lib.database import save_token

from lib.basehandler import OAuthRequestHandler


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

    def handleAuthCallBack(self, code, user_id):
        access_info = self.api.exchange_code_for_access_token(code)
        print(access_info)

        # Confirmation & Saving token
        self._ioloop.add_callback(
            save_token,
            provider="instagram",
            token_data=access_info
        )
        user = yield from get_user(user_id)
        self._ioloop.add_callback(
            send_confirmation,
            user=user['email'],
            name=user['name']
        )
