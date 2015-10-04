#!/usr/bin/env python

## TODO
# Modify to get API setup from oauth script
# 
# For each friend, get tweets, add their friends to back of queue
# Depth first tree, either store friends friends tweets in same or different section 
# Fix update not working

import rethinkdb as r
from TwitterAPI import TwitterAPI
from creds import CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET

# Start Function Here

def parse_user_info(user_objects):
	user_dict = {}
	dict_dict = {}
	item_count = 0
	for item in user_objects:
		item_count += 1
		for entry in item:
			if str(entry) == 'name' or str(entry) == 'screen_name' or str(entry) == 'followers_count':
				if(item_count > 1):
					dict_dict[item_count-1] = str(user_dict)
				user_dict[entry] = item[entry]
	if item_count > 1:
		print dict_dict
		return dict_dict
	else:
		print user_dict
		return user_dict

def get_user_data(username):
	friend_list = api.request('friends/list', {'screen_name':username})
	info_raw = api.request('users/show', {'screen_name':username})
	tweets = api.request('statuses/user_timeline', {'screen_name':username, 'count':'200', 'exclude_replies':'true'})
        
	info_dict = parse_user_info(info_raw)

	friend_dict = parse_user_info(friend_list)

	r.table("Users").insert([info_dict],conflict="update").run()

	r.table("Users").filter({"screen_name":username}).update({"friends":str(friend_dict)}).run()

	r.table("Users").filter({"screen_name":username}).update({"tweets":str(tweets)}).run()
	return 0

conn = r.connect(host='localhost', port=28015, db='Twitter')

conn.repl()

api = TwitterAPI(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET)

screen_name = raw_input("Enter a Screen Name: ")

get_user_data(screen_name)
