from tornado import web
from tornado import gen
from tornado import ioloop

from lib.database import deny

import time


class BaseHandler(web.RequestHandler):
    def api_response(self, data, code=200, reason=None):
        self.add_header("Access-Control-Allow-Origin", "*")
        self.write({
            "status_code": code,
            "timestamp": time.time(),
            "data": data,
        })
        self.set_status(code, reason)
        self.finish()

    def error(self, code, reason=None, body=None):
        self.add_header("Access-Control-Allow-Origin", "*")
        if body:
            self.write(body)
        self.set_status(code, reason)
        self.finish()

    def get_secure_cookie(self, *args, **kwargs):
        result = super().get_secure_cookie(*args, **kwargs)
        return result.decode()


class OAuthRequestHandler(BaseHandler):
    _ioloop = ioloop.IOLoop().instance()

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
            self._ioloop.add_callback(
                deny,
                provider=self.provider,
                share="login deny",
                user_id=user_id
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
            self._ioloop.add_callback(
                deny,
                provider=self.provider,
                share=reason,
                user_id=user_id
            )
            print("no share provided")
            return self.redirect("{0}/auth/close".format(
                self.application.settings['base_url']))
        else:
            self.set_cookie("auth-result", "inprogress")
            return self.startFlow()
        return self.error(403)

    def finishAuthRequest(self, status):
        self.set_cookie("auth-result", status)
        print("finish auth request")
        self.redirect("{0}/auth/close".format(
            self.application.settings['base_url']))
