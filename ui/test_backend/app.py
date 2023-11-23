from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Route for Reddit data
@app.route("/api/today", methods=["GET"])
def get_data_today():
    data = {
        "totalArticles" : 171,
        "totalCategories" : 10,
        "sources": [
            {
                "name": "Reddit",
                "articleCount": 76,
                "articlePerc" : 44.44,
                "categoryCount": 2,
                "categories": [
                    {
                        "name": "r/politics",
                        "count": 31,
                        "pos": 2,
                        "posPerc": 6.45,
                        "neg": 29,
                        "negPerc": 93.55

                    },
                    {
                        "name": "r/news",
                        "count": 45,
                        "pos": 17,
                        "posPerc": 37.78,
                        "neg": 28,
                        "negPerc": 62.22
                    }
            ]},
            {
                "source": "New York Times",
                "articleCount": 72,
                "articlePerc" : 42.11,
                "categoryCount": 4,
                "categories": [
                    {
                        "name": "Politics",
                        "count": 34,
                        "pos": 12,
                        "posPerc": 35.29,
                        "neg": 22,
                        "negPerc": 64.71
                    },
                    {
                        "name": "Economy",
                        "count": 18,
                        "pos": 5,
                        "posPerc": 27.78,
                        "neg": 13,
                        "negPerc": 72.22
                    },
                    {
                        "name": "Technology",
                        "count": 12,
                        "pos": 7,
                        "posPerc": 58.33,
                        "neg": 5,
                        "negPerc": 41.67
                    },
                    {
                        "name": "Sports",
                        "count": 8,
                        "pos": 4,
                        "posPerc": 50,
                        "neg": 4,
                        "negPerc": 50
                    }
            ]},
            {
                "source": "Tagesschau",
                "articleCount": 23,
                "articlePerc" : 13.45,
                "categoryCount": 4,
                "categories": [
                    {
                        "name": "Militär (en. Military)", 
                        "count": 3,
                        "pos": 2,
                        "posPerc": 66.67,
                        "neg": 1,
                        "negPerc": 33.33
                    },
                    {
                        "name": "Corona", 
                        "count": 13,
                        "pos": 0,
                        "posPerc": 0,
                        "neg": 13,
                        "negPerc": 100
                    },
                    {
                        "name": "Wahlen (en. Elections)", 
                        "count": 5,
                        "pos": 3,
                        "posPerc": 60,
                        "neg": 2,
                        "negPerc": 40
                    },
                    {
                        "name": "Fußball (en. Soccer/Football)", 
                        "count":  2,
                        "pos":  1,
                        "posPerc": 50,
                        "neg": 1,
                        "negPerc": 50
                    }
            ]}
        ]
    }
    return data

