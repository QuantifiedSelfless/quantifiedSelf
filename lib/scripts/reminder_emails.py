from .lib.email_sender import send_reminder
from .lib.database.showtimes import get_showtimes
from .lib.database.reservations import get_reservations
from .lib.database.users import get_user


def send_reminders():

    all_reservations = yield get_reservations()
    all_showtimes = yield get_showtimes()
    for reservation in all_reservations:
        show_id = reservation['showtime_id']
        date_str = filter(
            (lambda x: x['id'] == show_id),
            all_showtimes)[0]
        user_id = reservation['user_id']
        user = get_user(user_id)
        name = user['name']
        email = user['email']
        send_reminder(email, name, date_str)

if __name__ == '__main__':
    send_reminders()
