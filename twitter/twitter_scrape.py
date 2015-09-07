#!/usr/bin/env python

# TODO
# Delve into user relations
#	-change into function, recursively call

import rethinkdb as r
from TwitterAPI import TwitterAPI
from creds import CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET

conn = r.connect(host='localhost', port=28015, db='Twitter')

conn.repl()

api = TwitterAPI(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET)

screen_name = raw_input("Enter a Screen Name: ")

# Start Function Here
# def get_user_data():

friends = api.request('friends/ids', {'screen_name':screen_name})
info_raw = api.request('users/show', {'screen_name':screen_name})
info_dict = {}

for item in info_raw:
	for entry in item:
		if str(entry) != 'status':
			info_dict[str(entry)] = str(item[entry])

r.table("Users").insert([info_dict],conflict="update").run()
