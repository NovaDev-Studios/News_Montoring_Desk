class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:nehecode@localhost:5432/mydb'  # or your desired database URI
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Optional: disable unnecessary feature
    SECRET_KEY = 'your_secret_key'  # Use a secret key for security purposes
