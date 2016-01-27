from tornado import web
from tornado import gen
from tornado import auth
from tornado import ioloop
import ujson as json

from lib.database import save_token
from lib.database import deny

class FacebookAuth(web.RequestHandler, auth.FacebookGraphMixin):
    _ioloop = ioloop.IOLoop().instance()
    @web.asynchronous
    @gen.coroutine
    def get(self):
        if self.get_argument('error', None):
            id = self.get_secure_cookie("user_id")
            self._ioloop.add_callback(deny, provider='facebook', share="login deny", user_id=id)
            # self.redirect("{0}/signup#spotify".format(self.application.settings['base_url']));
            self.redirect("{0}/auth/close".format(self.application.settings['base_url']));
            return
        if self.get_argument('code', None):
            access = yield self.get_authenticated_user(
                    redirect_uri= "{0}/auth/facebook".format(self.application.settings['base_url']),
                    client_id=self.application.settings['facebook_oauth']['key'],
                    client_secret=self.application.settings['facebook_oauth']['secret'],
                    code=self.get_argument('code'))

            id = self.get_secure_cookie('user_id')
            self._ioloop.add_callback(save_token, provider='facebook', user_id=id, token_data=access)
            print access
            self.redirect("{0}/auth/close".format(self.application.settings['base_url']))
            return
        elif self.get_argument('share', None):
            reason = self.get_argument('share', None)
            id = self.get_secure_cookie("user_id")
            self._ioloop.add_callback(deny, provider='facebook', share=reason, user_id=id)
            self.redirect("{0}/auth/close".format(self.application.settings['base_url']));
            return
        else:
            yield self.authorize_redirect(
                redirect_uri= "{0}/auth/facebook".format(self.application.settings['base_url']),
                client_id=self.application.settings['facebook_oauth']['key'],
                client_secret=self.application.settings['facebook_oauth']['secret'],
                scope = ["public_profile","email","user_friends", "user_posts", "user_likes", "user_about_me", "user_education_history", "user_events", "user_photos", "user_relationships", "user_birthday", "user_videos", "user_games_activity", "user_status", "user_relationship_details", "user_hometown", "user_work_history", "read_custom_friendlists", "user_religion_politics"])
            return
