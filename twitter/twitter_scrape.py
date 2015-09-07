#!/usr/bin/env python

# TODO
# Delve into user relations
#	-change into function, recursively call
#	-Depth first search: scrape friends, then friends of friends

import rethinkdb as r
from TwitterAPI import TwitterAPI
from creds import CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET

conn = r.connect(host='localhost', port=28015, db='Twitter')

conn.repl()

api = TwitterAPI(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET)

screen_name = raw_input("Enter a Screen Name: ")

get_user_data(screen_name)

# Start Function Here
def get_user_data(username):

	friend_list = api.request('friends/list', {'screen_name':screen_name})
	info_raw = api.request('users/show', {'screen_name':screen_name})
	info_dict = {}

	for item in info_raw:
		for entry in item:
			if str(entry) != 'status':
				info_dict[entry] = item[entry]

	friend_count = info_dict['friends_count']
	friend_info_array = [dict() for x in range(friend_count)]
	r.table("Users").insert([info_dict],conflict="update").run()

	# Rework - queue of ids
	# tweets, friends, favorites per each person
	# iterative instead of recursive

	for dictionary in friend_info_array:
		for person in friend_list:
			for category in person:
				dictionary[category] = person[category]
