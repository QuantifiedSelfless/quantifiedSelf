from tornado import web
from tornado import gen
from tornado import auth
import ujson as json


class FacebookAuth(web.RequestHandler, auth.FacebookGraphMixin):
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
                    redirect_uri= "{0}/auth/facebook".format(self.application.settings['base_url']),
                    client_id=self.application.settings['facebook_oauth']['key'],
                    client_secret=self.application.settings['facebook_oauth']['secret'],
                    code=self.get_argument('code'))
            #Set Cookie, Eventually (change cookie_secret)
            print access
            self.redirect("{0}/signup#spotify".format(self.application.settings['base_url']))
            return
        elif self.get_argument('share', None):
            reason = self.get_argument('share', None)
            id = self.get_secure_cookie("user_id")
            self._ioloop.add_callback(deny_google, share=reason, user_id=id)
            self.redirect("{0}/signup#spotify".format(self.application.settings['base_url']));
            return
        else:
            yield self.authorize_redirect(
                redirect_uri= "{0}/auth/facebook".format(self.application.settings['base_url']),
                client_id=self.application.settings['facebook_oauth']['key'],
                client_secret=self.application.settings['facebook_oauth']['secret'],
                scope = ["public_profile","email","user_friends", "user_posts", "user_likes", "user_about_me", "user_education_history", "user_events", "user_photos", "read_mailbox", "user_actions.news", "user_relationships", "user_birthday", "user_videos", "user_games_activity", "user_status", "user_relationship_details", "user_hometown", "user_work_history", "user_actions.music", "read_custom_friendlists", "user_religion_politics", "read_custom_friendlists", "read_stream"  ])
            return
