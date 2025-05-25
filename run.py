from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from app.routes import main, auth, admin  # ✅ Import all blueprints
from app.sentiment_routes import sentiment_bp
from app.trend_analysis import trend_analysis
from app.models import db  # Make sure your db = SQLAlchemy() is in models.py

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///news_monitoring.db'

# Initialize extensions
db.init_app(app)
login_manager = LoginManager()
login_manager.login_view = 'auth.login'
login_manager.init_app(app)

# Register blueprints
app.register_blueprint(main)                      # ✅ main blueprint — '/' and '/dashboard'
app.register_blueprint(auth, url_prefix='/auth')  # ✅ auth blueprint
app.register_blueprint(admin, url_prefix='/admin')# ✅ admin blueprint
app.register_blueprint(sentiment_bp)              # Optional API blueprint
app.register_blueprint(trend_analysis)            # Optional API blueprint

if __name__ == '__main__':
    app.run(debug=True)
