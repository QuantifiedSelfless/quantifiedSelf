from tornado import gen
from tornado import web
from tornado import ioloop
from tornado import httpclient

from lib.database import user_insert
from lib.database import get_user_from_email
from lib.basehandler import BaseHandler
import ujson as json

import uuid

class UserAuth(BaseHandler):
    _ioloop = ioloop.IOLoop().instance()
    @web.asynchronous
    @gen.coroutine
    def post(self):
        name = self.get_argument('name', None)
        email = self.get_argument('email', None)
        showtime_id = self.get_argument('showtime_id', None)

        user = yield get_user_from_email(email)
        if user != None:
            self.set_secure_cookie("user_id", user['id'])
            return

        if showtime_id == None:
            self.error(403, "Must provide showtime_id to proceed.")

        if name == None or email == None:
            self.error(403, "Must provide valid username and email address to continue")
            return
        id = uuid.uuid1()
        self.set_secure_cookie("user_id", str(id))
        data = {"id": str(id), "name":name, "email": email}
        self._ioloop.add_callback(user_insert, data)
        return
