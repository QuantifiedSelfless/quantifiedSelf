import rethinkdb as r
import spotipy as spot
import spotipy.oauth2 as sp
import webbrowser
API_KEY = 'a987eda1da2e4858a71797b672dd59f5'
API_SECRET = '3c43d8e486514e338cf30d827ad03422'
RETURN_URL = 'http://localhost:8000'
PERMISSIONS = 'playlist-read-private playlist-read-collaborative user-follow-read user-library-read user-read-birthdate user-read-email'

#------------------------------------------------------------------------------------
authentication = sp.SpotifyOAuth(API_KEY, API_SECRET, RETURN_URL, scope=PERMISSIONS)
webbrowser.open(authentication.get_authorize_url())

#------------------------------------------------------------------------------------
#code = authentication.parse_response_code('Directory listing for /?code=AQAve84F0e7kpQ1XeIboAeMHm72oBVk0G3wlUf4TSROX8acaxA40peivCveQp05A1DNY5faEybx3m8TOfWdq6Vl_55A9KN--8iQ2BqwCkM4BRIG7p-Osz43_1hnjJscaj_6dPqexZ5cHajEoqqdSx50vAZzRWRNxiSDzDvT5hK1hqSSjBJTTV172gvgVorKZ98HflN54PurxDkpx-Wpzgp47Gj1bCPNA9TxGoHXDhVLYbO4et6RdsPWqgkNBHjoow2ZblNi-0PAu4bxdBdP9W2m5J5KIbl1Rt74cKX-fH5q5e5ZCBiso3ZY5EJMh9RfwxWCvOQAxt7cpG5DFlTacwu5dI5k8dXu4W1E')
#token = authentication.get_access_token(code)

#------------------------------------------------------------------------------------
#application = spot.Spotify(auth='BQBT3xoMT7NmRRdiRI16kkqPwDL3lXW1FO2Z2M7T4Ki6IuyjARjT104w6QUnZ5NexZelO7nSkQv1ThUs_-jC_xPbaQig0AnJ93lWGxHK0MfJxrmtwWYFjUWgKbCaMzavkWXALIf6eF6fFcRnZcUhLUbnh0Cifu2-Me59UI388ARdVvY_ba5woQ')
#print application._get(https://api.spotify.com/v1/me)
#r.connect("localhost", 28015).repl()
#r.db("test").table_create('user_profiles').run();
#r.table('user_profiles').insert().run();
