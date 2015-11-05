import ipdb
from tornado import httpserver
from tornado import websocket
from tornado import ioloop
from tornado import web
from tornado import escape
from nltk import chat
import re
#from chatterbot import ChatBot
import json
from room import Room
#clients = []
rooms = []
#bot = ChatBot("ChatBot", database="../database.db", logic_adapter="chatterbot.adapters.logic.ClosestMeaningAdapter")
break_p = ipdb.set_trace 
class WSHandler(websocket.WebSocketHandler):
    def open(self, *args):
        print("open", "WebSocketChatHandler")
        #bot.train("chatterbot.corpus.english.greetings")
        #bot.train("chatterbot.corpus.english.conversations")
        if (len(rooms) == 0):
            new_room = Room(2)
            self.current_room = new_room
            rooms.append(new_room)
            print("created new room")
        for room in rooms:
            if (room.status):
                self.current_room = room
                room.add_person(self)
                return
        print("created new room")
        new_room = Room(2)
        self.current_room = new_room
        self.current_room.add_person(self)
        rooms.append(new_room)
    def on_message(self, json_object):
        data = escape.json_decode(json_object)
        message = data["message"]
        if (data["function"] == "username"):
            self.username = message
        else:
            #bot.train([message])
            #response = str(bot.get_response(message))
            try:
                private_check = re.search('private', message)
                private_check.group(0)
                message = re.sub('private: ', '', message, 1)
                self.write_message(self.username + ': ' + '(Private Message) ' + message)
                return
            except AttributeError:
                pass
            if (data["function"] == "private_elizachat"):
                self.write_message("Private Elizabot: " + message)
                return
            for person in self.current_room.people:
                if (data["function"] == "elizachat"):
                    person.write_message("Elizabot: " + message)
                else:
                    person.write_message(self.username + ': ' + message)
    def on_close(self):
        self.current_room.remove_person(self)

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
