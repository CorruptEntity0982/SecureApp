from fastapi import FastAPI, HTTPException, Depends, APIRouter
from typing import Annotated
from pydantic import BaseModel, EmailStr
import smtplib
from sqlalchemy.orm import Session 
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random


router= APIRouter(
    prefix='/otp',
    tags=["OTP"]
)
app = FastAPI()
GMAIL_USERNAME = ""
GMAIL_PASSWORD = ""
LOCATION = ""
MAIL =""

def send_otp_email(email):
    subject = "Shashank's Alert is Triggered"
    body = f"Alert Triggered at:  {LOCATION}"

    msg = MIMEMultipart()
    msg.attach(MIMEText(body, 'plain'))
    msg['Subject'] = subject
    msg['From'] = GMAIL_USERNAME
    msg['To'] = email

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(GMAIL_USERNAME, GMAIL_PASSWORD)
        server.sendmail(GMAIL_USERNAME, email, msg.as_string())

class EmailModel(BaseModel):
    email: str


@app.put("/sendMail")
def login_check():
    send_otp_email(MAIL)
    return {"message": "EMAIL sent successfully"}




