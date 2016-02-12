import smtplib
from tornado import gen
from email.mime.text import MIMEText

from .config import CONFIG


class EmailSender:
    def __init__(self, username, password, server="smtp.gmail.com", port=465):
        self.username = username
        self.password = password
        self.server = server
        self.port = port
        self.client = smtplib.SMTP_SSL(self.server, self.port)
        self.client.login(self.username, self.password)

    def send_email(self, email, subject, template, meta):
        with open('lib/email_templates/' + template, 'rb') as fp:
            msg = MIMEText(fp.read().format(meta), 'html')
        msg['Subject'] = subject
        msg['From'] = self.username
        msg['To'] = email
        self.client.sendmail(msg['From'], [msg['To']], msg.as_string())


@gen.coroutine
def send_confirmation(email, name):
    sender = EmailSender(
        CONFIG.get('email_address'),
        CONFIG.get('email_pass')
    )
    sender.send_email(
        email,
        name,
        'Ticket Confirmation - Quantified Self',
        'confirmation.html',
        {'name': name}
    )


@gen.coroutine
def send_deauthorization(email, name, link):
    sender = EmailSender(
        CONFIG.get('email_address'),
        CONFIG.get('email_pass')
    )
    sender.send_email(
        email,
        name,
        'Deauthorize - Quantified Self',
        'deauthorization.html',
        {'name': name, 'link': link}
    )


@gen.coroutine
def send_email(email, name, subject, template, meta):
    sender = EmailSender(
        CONFIG.get('email_address'),
        CONFIG.get('email_pass')
    )
    sender.send_email(email, name, subject, template, meta)
