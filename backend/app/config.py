class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'  # or your desired database URI
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Optional: disable unnecessary feature
    SECRET_KEY = 'your_secret_key'  # Use a secret key for security purposes
