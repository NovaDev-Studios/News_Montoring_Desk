from flask import Blueprint, render_template, redirect, url_for, flash, request
from werkzeug.security import check_password_hash
from flask_login import login_user, logout_user, login_required
from .models import User
from .forms import SignUpForm, LoginForm
from . import db  # ✅ Import db from your __init__.py

# Register Blueprint
auth = Blueprint('auth', __name__)

# SIGNUP Route (formerly 'register')
@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignUpForm()
    if form.validate_on_submit():
        user = User(
                username = form.username.data,
                email    = form.email.data,
                role     = form.role.data
            )
        user.set_password(form.password.data)

        # Try adding the new user to the database
        try:
            db.session.add(user)
            db.session.commit()
            flash("Account created successfully. Please Log In", "success")
        except Exception as e:
            db.session.rollback()  # Rollback on error
            flash('An error occurred while creating your account. Please try again.')
            print(f"Error: {e}")  # Optionally log the error for debugging purposes
        finally:
            db.session.close()
        return redirect(url_for('auth.login'))
    return render_template('signup.html', form=form)  # Change this to 'signup.html' if needed

# LOGIN Route
@auth.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        try:
            user = User.query.filter_by(email=form.email.data).first()
            if user and user.check_password(form.password.data):
                login_user(user)
                flash('Logged in successfully.')
                return redirect(url_for('main.dashboard')) 
            else:
                flash('Invalid credentials. Please try again', 'danger')
        except:
            flash('Unexpected error occured')

    return render_template('login.html', form=form)

# LOGOUT Route
@auth.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out successfully.')
    return redirect(url_for('auth.login'))  # Redirect to login after logout
