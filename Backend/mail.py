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
GMAIL_USERNAME = "shashank02.dubey@gmail.com"
GMAIL_PASSWORD = "lqnu dmog npkg ojei"
LOCATION = "https://www.google.com/maps/dir/Watson+Rd,+Vellore,+Tamil+Nadu+632014//@12.9710817,79.1637566,629m/data=!3m1!1e3!4m8!4m7!1m5!1m1!1s0x3bad47a3081919d7:0xee437cdd86eec601!2m2!1d79.163341!2d12.9734047!1m0?entry=ttu&g_ep=EgoyMDI0MTExMi4wIKXMDSoASAFQAw%3D%3D"
MAIL ="shashank.dubey2021@vitstudent.ac.in"

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




