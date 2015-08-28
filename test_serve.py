import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Here to help you figure out reality since 1872.")

app = tornado.web.Application([
    (r"/", MainHandler),
])

if __name__ == "__main__":
    app.listen(6060)
    tornado.ioloop.IOLoop.current().start()

