import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

app = tornado.web.Application([
    (r"/", MainHandler),
])

if __name__ == "__main__":
    app.listen(80)
    tornado.ioloop.IOLoop.current().start()

