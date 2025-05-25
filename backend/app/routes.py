from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from . import db  # Get db from the main app init
from .models import User, Article  # Get only models here
from .services.scraper import scrape_bbc
from .services.sentiment import analyze_sentiment
from .trend_analysis import analyze_trends

# Blueprints
auth = Blueprint('auth', __name__)
main = Blueprint('main', __name__)
admin = Blueprint('admin', __name__)

# Login Manager setup
login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Login route
@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            login_user(user)
            return redirect(url_for('main.dashboard'))
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('login.html')

# Logout route
@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.dashboard'))

# Sign up route
@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        role = request.form.get('role')
        new_user = User(username=username, email=email, role=role)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        flash(f'Account created for {username}!', 'success')
        return redirect(url_for('auth.login'))
    return render_template('signup.html')

# Dashboard route (protected)
@main.route('/dashboard')
@login_required
def dashboard():
    try:
        articles = scrape_bbc()  # If you add CNN, scrape both
        if not articles:
            flash('No articles found.', 'warning')
            return render_template('dashboard.html', sentiment_counts_bbc={}, sentiment_counts_cnn={}, trends_bbc={}, trends_cnn={})

        # Analyze BBC sentiments
        sentiment_counts_bbc = {
            'positive': 0,
            'negative': 0,
            'neutral': 0
        }

        for article in articles:
            sentiment = analyze_sentiment(article['title'])
            if sentiment in sentiment_counts_bbc:
                sentiment_counts_bbc[sentiment] += 1

        # Analyze BBC trends
        trends_bbc = analyze_trends(articles)

        # Dummy CNN data for now (or scrape CNN)
        sentiment_counts_cnn = {
            'positive': 3,
            'negative': 1,
            'neutral': 2
        }

        trends_cnn = {
            'Election': 5,
            'Tech': 2,
            'AI': 3
        }

        return render_template('dashboard.html',
                               sentiment_counts_bbc=sentiment_counts_bbc,
                               sentiment_counts_cnn=sentiment_counts_cnn,
                               trends_bbc=trends_bbc,
                               trends_cnn=trends_cnn)

    except Exception as e:
        flash(f'Error fetching articles: {str(e)}', 'danger')
        return render_template('dashboard.html', sentiment_counts_bbc={}, sentiment_counts_cnn={}, trends_bbc={}, trends_cnn={})

# Search route
@main.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    articles = Article.query.filter(Article.title.contains(query)).all()
    return render_template('search_results.html', articles=articles)

# Admin Panel route (restricted to Admin role)
@admin.route('/admin')
@login_required
def admin_panel():
    if current_user.role != 'Admin':
        return redirect(url_for('main.dashboard'))
    users = User.query.all()
    return render_template('admin_panel.html', users=users)

# Register Blueprints (in main app, if not already done)
def init_app(app):
    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(main, url_prefix='/main')
    app.register_blueprint(admin, url_prefix='/admin')
