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
        print 'Yo Im Peyman'

    def SendConfirmation(self, email, name):
        print 'XXX'
        client = smtplib.SMTP_SSL(self.server, self.port)
        print self.username
        print self.password
        client.login(self.username, self.password)
        fp = open('lib/email_templates/confirmation.html', 'rb')
        msg = MIMEText(fp.read().format(name), 'html')
        fp.close()
        msg['Subject'] = 'Ticket Confirmation - Quantified Self'
        msg['From'] = self.username
        msg['To'] = email
        client.sendmail(msg['From'], [msg['To']], msg.as_string())
        client.close()
        print 'GOOD BYE'

_emailsender = EmailSender(EMAIL_ADDRESS, EMAIL_PASS)

@gen.coroutine
def send_confirmation(user, name):
    print 'YO MA MA 23'
    sender = _emailsender
    conf = sender.SendConfirmation(user, name)
    print 'YO MA MA'
    raise gen.Return(conf)
