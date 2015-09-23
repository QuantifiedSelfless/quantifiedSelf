from tornado import web
from tornado import gen

import ujson as json
from cStringIO import StringIO
import time
import datetime

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
