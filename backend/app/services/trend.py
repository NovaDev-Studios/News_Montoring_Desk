from collections import Counter
import re
import string

# Helper function to clean and tokenize text
def tokenize(text):
    # Convert text to lowercase
    text = text.lower()
    # Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))
    # Tokenize the cleaned text into words
    words = re.findall(r'\w+', text)
    return words

# Function to predict trend by analyzing word frequency in headlines
def predict_trend(headlines):
    # Merge all headlines into one text
    text = ' '.join(headlines)
    
    # Tokenize and count word frequency
    words = tokenize(text)
    word_counts = Counter(words)
    
    # Return the top 5 frequent words
    return word_counts.most_common(5)

# Function to analyze news trends from multiple sources
def analyze_news_trends(news_headlines):
    trends = {}
    for source, headlines in news_headlines.items():
        trends[source] = predict_trend(headlines)
    return trends

# Example usage
if __name__ == "__main__":
    # Example of news headlines from different sources
    news_headlines = {
        "BBC": [
            "Bitcoin hits all-time high as market demand grows",
            "Crypto market recovery expected amid global uncertainty",
            "Ethereum surpasses Bitcoin in daily transactions"
        ],
        "CNN": [
            "Bitcoin price volatility continues to scare investors",
            "Ethereum price surge surprises analysts",
            "Global economy sees increased adoption of blockchain technology"
        ]
    }

    # Analyze the trends
    trends = analyze_news_trends(news_headlines)
    
    # Display the top trends for each source
    for source, trend in trends.items():
        print(f"Top trends for {source}:")
        for word, count in trend:
            print(f"{word}: {count}")
