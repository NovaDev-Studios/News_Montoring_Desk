
from flask_wtf import FlaskForm, Form
from wtforms import (StringField, SubmitField, IntegerField, 
                    FileField, PasswordField, DateTimeField, BooleanField, SelectField)
from wtforms.validators import (DataRequired, Email, 
                                EqualTo, Length, ValidationError)
from flask_wtf.file import FileField, FileAllowed
from .models import*

class SignUpForm(FlaskForm):
    username         =  StringField("username", validators=[DataRequired(), Length(min=2, max=20, 
                                    message="Username must be between 2 and 20 characters")])
    email            =  StringField("email", validators=[DataRequired(), 
                                    Email(message="Please enter a valid email")])
    password         =  PasswordField('password', validators=[DataRequired(), 
                                    Length(min=6, message="Password should be atleast 6 characters")])
    # confirm_password =  PasswordField('confirm Password', validators=[DataRequired(), EqualTo('password', message='Password do not match')])
    role             =  SelectField("role", choices =[('admin', 'Administrator'), ('user', 'User')],
                                    validators=[DataRequired(message="Please select a role.")])
    submit           =  SubmitField("Submit")

class LoginForm(FlaskForm):
    email            =  StringField("email", validators=[DataRequired(), 
                                    Email(message="Please enter a valid email")])
    password         =  PasswordField('password', validators=[DataRequired(), 
                                    Length(min=6, message="Password should be atleast 6 characters")])
    submit           =  SubmitField("Login")
