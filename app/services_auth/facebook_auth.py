from tornado import gen
from tornado import auth

from lib.database.auth import save_token

from lib.basehandler import OAuthRequestHandler


class FacebookAuth(OAuthRequestHandler, auth.FacebookGraphMixin):
    scope = ["public_profile", "email", "user_friends", "user_posts",
             "user_likes", "user_about_me", "user_education_history",
             "user_events", "user_photos", "user_relationships",
             "user_birthday", "user_videos", "user_games_activity",
             "user_status", "user_relationship_details", 
             "user_work_history", "read_custom_friendlists",
             "user_religion_politics"]

    def initialize(self):
        super(FacebookAuth, self).setProvider("facebook")

    def startFlow(self):
        self.authorize_redirect(
            redirect_uri="{0}/auth/facebook".format(
                self.application.settings['base_url']),
            client_id=self.application.settings['facebook_oauth']['key'],
            client_secret=self.application.settings['facebook_oauth']['secret'],
            scope=self.scope)
        return

    @gen.coroutine
    def handleAuthCallBack(self, code, user_id):
        access = yield self.get_authenticated_user(
            redirect_uri="{0}/auth/facebook".format(
                self.application.settings['base_url']),
            client_id=self.application.settings['facebook_oauth']['key'],
            client_secret=self.application.settings['facebook_oauth']['secret'],
            code=code,
        )

        yield save_token(
            provider='facebook',
            user_id=user_id,
            token_data=access
        )
