from linkedin import linkedin
import webbrowser
API_KEY = ''
API_SECRET = ''
RETURN_URL = 'http://localhost:8080'

#Put in your applications key and secret and set the return url to a local-host or
#to your personal server

#Make sure to adjust the settings.py file to adjust permissions to match your application

#I ran a local-host server to recieve the authentication request, copy-paste everything 
#after 'code' and before 'state' into the authentication.authorization_code()

#Uncomment and run get_access_token(), paste after token

authentication = linkedin.LinkedInAuthentication(API_KEY, API_SECRET, RETURN_URL, linkedin.PERMISSIONS.enums.values())
# Optionally one can send custom "state" value that will be returned from OAuth server
# It can be used to track your user state or something else (it's up to you)
# Be aware that this value is sent to OAuth server AS IS - make sure to encode or hash it
#authorization.state = 'your_encoded_message'

webbrowser.open(authentication.authorization_url)
application = linkedin.LinkedInApplication(authentication)

#authentication.authorization_code = 'AQSfQQM44_svDxHk4FegtsysX0WkA-xaRTBlHw0tkH8JMv0ozcMie-dc2EMbOCnsGJXf2-IYOjxQm25D5TTd1zzfey_zg2koG8h0uDEyRAu87d3qyiU'
#print authentication.get_access_token()

#application = linkedin.LinkedInApplication(token='AQUlPPGSJ5u3wQThGW5TYFLy2UGuskBnA48-BPQurvPye6vHLqF46Kv0CFP9FCcR8QwqvqlpYqe3dQCUMexQ8fs4wq6B34TnlkFUXRNDEVUBxPosZ1RXQ5ePTcGYTq3oUTfGEWP6AkJI5pc3sJpZ323L11_jmWQIKLTzb5sWtxnL8EHxoaU')
#print application.get_profile()
#print application.get_connections()
