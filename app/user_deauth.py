from tornado import web
from tornado import ioloop
from tornado import gen

from lib.database.users import get_user_from_email
from lib.database.auth import pop_deauth_request
from lib.database.auth import create_deauth_request
from lib.database.auth import delete_user_data
from lib.email_sender import send_deauthorization
from lib.basehandler import BaseHandler

import uuid


class UserDeauth(BaseHandler):
    _ioloop = ioloop.IOLoop().instance()

    @web.asynchronous
    @gen.coroutine
    def get(self):
        if self.get_argument('email', None):
            # pull user from database
            user = yield get_user_from_email(
                self.get_argument('email', None))
            if user is not None:
                token = str(uuid.uuid1())
                yield create_deauth_request(id=token, user_id=user['id'])
                link = "{0}/auth/deauth?token={1}".format(
                    self.application.settings['base_url'],
                    token
                )
                yield send_deauthorization(user['email'], user['name'], link)
            else:
                return self.error(
                    404,
                    "User is either already deleted or not in DB"
                )
            return self.redirect("{0}/leave2".format(
                    self.application.settings['base_url'])
                )

        elif (self.get_argument('token', None)):
            # pop the request
            request = yield pop_deauth_request(
                    self.get_argument('token', None))
            if request is not None:
                yield delete_user_data(user_id=request['user_id'])
                return self.redirect("{0}/fullcancel".format(
                    self.application.settings['base_url'])
                )
            else:
                return self.error(404, "Token not found.")
        else:
            return self.error(400, "Insufficient params.")
