from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from .config import Config
from flask_cors import CORS 

# Initialize extensions
db = SQLAlchemy()
login_manager = LoginManager()
migrate = Migrate()

login_manager.login_view = 'auth.login'

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, origins=["http://localhost:5173"])

    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app, db)

    # Register core blueprints
    from .auth import auth
    from .main import main
    app.register_blueprint(auth)
    app.register_blueprint(main)

    # ✅ Register analysis blueprints
    from .sentiment_routes import sentiment_bp
    from .trend_analysis import trend_analysis
    app.register_blueprint(sentiment_bp)
    app.register_blueprint(trend_analysis)

    # Import models here to avoid circular imports
    with app.app_context():
        from .models import User, Role, UserRole
        # Only create tables in development mode (use migrations in production)
        if app.config.get("ENV") == "development":
            db.create_all()

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    return app
