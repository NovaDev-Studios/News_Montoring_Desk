from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from flask_login import login_required, current_user
from .services.scraper import get_news_from_sources
from .services.sentiment import analyze_sentiment
from .services.trend import analyze_news_trends as analyze_trends
from .models import Article

main = Blueprint('main', __name__)

@main.route('/')
@main.route('/')
def home():
    return redirect(url_for('main.dashboard'))


@main.route('/dashboard')
@login_required
def dashboard():
    """Main dashboard — shows news, sentiment, and trends."""
    # Fetch news from sources (BBC, CNN, etc.)
    news = get_news_from_sources()
    bbc_headlines = news.get("BBC", [])
    cnn_headlines = news.get("CNN", [])

    # Perform sentiment analysis on the headlines
    sentiments_bbc = [analyze_sentiment(headline) for headline in bbc_headlines]
    sentiments_cnn = [analyze_sentiment(headline) for headline in cnn_headlines]

    # Analyze trends
    trends = analyze_trends({
        "BBC": bbc_headlines,
        "CNN": cnn_headlines
    })

    # Extract trends per source
    trends_bbc = trends.get("BBC", [])
    trends_cnn = trends.get("CNN", [])

    # Calculate sentiment counts for charts (positive, negative, neutral)
    sentiment_counts_bbc = get_sentiment_counts(sentiments_bbc)
    sentiment_counts_cnn = get_sentiment_counts(sentiments_cnn)

    # Pass all necessary data to the template
    return render_template('dashboard.html',
                           bbc_headlines=bbc_headlines,
                           cnn_headlines=cnn_headlines,
                           sentiments_bbc=sentiments_bbc,
                           sentiments_cnn=sentiments_cnn,
                           trends_bbc=trends_bbc,
                           trends_cnn=trends_cnn,
                           sentiment_counts_bbc=sentiment_counts_bbc,
                           sentiment_counts_cnn=sentiment_counts_cnn)

@main.route('/search', methods=['GET'])
def search():
    """Search for articles in the database."""
    query = request.args.get('query', '')
    articles = Article.query.filter(Article.title.contains(query)).all()
    return render_template('search_results.html', articles=articles, query=query)

@main.route('/api/news', methods=['GET'])
def api_news():
    """Return news headlines as JSON for frontend/API usage."""
    news = get_news_from_sources()
    return jsonify(news)

# Helper function to calculate sentiment counts
def get_sentiment_counts(sentiments):
    counts = {'positive': 0, 'negative': 0, 'neutral': 0}
    for sentiment in sentiments:
        if sentiment == 'positive':
            counts['positive'] += 1
        elif sentiment == 'negative':
            counts['negative'] += 1
        else:
            counts['neutral'] += 1
    return counts

