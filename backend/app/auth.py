from flask import Blueprint, render_template, redirect, url_for, flash, request
from werkzeug.security import check_password_hash
from flask_login import login_user, logout_user, login_required
from .models import User
from . import db  # ✅ Import db from your __init__.py

# Register Blueprint
auth = Blueprint('auth', __name__)

# SIGNUP Route (formerly 'register')
@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        role = request.form.get('role', 'user')  # Default role is 'user'

        # Check if user already exists
        if User.query.filter_by(email=email).first():
            flash('Email already registered.')
            return redirect(url_for('auth.signup'))

        # Create new user
        new_user = User(username=username, email=email, role=role)
        new_user.set_password(password)  # Ensure 'set_password' method hashes the password

        # Try adding the new user to the database
        try:
            db.session.add(new_user)
            db.session.commit()
            flash('Signup successful. Please log in.')
            return redirect(url_for('auth.login'))
        except Exception as e:
            db.session.rollback()  # Rollback on error
            flash('An error occurred while creating your account. Please try again.')
            print(f"Error: {e}")  # Optionally log the error for debugging purposes

    return render_template('signup.html')  # Change this to 'signup.html' if needed

# LOGIN Route
@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()

        if user and user.check_password(password):  # Ensure check_password method compares hashed password
            login_user(user)
            flash('Logged in successfully.')
            return redirect(url_for('main.dashboard'))  # Adjust to your actual dashboard route
        else:
            flash('Invalid credentials. Please try again.')
            return redirect(url_for('auth.login'))

    return render_template('login.html')

# LOGOUT Route
@auth.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out successfully.')
    return redirect(url_for('auth.login'))  # Redirect to login after logout
