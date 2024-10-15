from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS #added this since we had issues with port 3000 & 5000
from dotenv import load_dotenv
import os
from flask_cors import CORS

import logging

logging.basicConfig(level=logging.INFO)
# Load environment variables from the .env file
load_dotenv()

# Retrieve the MongoDB URI from the environment variables
mongo_uri = os.getenv("MONGO_URI")

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client['RentersDB']  # Use or create the 'rentersDB' database
landlords_collection = db['Landlords']
properties_collection = db['Properties']


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

    #check if the email already exists:
    existing_user = db.users.find_one({"email":email})
    if existing_user:
        return jsonify({"error":"Email already exists"}),400


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

CORS(app)  # This will allow cross-origin requests from any origin

@app.route('/api/test', methods=['GET'])
def test():
    try:
        # Fetch one document from the Landlords collection
        result = landlords_collection.find_one({}, {'_id': 0})  # Exclude _id if you don’t need it
        if result:
            return jsonify(result), 200
        else:
            return jsonify({'error': 'No documents found in Landlords collection'}), 404
    except Exception as e:
        logging.error(f"Error connecting to MongoDB: {e}")
        return jsonify({'error': str(e)}), 500
    

@app.route('/api/search', methods=['GET'])
def search():
    search_by = request.args.get('searchBy')
    query = request.args.get('query')
    sort_by = request.args.get('sortBy', 'name')  # Default to sorting by 'name'

    logging.info(f"Received search query: search_by={search_by}, query={query}, sort_by={sort_by}")

    if not query:
        logging.error("Query parameter is missing")
        return jsonify({'error': 'Query parameter is required'}), 400

    search_criteria = {}
    
    # Searching the 'name' field for landlords
    if search_by == 'landlord':
        search_criteria = {'name': {'$regex': query, '$options': 'i'}}
    elif search_by == 'property':
        search_criteria = {'properties.propertyname': {'$regex': query, '$options': 'i'}}
    elif search_by == 'address':
        search_criteria = {'properties.address': {'$regex': query, '$options': 'i'}}
    elif search_by == 'city':
        search_criteria = {'properties.city': {'$regex': query, '$options': 'i'}}
    elif search_by == 'zipcode':
        search_criteria = {'properties.zipcode': query}
    
    # MongoDB aggregation pipeline
    pipeline = [
        {
            '$lookup': {
                'from': 'Properties',
                'localField': 'propertyId',
                'foreignField': 'propertyId',
                'as': 'properties'
            }
        },
        {
            '$match': search_criteria  # Apply search criteria
        },
        {
            '$sort': {sort_by: 1}  # Sort by the field (e.g., 'name', 'properties.propertyname')
        },
        {
            '$project': {  # Select the fields to return
                '_id': 0,
                'name': 1,
                'type': 1,
                'ratingId': 1,
                'properties.propertyname': 1,
                'properties.address': 1,
                'properties.city': 1,
                'properties.zipcode': 1
            }
        }
    ]

    results = list(landlords_collection.aggregate(pipeline))
    logging.info(f"Found {len(results)} results for search criteria: {search_criteria}")
    
    return jsonify(results), 200

if __name__ == '__main__':
    app.run(debug=True)
