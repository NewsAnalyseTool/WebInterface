from flask import Flask, jsonify
from pymongo import MongoClient
<<<<<<< HEAD:ui/test_backend/app.py
from flask_cors import CORS  # Import CORS from flask_cors module
from config import USER_NAME, PW
=======
from flask_cors import CORS
import random
>>>>>>> main:webinterface/ui/test_backend/app.py

app = Flask(__name__)
CORS(app)

<<<<<<< HEAD:ui/test_backend/app.py
client = MongoClient(f"mongodb://{USER_NAME}:{PW}@mongodb1.f4.htw-berlin.de:27017/ps_test?authMechanism=DEFAULT")
db = client["ps_test"]
collection = db["data"]

=======
>>>>>>> main:webinterface/ui/test_backend/app.py
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

<<<<<<< HEAD:ui/test_backend/app.py

@app.route("/api/reddit", methods=["GET"])
def get_reddit_data():
    reddit_data = list(collection.find({"id": "reddit"}))
    for data_point in reddit_data:
        data_point["_id"] = str(data_point["_id"])
    return jsonify(reddit_data)

# Route for New York Times (NYT) data
@app.route("/api/nyt", methods=["GET"])
def get_nyt_data():
    nyt_data = list(collection.find({"id": "newyorktimes"}))
    for data_point in nyt_data:
        data_point["_id"] = str(data_point["_id"])
    return jsonify(nyt_data)

@app.route("/api/ts", methods=["GET"])
def get_ts_data():
    ts_data = list(collection.find({"id": "tagesschau"}))
    for data_point in ts_data:
        data_point["_id"] = str(data_point["_id"])
    return jsonify(ts_data)

=======
>>>>>>> main:webinterface/ui/test_backend/app.py
if __name__ == "__main__":
    app.run(debug=True, port=5001)
