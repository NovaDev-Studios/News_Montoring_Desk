from textblob import TextBlob

# Function to analyze sentiment of a single text
def analyze_sentiment(text):
    # Check if the text is empty or not a string
    if not isinstance(text, str) or not text.strip():
        return 0  # Neutral sentiment if invalid text
    try:
        blob = TextBlob(text)
        sentiment = blob.sentiment.polarity  # Positive: >0, Negative: <0, Neutral: 0
        return sentiment
    except Exception as e:
        print(f"Error analyzing sentiment for text: {text[:50]}... Error: {e}")
        return 0  # Return neutral sentiment in case of error

# Function to analyze sentiment for all headlines from multiple sources
def analyze_news_sentiments(news_headlines):
    sentiments = {}
    for source, headlines in news_headlines.items():
        sentiments[source] = [analyze_sentiment(headline) for headline in headlines]
    return sentiments

# Function to classify sentiment into categories (Positive, Negative, Neutral)
def classify_sentiment(sentiment_value):
    if sentiment_value > 0:
        return "Positive"
    elif sentiment_value < 0:
        return "Negative"
    else:
        return "Neutral"

# Example usage
if __name__ == "__main__":
    # Sample news headlines
    news_headlines = {
        "BBC": ["Bitcoin price soars amid market optimism", "New regulations threaten crypto growth"],
        "CNN": ["Breaking news: Cryptocurrency market crash", "Tech industry witnesses unprecedented growth"]
    }

    sentiments = analyze_news_sentiments(news_headlines)
    
    # Classify sentiment for each headline and print results
    for source, sentiment_values in sentiments.items():
        print(f"Sentiment analysis for {source}:")
        for sentiment in sentiment_values:
            sentiment_category = classify_sentiment(sentiment)
            print(f"Sentiment: {sentiment_category}")
