import smtplib
import os
import logging
import sys
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from environs import Env

# Configuring loggin
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

print(f"Current working directory: {os.getcwd()}", flush=True)

# Loading env file
env = Env()
env.read_env('.env.local')

# Set up your email details
subject = "Booking confirmed!"
sender = os.getenv('EMAIL_USER')
GMAIL_APP_PASS = os.getenv('GMAIL_APP_PASS')
recipient = sys.argv[1]

# Setup to work starting from 'backend/dist/' folder...
try:
    with open('dist/invoice/invoices/email_format.html', 'r') as file:
        html_content = file.read()
except Exception as e:
    logging.error("Error reading HTML file: %s", e)
    exit(1)

print(html_content)

# Create email message
msg = MIMEMultipart("alternative")
msg['subject'] = subject
msg['from'] = sender
msg['to'] = recipient
part = MIMEText(html_content, "html")
msg.attach(part)

# Connect to the Gmail SMTP server
try:
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        logging.info("Connecting to SMTP server...")
        server.login(sender, GMAIL_APP_PASS)
        logging.info("Login successful")
        server.sendmail(sender, recipient, msg.as_string())
        logging.info("Email sent successfully.")
except smtplib.SMTPException as e:
    logging.error("!!!SMTP error occurred!!!: %s", e)
except Exception as e:
    logging.error("!!!Error occurred!!! %s", e)