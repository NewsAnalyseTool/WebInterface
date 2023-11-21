from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS  # Import CORS from flask_cors module
from config import USER_NAME, PW

app = Flask(__name__)
CORS(app)

client = MongoClient(f"mongodb://{USER_NAME}:{PW}@mongodb1.f4.htw-berlin.de:27017/ps_test?authMechanism=DEFAULT")
db = client["ps_test"]
collection = db["data"]

# Route for Reddit data
@app.route("/api/today", methods=["GET"])
def get_data_today():
    data = [
        {"source": "Reddit", "topics":[
            {"name":"Militär", "count":12, "positives":2, "negatives":10},
            {"name":"Corona", "count":104, "positives":10, "negatives":94},
            {"name":"Wahlen", "count":23, "positives":10, "negatives":23},
            {"name":"Sport", "count":98, "positives":78, "negatives":20}
        ]},
        {"source": "New York Times", "topics":[
            {"name":"Militär", "count":5, "positives":3, "negatives":2},
            {"name":"Corona", "count":143, "positives":40, "negatives":94},
            {"name":"Wahlen", "count":223, "positives":72, "negatives":151},
            {"name":"Sport", "count":42, "positives":30, "negatives":12}
        ]},
        {"source": "Tagesschau", "topics":[
            {"name":"Militär", "count":20, "positives":10, "negatives":10},
            {"name":"Corona", "count":42, "positives":19, "negatives":23},
            {"name":"Wahlen", "count":25, "positives":17, "negatives":8},
            {"name":"Sport", "count":3, "positives":3, "negatives":0}
        ]}
    ]
    return data

@app.route("/api/this_week", methods=["GET"])
def get_data_week():
    data = [
        {"source": "Reddit", "topics":[
            {"name":"Militär", "count":123, "positives":22, "negatives":101},
            {"name":"Corona", "count":1043, "positives":103, "negatives":947},
            {"name":"Wahlen", "count":237, "positives":102, "negatives":231},
            {"name":"Sport", "count":980, "positives":788, "negatives":290}
        ]},
        {"source": "New York Times", "topics":[
            {"name":"Militär", "count":59, "positives":83, "negatives":22},
            {"name":"Corona", "count":1433, "positives":460, "negatives":984},
            {"name":"Wahlen", "count":2223, "positives":762, "negatives":1571},
            {"name":"Sport", "count":422, "positives":430, "negatives":612}
        ]},
        {"source": "Tagesschau", "topics":[
            {"name":"Militär", "count":2320, "positives":3410, "negatives":1640},
            {"name":"Corona", "count":4822, "positives":9219, "negatives":2113},
            {"name":"Wahlen", "count":2635, "positives":1267, "negatives":368},
            {"name":"Sport", "count":363, "positives":334, "negatives":340}
        ]}
    ]
    return data

@app.route("/api/this_month", methods=["GET"])
def get_data_month():
    data = [
        {"source": "Reddit", "topics":[
            {"name":"Militär", "count":12, "positives":2, "negatives":10},
            {"name":"Corona", "count":104, "positives":10, "negatives":94},
            {"name":"Wahlen", "count":23, "positives":10, "negatives":23},
            {"name":"Sport", "count":98, "positives":78, "negatives":20}
        ]},
        {"source": "New York Times", "topics":[
            {"name":"Militär", "count":5, "positives":3, "negatives":2},
            {"name":"Corona", "count":143, "positives":40, "negatives":94},
            {"name":"Wahlen", "count":223, "positives":72, "negatives":151},
            {"name":"Sport", "count":42, "positives":30, "negatives":12}
        ]},
        {"source": "Tagesschau", "topics":[
            {"name":"Militär", "count":20, "positives":10, "negatives":10},
            {"name":"Corona", "count":42, "positives":19, "negatives":23},
            {"name":"Wahlen", "count":25, "positives":17, "negatives":8},
            {"name":"Sport", "count":3, "positives":3, "negatives":0}
        ]}
    ]
    return data


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

if __name__ == "__main__":
    app.run(debug=True, port=5001)
