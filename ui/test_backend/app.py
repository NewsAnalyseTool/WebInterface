from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

class Category:
    def __init__(self):
        self.count = random.randint(1, 50)
        self.pos = random.randint(0, self.count)
        self.pos_perc = round(((self.pos / self.count) * 100), 2)
        self.neg = self.count - self.pos
        self.neg_perc = 100 - self.pos_perc
    

# Route for Reddit data
@app.route("/api", methods=["GET"])
def get_data():
    g_data = [Category() for _ in range(10)]
    
    r_article_count = g_data[0].count + g_data[1].count
    nyt_article_count = g_data[2].count + g_data[3].count + g_data[4].count + g_data[5].count
    ts_article_count = g_data[6].count + g_data[7].count + g_data[8].count + g_data[9].count
    
    r_ctgry_count = 2
    nyt_ctgry_count = 4
    ts_ctgry_count = 4
    
    total_articles = r_article_count + nyt_article_count + ts_article_count
    total_categories = r_ctgry_count + nyt_ctgry_count + ts_ctgry_count
    
    r_article_perc = round(((r_article_count / total_articles) * 100), 2)
    nyt_article_perc = round(((nyt_article_count / total_articles) * 100), 2)
    ts_article_perc = round(((ts_article_count / total_articles) * 100), 2)
    
    response_data = {
        "totalArticles" : total_articles,
        "totalCategories" : total_categories,
        "sources": [
            {
                "name": "Reddit",
                "articleCount": r_article_count,
                "articlePerc" : r_article_perc,
                "categoryCount": r_ctgry_count,
                "categories": [
                    {
                        "name": "r/politics",
                        "count": g_data[0].count,
                        "pos": g_data[0].pos,
                        "posPerc": g_data[0].pos_perc,
                        "neg": g_data[0].neg,
                        "negPerc": g_data[0].neg_perc

                    },
                    {
                        "name": "r/news",
                        "count": g_data[1].count,
                        "pos": g_data[1].pos,
                        "posPerc": g_data[1].pos_perc,
                        "neg": g_data[1].neg,
                        "negPerc": g_data[1].neg_perc
                    }
            ]},
            {
                "name": "New York Times",
                "articleCount": nyt_article_count,
                "articlePerc" : nyt_article_perc,
                "categoryCount": nyt_ctgry_count,
                "categories": [
                    {
                        "name": "Politics",
                        "count": g_data[2].count,
                        "pos": g_data[2].pos,
                        "posPerc": g_data[2].pos_perc,
                        "neg": g_data[2].neg,
                        "negPerc": g_data[2].neg_perc
                    },
                    {
                        "name": "Economy",
                        "count": g_data[3].count,
                        "pos": g_data[3].pos,
                        "posPerc": g_data[3].pos_perc,
                        "neg": g_data[3].neg,
                        "negPerc": g_data[3].neg_perc
                    },
                    {
                        "name": "Technology",
                        "count": g_data[4].count,
                        "pos": g_data[4].pos,
                        "posPerc": g_data[4].pos_perc,
                        "neg": g_data[4].neg,
                        "negPerc": g_data[4].neg_perc
                    },
                    {
                        "name": "Sports",
                        "count": g_data[5].count,
                        "pos": g_data[5].pos,
                        "posPerc": g_data[5].pos_perc,
                        "neg": g_data[5].neg,
                        "negPerc": g_data[5].neg_perc
                    }
            ]},
            {
                "name": "Tagesschau",
                "articleCount": ts_article_count,
                "articlePerc" : ts_article_perc,
                "categoryCount": ts_ctgry_count,
                "categories": [
                    {
                        "name": "Military", 
                        "count": g_data[6].count,
                        "pos": g_data[6].pos,
                        "posPerc": g_data[6].pos_perc,
                        "neg": g_data[6].neg,
                        "negPerc": g_data[6].neg_perc
                    },
                    {
                        "name": "Corona", 
                        "count": g_data[7].count,
                        "pos": g_data[7].pos,
                        "posPerc": g_data[7].pos_perc,
                        "neg": g_data[7].neg,
                        "negPerc": g_data[7].neg_perc
                    },
                    {
                        "name": "Elections", 
                        "count": g_data[8].count,
                        "pos": g_data[8].pos,
                        "posPerc": g_data[8].pos_perc,
                        "neg": g_data[8].neg,
                        "negPerc": g_data[8].neg_perc
                    },
                    {
                        "name": "Football", 
                        "count": g_data[9].count,
                        "pos": g_data[9].pos,
                        "posPerc": g_data[9].pos_perc,
                        "neg": g_data[9].neg,
                        "negPerc": g_data[9].neg_perc
                    }
            ]}
        ]
    }
    return response_data

if __name__ == "__main__":
    app.run(debug=True, port=5001)
