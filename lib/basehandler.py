from tornado import web
from tornado import gen

from .database.auth import deny

import json
import time


class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        elif isinstance(obj, bytes):
            return obj.decode('utf8')
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
