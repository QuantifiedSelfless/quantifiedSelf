#Tornado stuff
from tornado import gen
from tornado import ioloop

#Google Client
from apiclient.discovery import build

from lib.database import google_user

import ujson as json

@gen.coroutine
def scrape_google_user(http=None):
    print "made it"
    assert http is not None, "no valid http object"
    info_service = build('oauth2', 'v2', http=http)
    myinfo = info_service.userinfo().get().execute()
    print "done going to google"
    user = google_user(myinfo)
    print "done in DB"
    raise gen.Return(user)

