import requests
from bs4 import BeautifulSoup

# Function to fetch news headlines from a URL
def fetch_headlines(url, headline_tag, class_name):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Check if the request was successful
        soup = BeautifulSoup(response.text, 'html.parser')

        headlines = []
        for headline in soup.find_all(headline_tag, class_=class_name):
            headlines.append(headline.text.strip())

        return headlines
    except requests.exceptions.RequestException as e:
        print(f"Error fetching headlines from {url}: {e}")
        return []  # Return empty list in case of error

# Scrape BBC news
def scrape_bbc_news():
    bbc_url = "https://www.bbc.com/news"
    return fetch_headlines(bbc_url, 'h3', 'gs-c-promo-heading__title')

# Scrape other news sources with customizable parameters
def scrape_other_sources(url, headline_tag, class_name):
    return fetch_headlines(url, headline_tag, class_name)

# Example of scraping multiple sources
def get_news_from_sources():
    bbc_headlines = scrape_bbc_news()
    cnn_headlines = scrape_other_sources("https://edition.cnn.com", 'h3', 'cd__headline')

    # Returning a dictionary with unique headlines for each source
    return {
        "BBC": list(set(bbc_headlines)),  # Remove duplicate headlines
        "CNN": list(set(cnn_headlines))   # Remove duplicate headlines
    }

# Example usage
if __name__ == "__main__":
    news = get_news_from_sources()
    print(news)
