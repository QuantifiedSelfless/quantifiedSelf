from tornado import websocket
#from chatterbot import ChatBot

clients = []
#bot = ChatBot("ChatBot", database="../database.db")
class WSHandler(websocket.WebSocketHandler):
    def open(self, *args):
        clients.append(self)
    def on_message(self, message):
        #bot.train([str(message)])
        #response = str(bot.get_response(message))
        for client in clients:
            client.write_message(message)
            #client.write_message(response)
    def on_close(self):
        clients.remove(self)

class EchoWebSocket(websocket.WebSocketHandler):
        def check_origin(self, origin):
            return True

        def open(self):
            print("WebSocket opened")


