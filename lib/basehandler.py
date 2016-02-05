from tornado import web
from tornado import gen
from tornado import ioloop

from lib.database import deny


class OAuthRequestHandler(web.RequestHandler):

    def setProvider(self, provider):
        self.provider = provider
        self.setCallBackArgumentName("code")

    def setCallBackArgumentName(self, name):
        self.callBackArgumentName = name

    _ioloop = ioloop.IOLoop().instance()
    @web.asynchronous
    @gen.coroutine
    def get(self):
        if self.get_argument('error', None):
            id = self.get_secure_cookie("user_id")
            self._ioloop.add_callback(deny, provider=self.provider, share="login deny", user_id=id)
            self.finishAuthRequest("failed")
            return

        if self.callBackArgumentName == None:
            self.callBackArgumentName = "code" #default

        if self.get_argument(self.callBackArgumentName, None):
            code=self.get_argument(self.callBackArgumentName)
            id = self.get_secure_cookie("user_id")
            self.handleAuthCallBack(code, id)
            self.finishAuthRequest("success")
            return

        elif self.get_argument('share', None):
            reason = self.get_argument('share', None)
            id = self.get_secure_cookie("user_id")
            self._ioloop.add_callback(deny, provider=self.provider, share=reason, user_id=id)
            self.redirect("{0}/auth/close".format(self.application.settings['base_url']));
            return

        else:
            self.set_cookie("auth-result", "inprogress")
            self.startFlow()
            return

    def finishAuthRequest(self, status):
        self.set_cookie("auth-result", status)
        self.redirect("{0}/auth/close".format(self.application.settings['base_url']));

class BaseHandler(web.RequestHandler):
    def api_response(self, data, code=200, reason=None):
        self.add_header("Access-Control-Allow-Origin", "*")
        self.write({
            "status_code" : code,
            "timestamp" : time.time(),
            "data" : data,
        })
        self.set_status(code, reason)
        self.finish()

    def error(self, code, reason=None, body=None):
        self.add_header("Access-Control-Allow-Origin", "*")
        if body:
            self.write(body)
        self.set_status(code, reason)
        self.finish()
