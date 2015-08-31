import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")

class TestHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("home.html")

app = tornado.web.Application([
    (r"/", MainHandler),
    (r"/test", TestHandler),
   # (r"/favicon.ico", tornado.web.StaticFileHandler, {"path":"."}),
],
    template_path = "./templates/",
    static_path = "./static/",
    )

if __name__ == "__main__":
    app.listen(6060)
    tornado.ioloop.IOLoop.current().start()

