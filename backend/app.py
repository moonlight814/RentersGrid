from flask import Flask, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Retrieve the MongoDB URI from the environment variables
mongo_uri = os.getenv("MONGO_URI")

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client['rentersDB']  # Use or create the 'rentersDB' database

# Flask Application Setup
app = Flask(__name__)
@app.route('/')
def home():
    return "Hello, Flask and MongoDB!"


if __name__=="__main__":
    app.run(debug=True)