import smtplib
from tornado import gen
from email.mime.text import MIMEText

from config import CONFIG

class EmailSender:
    def __init__(self, username, password, server="smtp.gmail.com", port=465):
        self.username = username
        self.password = password
        self.server   = server
        self.port     = port
        self.client = smtplib.SMTP_SSL(self.server, self.port)
        self.client.login(self.username, self.password)

    def SendConfirmation(self, email, name):
        fp = open('lib/email_templates/confirmation.html', 'rb')
        msg = MIMEText(fp.read().format(name), 'html')
        fp.close()
        msg['Subject'] = 'Ticket Confirmation - Quantified Self'
        msg['From'] = self.username
        msg['To'] = email
        self.client.sendmail(msg['From'], [msg['To']], msg.as_string())
        # client.close()

    def SendDeauthorizationEmail(self, email, name, link):
        fp = open('lib/email_templates/deauthorization.html', 'rb')
        msg = MIMEText(fp.read().format(name, link), 'html')
        fp.close()
        msg['Subject'] = 'Deauthorize - Quantified Self'
        msg['From'] = self.username
        msg['To'] = email
        self.client.sendmail(msg['From'], [msg['To']], msg.as_string())


@gen.coroutine
def send_confirmation(user, name):
    sender = EmailSender(
        CONFIG.get('EMAIL_ADDRESS'), 
        CONFIG.get('EMAIL_PASS')
    )
    conf = sender.SendConfirmation(user, name)
    raise gen.Return(conf)

@gen.coroutine
def send_deauthorization(user, name, link):
    sender = EmailSender(
        CONFIG.get('EMAIL_ADDRESS'), 
        CONFIG.get('EMAIL_PASS')
    )
    conf = sender.SendDeauthorizationEmail(user, name, link)
    raise gen.Return(conf)
