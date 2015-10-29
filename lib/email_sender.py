import smtplib
from email.mime.text import MIMEText

class EmailSender:

    def __init__(self, username, password, server="smtp.gmail.com", port=465):
        self.username = username
        self.password = password
        self.server   = server
        self.port     = port


    def SendConfirmation(self, email, name):
        client = smtplib.SMTP_SSL(self.server, self.port)
        client.login(self.username, self.password)
        fp = open('email_templates/confirmation.html', 'rb')
        msg = MIMEText(fp.read().format(name), 'html')
        fp.close()
        msg['Subject'] = 'Ticket Confirmation - Quantified Self'
        msg['From'] = 'quantifiedselfless@gmail.com'
        msg['To'] = email
        client.sendmail(msg['From'], [msg['To']], msg.as_string())
        client.close()


EmailSender("","").SendConfirmation('Michael.Skirpan@colorado.edu', 'Quantified Self')
