import praw

from lib.database import save_token
from lib.basehandler import OAuthRequestHandler

class RedditAuth(OAuthRequestHandler):

    def initialize(self):
        super(RedditAuth, self).setProvider("reddit")
        self.reddit = praw.Reddit('application:qself-server /u/parallaxingposition')
        self.reddit.set_oauth_app_info(client_id=self.application.settings['reddit_oauth']['key'],
            client_secret=self.application.settings['reddit_oauth']['secret'],
            redirect_uri="{0}/auth/reddit".format(self.application.settings['base_url']))

    def startFlow(self):
        url = self.reddit.get_authorize_url('uniqueKey', 'identity,flair,history,mysubreddits,privatemessages', True)
        self.redirect(url)

    def handleAuthCallBack(self, code, user_id):
        access_info = self.reddit.get_access_information(code)
        self.reddit.set_access_credentials(**access_info)
        print(access_info)

        # save the token
        self._ioloop.add_callback(save_token, provider="reddit", user_id=user_id, token_data=access_info)

        #evenutually do an async fetch
        user = self.reddit.get_me()
        print(user)
