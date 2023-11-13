from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS  # Import CORS from flask_cors module

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://ps_test_test:htMGbDqpV@mongodb1.f4.htw-berlin.de:27017/ps_test?authMechanism=DEFAULT")
db = client["ps_test"]
collection = db["data"]

# Route for Reddit data
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
