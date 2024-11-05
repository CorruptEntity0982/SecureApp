import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel

app = FastAPI()
router = APIRouter()

GMAIL_USERNAME = os.getenv('EMAIL_USER')
GMAIL_PASSWORD = os.getenv('EMAIL_PASS')

class AlertEmail(BaseModel):
    email: str
    crypto: str
    location: str

def send_otp_email(email, location):
    subject = "Shashank's Alert has been Triggered"
    body = f"Current location: {location}"
    msg = MIMEMultipart()
    msg.attach(MIMEText(body, 'plain'))
    msg['Subject'] = subject
    msg['From'] = GMAIL_USERNAME
    msg['To'] = email

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(GMAIL_USERNAME, GMAIL_PASSWORD)
        server.sendmail(GMAIL_USERNAME, email, msg.as_string())

@router.post('/sendAlertEmail')
async def send_alert_email(alert_email: AlertEmail):
    try:
        send_otp_email(alert_email.email, alert_email.location)
        return {"message": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the app
app.include_router(router)