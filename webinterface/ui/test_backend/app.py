from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Route for Reddit data
@app.route("/api/today", methods=["GET"])
def get_data_today():
    data = [
        {"source": "Reddit", "topics":[
            {"name":"Militär", "count":random.randint(1, 5), "positives":random.randint(1, 5), "negatives":random.randint(1, 5)},
            {"name":"Corona", "count":random.randint(1, 5), "positives":random.randint(1, 5), "negatives":random.randint(1, 5)},
            {"name":"Wahlen", "count":random.randint(1, 5), "positives":random.randint(1, 5), "negatives":random.randint(1, 5)},
            {"name":"Sport", "count":random.randint(1, 5), "positives":random.randint(1, 5), "negatives":random.randint(1, 5)}
        ]},
        {"source": "New York Times", "topics":[
            {"name":"Militär", "count":random.randint(1, 5), "positives":random.randint(1, 5), "negatives":random.randint(1, 5)},
            {"name":"Corona", "count":random.randint(1, 5), "positives":random.randint(1, 5), "negatives":random.randint(1, 5)},
            {"name":"Wahlen", "count":random.randint(1, 5), "positives":random.randint(1, 5), "negatives":random.randint(1, 5)},
            {"name":"Sport", "count":random.randint(1, 5), "positives":random.randint(1, 5), "negatives":random.randint(1, 5)}
        ]},
        {"source": "Tagesschau", "topics":[
            {"name":"Militär", "count":random.randint(1, 5), "positives":random.randint(1, 5), "negatives":random.randint(1, 5)},
            {"name":"Corona", "count":random.randint(1, 5), "positives":random.randint(1, 5), "negatives":random.randint(1, 5)},
            {"name":"Wahlen", "count":random.randint(1, 5), "positives":random.randint(1, 5), "negatives":random.randint(1, 5)},
            {"name":"Sport", "count":random.randint(1, 5), "positives":random.randint(1, 5), "negatives":random.randint(1, 5)}
        ]}
    ]
    return data

@app.route("/api/this_week", methods=["GET"])
def get_data_week():
    data = [
        {"source": "Reddit", "topics":[
            {"name":"Militär", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Corona", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Wahlen", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Sport", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)}
        ]},
        {"source": "New York Times", "topics":[
            {"name":"Militär", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Corona", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Wahlen", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Sport", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)}
        ]},
        {"source": "Tagesschau", "topics":[
            {"name":"Militär", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Corona", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Wahlen", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Sport", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)}
        ]}
    ]
    return data

@app.route("/api/this_month", methods=["GET"])
def get_data_month():
    data = [
        {"source": "Reddit", "topics":[
            {"name":"Militär", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Corona", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Wahlen", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Sport", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)}
        ]},
        {"source": "New York Times", "topics":[
            {"name":"Militär", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Corona", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Wahlen", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Sport", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)}
        ]},
        {"source": "Tagesschau", "topics":[
            {"name":"Militär", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Corona", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Wahlen", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)},
            {"name":"Sport", "count":random.randint(1, 50), "positives":random.randint(1, 25), "negatives":random.randint(1, 25)}
        ]}
    ]
    return data

if __name__ == "__main__":
    app.run(debug=True, port=5001)
