from flask import Blueprint, jsonify
from .services.sentiment import analyze_news_sentiments

# Create Blueprint for sentiment routes
sentiment_bp = Blueprint('sentiment_bp', __name__, url_prefix='/api/sentiment')

@sentiment_bp.route('/', methods=['GET'])
def get_sentiment():
    # Example sample data (replace with real scraped data later)
    news_headlines = {
        "BBC": ["Bitcoin hits new high", "Regulations are changing", "Investors are optimistic"],
        "CNN": ["Crypto crash fear rises", "Stock market falls again"]
    }

    # Perform sentiment analysis
    sentiments = analyze_news_sentiments(news_headlines)
    return jsonify(sentiments)
