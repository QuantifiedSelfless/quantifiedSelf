from tornado import web
from tornado import gen

from .database.auth import deny
from lib.config import CONFIG

from datetime import datetime
import json
import time
import base64
import bcrypt


def secured(handler_class):

    def wrap_execute(handler_execute):
        def require_basic_auth(handler, kwargs):
            auth_header = handler.request.headers.get('Authorization')
            if auth_header is None or not auth_header.startswith('Basic '):
                handler.set_status(401)
                handler.set_header('WWW-Authenticate',
                                   'Basic realm=Restricted')
                handler._transforms = []
                handler.finish()
                return False
            auth_decoded = base64.b64decode(auth_header[6:]).decode('utf-8')
            user, password = auth_decoded.split(':', 2)
            hashed_password = CONFIG.get('admin_user_pass').encode('utf-8')
            encoded_password = password.encode('utf-8')
            if (user == CONFIG.get('admin_user_id') and
                    bcrypt.hashpw(encoded_password, hashed_password) ==
                    hashed_password):
                return True
            handler.set_status(401)
            handler._transforms = []
            handler.finish()
            return False

        def _execute(self, transforms, *args, **kwargs):
            if not require_basic_auth(self, kwargs):
                return False
            return handler_execute(self, transforms, *args, **kwargs)
        return _execute

    handler_class._execute = wrap_execute(handler_class._execute)
    return handler_class


class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        elif isinstance(obj, bytes):
            return obj.decode('utf8')
        elif isinstance(obj, datetime):
            return int(obj.strftime("%s"))
        return json.JSONEncoder.default(self, obj)


class BaseHandler(web.RequestHandler):
    def api_response(self, data, code=200, reason=None):
        self.set_header("Content-Type", "application/json")
        self.add_header("Access-Control-Allow-Origin", "*")
        self.write(json.dumps({
            "status_code": code,
            "timestamp": time.time(),
            "data": data,
        }, cls=JSONEncoder))
        self.set_status(code, reason)
        self.finish()

    def error(self, code, message, payload=None):
        self.add_header("Access-Control-Allow-Origin", "*")
        if payload is None:
            payload = {'message': message}
        else:
            payload['message'] = message
        self.api_response(payload, code)

    def get_secure_cookie(self, *args, **kwargs):
        result = super().get_secure_cookie(*args, **kwargs)
        return result.decode()


class OAuthRequestHandler(BaseHandler):
    def setProvider(self, provider):
        self.provider = provider
        self.setCallBackArgumentName("code")

    def setCallBackArgumentName(self, name):
        self.callBackArgumentName = name

    @web.asynchronous
    @gen.coroutine
    def get(self):
        user_id = self.get_secure_cookie("user_id", None)
        if self.get_argument('error', None):
            yield deny(
                provider=self.provider,
                user_id=user_id,
                reason="login deny",
            )
            return self.finishAuthRequest("failed")

        if self.callBackArgumentName is None:
            self.callBackArgumentName = "code"  # default

        if self.get_argument(self.callBackArgumentName, None):
            code = self.get_argument(self.callBackArgumentName)
            yield self.handleAuthCallBack(code, user_id)
            return self.finishAuthRequest("success")
        elif self.get_argument('share', None):
            reason = self.get_argument('share', None)
            yield deny(
                provider=self.provider,
                user_id=user_id,
                reason=reason,
            )
            print("no share provided")
            return self.redirect("{0}/auth/close".format(
                self.application.settings['base_url']))
        else:
            self.set_cookie("auth-result", "inprogress")
            return self.startFlow()
        return self.error(403, "Not authorized.")

    def finishAuthRequest(self, status):
        self.set_cookie("auth-result", status)
        print("finish auth request")
        self.redirect("{0}/auth/close".format(
            self.application.settings['base_url']))
