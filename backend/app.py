from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from pymongo.errors import DuplicateKeyError
import jwt
from pymongo import MongoClient
from flask_cors import CORS #added this since we had issues with port 3000 & 5000
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager, create_access_token, jwt_required  # JWT handling
import logging
import os
logging.basicConfig(level=logging.INFO)

# Load environment variables from the .env file
load_dotenv()


# Retrieve the MongoDB URI from the environment variables
mongo_uri = os.getenv("MONGO_URI")

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client['RentersDB']  # Use or create the 'rentersDB' database
landlords_collection = db['landlords']  # Assuming 'landlords' is the collection name
properties_collection = db['properties']

# Flask Application Setup
app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app) #initializes Bcrypt for password hashing

# JWT setup
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")  # Set the JWT secret key from environment variables
jwt = JWTManager(app)  # Initialize JWT Manager

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

#Endpoint for user login. Validates user credentials and generates a JWT token if successful.
@app.route('/Login', methods=['POST'])
def login():
    """Endpoint for user login."""
    data = request.json  # Get JSON data from the request
    email = data.get('email')  # Extract email from the request
    password = data.get('password')  # Extract password from the request

    if not email or not password:
        return jsonify({"error": "Email and Password are required"}), 400  # Return error if fields are missing

    # Find the user in the database
    user = db.users.find_one({"email": email})
    
    # Check if user exists and password matches
    if user and bcrypt.check_password_hash(user['password'], password):
        # Create JWT token with user ID as identity
        access_token = create_access_token(identity=user['userId'])
        return jsonify({'access_token': access_token}), 200  # Ensure you're returning a 200 status code on success
    else:
        return jsonify({"error": "Invalid email or password"}), 401  # Return error if credentials are invalid

@app.route('/api/search', methods=['GET'])
def search():
    search_by = request.args.get('searchBy')
    query = request.args.get('query')
    sort_by = request.args.get('sortBy', 'name')  # Default to sorting by 'name'

    logging.info(f"Received search query: search_by={search_by}, query={query}, sort_by={sort_by}")

    if not query:
        logging.error("Query parameter is missing")
        return jsonify({'error': 'Query parameter is required'}), 400

    # Default search criteria
    search_criteria = {}

    # Build search criteria based on searchBy parameter
    if search_by == 'landlord':
        # Search for landlords by name
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
                'from': 'properties',  # Join with the Properties collection
                'localField': 'propertyId',  # Field in Landlord collection
                'foreignField': 'propertyId',  # Field in Properties collection
                'as': 'properties'  # Resulting array field
            }
        },
        {
            '$match': search_criteria  # Apply search criteria after lookup
        },
        {
            '$sort': {sort_by: 1}  # Sort by the specified field (e.g., 'name', 'properties.propertyname')
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

    results = list(landlords_collection.aggregate(pipeline))  # Perform aggregation
    logging.info(f"Found {len(results)} results for search criteria: {search_criteria}")

    return jsonify(results), 200

if __name__ == '__main__':
    app.run(debug=True)
