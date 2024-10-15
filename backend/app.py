from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from pymongo.errors import DuplicateKeyError
import jwt
from pymongo import MongoClient
from flask_cors import CORS #added this since we had issues with port 3000 & 5000
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Retrieve the MongoDB URI from the environment variables
mongo_uri = os.getenv("MONGO_URI")

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client['RentersDB']  # Use or create the 'rentersDB' database

# Flask Application Setup
app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app) #initializes Bcrypt for password hashing

def get_next_user_id():
    #check the total number of users in the collection
    total_users = db.users.count_documents({})

    if total_users > 0:
        #get the last user by sorting by userid in descending order
        last_user = db.users.find().sort("userId",-1).limit(1)
        return last_user[0]["userId"]+1

    else:
        return 1


@app.route('/SignUp',
 methods = ['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error: Email and Password are required"}),400

    #hashing the password that a user inputs:
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    try:
        #get the next userId
        user_id = get_next_user_id()

        #Insert the new user into the 'users' collection
        db.users.insert_one({
            'email': email,
            'password': hashed_password,
            'userId': user_id #Add userId field


        })
        return jsonify({"message": "User created successfully!"}),201
    except DuplicateKeyError:
        return jsonify({"error": "Email already exists"}), 400


@app.route('/')
def home():
    return "Hello, Flask and MongoDB!"


if __name__=="__main__":
    app.run(debug=True)