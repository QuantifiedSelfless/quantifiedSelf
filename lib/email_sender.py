import smtplib
from tornado import gen
from email.mime.text import MIMEText
from app.creds import EMAIL_ADDRESS, EMAIL_PASS

class EmailSender:

    def __init__(self, username, password, server="smtp.gmail.com", port=465):
        self.username = username
        self.password = password
        self.server   = server
        self.port     = port

    def SendConfirmation(self, email, name):
        client = smtplib.SMTP_SSL(self.server, self.port)
        client.login(self.username, self.password)
        fp = open('lib/email_templates/confirmation.html', 'rb')
        msg = MIMEText(fp.read().format(name), 'html')
        fp.close()
        msg['Subject'] = 'Ticket Confirmation - Quantified Self'
        msg['From'] = self.username
        msg['To'] = email
        client.sendmail(msg['From'], [msg['To']], msg.as_string())
        client.close()

_emailsender = EmailSender(EMAIL_ADDRESS, EMAIL_PASS)

@gen.coroutine
def send_confirmation(user, name):
    sender = _emailsender
    conf = sender.SendConfirmation(user, name)
    raise gen.Return(conf)