@app.route("/api/this_week", methods=["GET"])
def get_data_week():
    
    
    
    data = {
        "totalArticles" : 171,
        "totalCategories" : 10,
        "sources": [
            {
                "name": "Reddit",
                "articleCount": 76,
                "articlePerc" : 44.44,
                "categoryCount": 2,
                "categories": [
                    {
                        "name": "r/politics",
                        "count": 31,
                        "pos": 2,
                        "posPerc": 6.45,
                        "neg": 29,
                        "negPerc": 93.55

                    },
                    {
                        "name": "r/news",
                        "count": 45,
                        "pos": 17,
                        "posPerc": 37.78,
                        "neg": 28,
                        "negPerc": 62.22
                    }
            ]},
            {
                "source": "New York Times",
                "articleCount": 72,
                "articlePerc" : 42.11,
                "categoryCount": 4,
                "categories": [
                    {
                        "name": "Politics",
                        "count": 34,
                        "pos": 12,
                        "posPerc": 35.29,
                        "neg": 22,
                        "negPerc": 64.71
                    },
                    {
                        "name": "Economy",
                        "count": 18,
                        "pos": 5,
                        "posPerc": 27.78,
                        "neg": 13,
                        "negPerc": 72.22
                    },
                    {
                        "name": "Technology",
                        "count": 12,
                        "pos": 7,
                        "posPerc": 58.33,
                        "neg": 5,
                        "negPerc": 41.67
                    },
                    {
                        "name": "Sports",
                        "count": 8,
                        "pos": 4,
                        "posPerc": 50,
                        "neg": 4,
                        "negPerc": 50
                    }
            ]},
            {
                "source": "Tagesschau",
                "articleCount": 23,
                "articlePerc" : 13.45,
                "categoryCount": 4,
                "categories": [
                    {
                        "name": "Militär (en. Military)", 
                        "count": 3,
                        "pos": 2,
                        "posPerc": 66.67,
                        "neg": 1,
                        "negPerc": 33.33
                    },
                    {
                        "name": "Corona", 
                        "count": 13,
                        "pos": 0,
                        "posPerc": 0,
                        "neg": 13,
                        "negPerc": 100
                    },
                    {
                        "name": "Wahlen (en. Elections)", 
                        "count": 5,
                        "pos": 3,
                        "posPerc": 60,
                        "neg": 2,
                        "negPerc": 40
                    },
                    {
                        "name": "Fußball (en. Soccer/Football)", 
                        "count":  2,
                        "pos":  1,
                        "posPerc": 50,
                        "neg": 1,
                        "negPerc": 50
                    }
            ]}
        ]
    }
    return data

@app.route("/api/this_month", methods=["GET"])
def get_data_month():
    data = {
        "totalArticles" : 171,
        "totalCategories" : 10,
        "sources": [
            {
                "name": "Reddit",
                "articleCount": 76,
                "articlePerc" : 44.44,
                "categoryCount": 2,
                "categories": [
                    {
                        "name": "r/politics",
                        "count": 31,
                        "pos": 2,
                        "posPerc": 6.45,
                        "neg": 29,
                        "negPerc": 93.55

                    },
                    {
                        "name": "r/news",
                        "count": 45,
                        "pos": 17,
                        "posPerc": 37.78,
                        "neg": 28,
                        "negPerc": 62.22
                    }
            ]},
            {
                "source": "New York Times",
                "articleCount": 72,
                "articlePerc" : 42.11,
                "categoryCount": 4,
                "categories": [
                    {
                        "name": "Politics",
                        "count": 34,
                        "pos": 12,
                        "posPerc": 35.29,
                        "neg": 22,
                        "negPerc": 64.71
                    },
                    {
                        "name": "Economy",
                        "count": 18,
                        "pos": 5,
                        "posPerc": 27.78,
                        "neg": 13,
                        "negPerc": 72.22
                    },
                    {
                        "name": "Technology",
                        "count": 12,
                        "pos": 7,
                        "posPerc": 58.33,
                        "neg": 5,
                        "negPerc": 41.67
                    },
                    {
                        "name": "Sports",
                        "count": 8,
                        "pos": 4,
                        "posPerc": 50,
                        "neg": 4,
                        "negPerc": 50
                    }
            ]},
            {
                "source": "Tagesschau",
                "articleCount": 23,
                "articlePerc" : 13.45,
                "categoryCount": 4,
                "categories": [
                    {
                        "name": "Militär (en. Military)", 
                        "count": 3,
                        "pos": 2,
                        "posPerc": 66.67,
                        "neg": 1,
                        "negPerc": 33.33
                    },
                    {
                        "name": "Corona", 
                        "count": 13,
                        "pos": 0,
                        "posPerc": 0,
                        "neg": 13,
                        "negPerc": 100
                    },
                    {
                        "name": "Wahlen (en. Elections)", 
                        "count": 5,
                        "pos": 3,
                        "posPerc": 60,
                        "neg": 2,
                        "negPerc": 40
                    },
                    {
                        "name": "Fußball (en. Soccer/Football)", 
                        "count":  2,
                        "pos":  1,
                        "posPerc": 50,
                        "neg": 1,
                        "negPerc": 50
                    }
            ]}
        ]
    }
    return data

if __name__ == "__main__":
    app.run(debug=True, port=5001)
