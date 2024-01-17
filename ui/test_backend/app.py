from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
import random
import string
import json

class Category:
    def __init__(self):
        self.name = self.random_name(random.randint(2, 10))
        self.pos = random.randint(1, 15)
        self.neu = random.randint(1, 15)
        self.neg = random.randint(1, 15)
        self.count = self.pos + self.neu + self.neg
        self.pos_perc = round(((self.pos / self.count) * 100), 2)
        self.neu_perc = round(((self.neu / self.count) * 100), 2)
        self.neg_perc = round(((self.neg / self.count) * 100), 2)

    def random_name(self, length):
        letters = string.ascii_letters
        random_word = ''.join(random.choice(letters) for _ in range(length))
        return random_word
        

class Source:
    def __init__(self, name):
        self.name = name
        self.categories = [Category() for _ in range(random.randint(2, 10))]
        self.pos_articles = sum(category.pos for category in self.categories)
        self.neu_articles = sum(category.neu for category in self.categories)
        self.neg_articles = sum(category.neg for category in self.categories)
        self.article_count = self.pos_articles + self.neu_articles + self.neg_articles
        self.article_perc = 0
        self.pos_articles_perc = round(((self.pos_articles / self.article_count) * 100), 2)
        self.neu_articles_perc = round(((self.neu_articles / self.article_count) * 100), 2)
        self.neg_articles_perc = round(((self.neg_articles / self.article_count) * 100), 2)

class Response:
    def __init__(self):
        self.red = Source("Reddit")
        self.nyt = Source("New York Times")
        self.ts = Source("Tagesschau")
        self.sources = [self.red, self.nyt, self.ts]

        self.total_articles = self.red.article_count + self.nyt.article_count + self.ts.article_count
        self.total_categories = len(self.red.categories) + len(self.nyt.categories) + len(self.ts.categories)

        self.red.article_perc = round(((self.red.article_count / self.total_articles) * 100), 2)
        self.nyt.article_perc = round(((self.nyt.article_count / self.total_articles) * 100), 2)
        self.ts.article_perc = round(((self.ts.article_count / self.total_articles) * 100), 2)

        self.red_perc = round(((self.red.article_count / self.total_articles) * 100), 2)
        self.nyt_perc = round(((self.nyt.article_count / self.total_articles) * 100), 2)
        self.ts_perc = round(((self.ts.article_count / self.total_articles) * 100), 2)

class TestDataEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Category):
            return {
                'name': obj.name,
                'count': obj.count,
                'pos': obj.pos,
                'posPerc': obj.pos_perc,
                'neu': obj.neu,
                'neuPerc': obj.neu_perc,
                'neg': obj.neg,
                'negPerc': obj.neg_perc
            }
        elif isinstance(obj, Source):
            return {
                'name': obj.name,
                'articleCount': obj.article_count,
                'articlePerc': obj.article_perc,
                'categoryCount': len(obj.categories),
                'posArticles': obj.pos_articles,
                'posArticlesPerc': obj.pos_articles_perc,
                'neuArticles': obj.neu_articles,
                'neuArticlesPerc': obj.neu_articles_perc,
                'negArticles': obj.neg_articles,
                'negArticlesPerc': obj.neg_articles_perc,
                'categories': [self.default(category) for category in obj.categories]
            }
        elif isinstance(obj, Response):
            return {
                'totalArticles': obj.total_articles,
                'totalCategories': obj.total_categories,
                'sources': [self.default(source) for source in obj.sources]
            }
        return super(TestDataEncoder, self).default(obj)

app = Flask(__name__)
CORS(app)

# Route for Reddit data
@app.route("/api/data", methods=["GET"])
def get_data():
    return jsonify(TestDataEncoder().default(Response()))

##############################################################

class Day:
    def __init__(self, date):
        self.date = date
        self.pos = random.randint(0, 15)
        self.neu = random.randint(0, 15)
        self.neg = random.randint(0, 15)

class Timeline:
    def __init__(self, start_date_str, end_date_str):
        try:
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d')

            current_date = start_date
            self.days = []

            while current_date <= end_date:
                formatted_date = current_date.strftime('%Y-%m-%d')
                self.days.append(Day(formatted_date))
                current_date += timedelta(days=1)

        except ValueError as e:
            return f"Error parsing date: {str(e)}", 400

        


class TestTrendEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Day):
            return {
                'date': obj.date,
                'pos': obj.pos,
                'neu': obj.neu,
                'neg': obj.neg,
            }
        elif isinstance(obj, Timeline):
            return {
                'timeline': [self.default(day) for day in obj.days]
            }
        return super(TestTrendEncoder, self).default(obj)

@app.route("/api/trend", methods=["GET"])
def get_trend():
    start_date_str = request.args.get('startDate')
    end_date_str = request.args.get('endDate')

    return jsonify(TestTrendEncoder().default(Timeline(start_date_str, end_date_str)))

if __name__ == "__main__":
    app.run(debug=True, port=5001)
