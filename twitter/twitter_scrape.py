#!/usr/bin/env python

from TwitterAPI import TwitterAPI
from creds import CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET

api = TwitterAPI(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET)

screen_name = raw_input("Enter a Screen Name: ")

info = api.request('users/show', {'screen_name':screen_name})

for item in info:
	for entry in item:
		if str(entry) != 'status':
			print(str(entry), str(item[entry]))


