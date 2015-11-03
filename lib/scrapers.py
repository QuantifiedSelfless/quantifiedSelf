#Tornado stuff
from tornado import gen
from tornado import ioloop

#Google Client
from apiclient.discovery import build

from lib.database import google_user

import ujson as json

@gen.coroutine
def scrape_google_user(http=None, user_id=None):
    assert http is not None, "no valid http object"
    assert user_id is not None, "need user id to continue"
    info_service = build('oauth2', 'v2', http=http)
    myinfo = info_service.userinfo().get().execute()
    myinfo['id'] = user_id
    user = google_user(myinfo)
    raise gen.Return(user)


def @gen.coroutine
def scrape_twitter_user(user=None):
    assert user is not None, "need user id to continue"
    #Pull user token from DB
    #Use TwitterAPI Library
    raise gen.Return("done")
