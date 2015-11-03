from tornado import httpserver
from tornado import websocket
from tornado import ioloop
from tornado import web
from tornado import escape
#from chatterbot import ChatBot
import json
clients = []
#bot = ChatBot("ChatBot", database="../database.db", logic_adapter="chatterbot.adapters.logic.ClosestMeaningAdapter")

class WSHandler(websocket.WebSocketHandler):
    def open(self, *args):
        print("open", "WebSocketChatHandler")
        #bot.train("chatterbot.corpus.english.greetings")
        #bot.train("chatterbot.corpus.english.conversations")
        clients.append(self)
    def on_message(self, json_object):
        data = escape.json_decode(json_object)
        message = data["message"]
        if (data["function"] == "username"):
            self.username = message
        else:
            #bot.train([message])
            #response = str(bot.get_response(message))
            for client in clients:
                if (data["function"] == "elizachat"):
                    client.write_message("Elizabot: " + message)
                else:
                    client.write_message(client.username + ': ' + message)
                    #client.write_message("ChatBot: " + response)
    def on_close(self):
        clients.remove(self)

class IndexHandler(web.RequestHandler):
    @web.asynchronous
    def get(self):
        return self.render("index.html")

application = web.Application([
    (r'/', IndexHandler), 
    (r'/ws', WSHandler),
    (r'/(.*)', web.StaticFileHandler, {"path": "web"})
])

if __name__ == "__main__":
        print 'Started localhost on 8888'
        application.listen(8888)
        ioloop.IOLoop.instance().start()
