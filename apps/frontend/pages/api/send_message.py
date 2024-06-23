from Google import Create_Service
import base64
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from dotenv import load_dotenv

#CONFIGURATION
CLIENT_SECRET_FILE = 'client_secret.json'
API_NAME = 'gmail'
API_VERSION = 'v1'
SCOPES = ['https://mail.google.com/']
load_dotenv(dotenv_path='../../.env.local')

#Read from html format file...
with open('email_format.html', 'r') as file:
            html_content = file.read()

#Reading data from image file...
# with open('../../public/Images/logo2.png', 'rb') as image_file:
#     image_data = image_file.read()
#     image_base64 = base64.b64encode(image_data).decode()

service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)
mimeMessage = MIMEMultipart()

Rcpt = os.getenv('EMAIL_USER')
RcptPass = os.getenv('EMAIL_PASS')
print(f"RCPT TO: {Rcpt}")
print(f"RCPT TO PASS: {RcptPass}")
emailMsg = html_content
# image_cid = 'ABCTravelPlanner@logo.com'  # Unique identifier
# emailMsg = emailMsg.replace("../../public/Images/logo2.png", f'cid:{image_cid}')
# emailMsg += f'<img src="cid:{image_cid}" alt="ABC Travel Planner">'

mimeMessage['to'] = Rcpt
# mimeMessage['from'] = 'techtitans.capstone@gmail.com'
mimeMessage['subject'] = 'Booking confirmed!'

# mimeMessage.attach(MIMEImage(image_data, name='logo2.png', _subtype='png'))
mimeMessage.attach(MIMEText(emailMsg, 'html'))
raw_string = base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode()

message = service.users().messages().send(userId='me', body={'raw': raw_string}).execute()
print(message)