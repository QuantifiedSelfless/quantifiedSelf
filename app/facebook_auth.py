from tornado import web
from tornado import gen
from tornado import auth
from tornado import ioloop
import ujson as json

from lib.database import save_token
from lib.database import deny

from lib.basehandler import OAuthRequestHandler

class FacebookAuth(OAuthRequestHandler, auth.FacebookGraphMixin):
    def initialize(self):
        super(FacebookAuth, self).setProvider("facebook")

    def startFlow(self):
        print 'here'
        self.authorize_redirect(
            redirect_uri= "{0}/auth/facebook".format(self.application.settings['base_url']),
            client_id=self.application.settings['facebook_oauth']['key'],
            client_secret=self.application.settings['facebook_oauth']['secret'],
            scope = ["public_profile","email","user_friends", "user_posts", "user_likes", "user_about_me", "user_education_history", "user_events", "user_photos", "user_relationships", "user_birthday", "user_videos", "user_games_activity", "user_status", "user_relationship_details", "user_hometown", "user_work_history", "read_custom_friendlists", "user_religion_politics"])
        return

    def handleAuthCallBack(self, code, user_id):
        access = yield self.get_authenticated_user(
                redirect_uri= "{0}/auth/facebook".format(self.application.settings['base_url']),
                client_id=self.application.settings['facebook_oauth']['key'],
                client_secret=self.application.settings['facebook_oauth']['secret'],
                code=code)

        self._ioloop.add_callback(save_token, provider='facebook', user_id=user_id, token_data=access)
        print access
