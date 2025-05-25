from flask import Blueprint, jsonify
from .services.scraper import scrape_bbc_news  # Importing the correct scraping function
from .services.sentiment import analyze_sentiment
from .trend_analysis import analyze_trends

# Create the API blueprint
api_bp = Blueprint('api', __name__)

@api_bp.route('/articles', methods=['GET'])
def get_articles():
    try:
        # Scrape the latest news articles
        articles = scrape_bbc_news()  # Use the correct scraping function
        
        # Check if articles were successfully fetched
        if not articles:
            return jsonify({'message': 'No articles found'}), 404
        
        # Analyze sentiment for each article
        sentiments = [analyze_sentiment(article['title']) for article in articles]
        
        # Analyze trends based on articles
        trends = analyze_trends(articles)
        
        # Combine the articles, sentiments, and trends into one response
        response = {
            'articles': articles,
            'sentiments': sentiments,
            'trends': trends
        }
        
        # Return the data as a JSON response
        return jsonify(response)

    except Exception as e:
        # Handle any errors that occur during the scraping or analysis process
        return jsonify({'error': str(e)}), 500
