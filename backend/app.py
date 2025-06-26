# backend/app.py
from flask import Flask, jsonify, session, render_template, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_session import Session
from flask_bcrypt import Bcrypt

load_dotenv()  # Load environment variables from .env file if it exists

app = Flask(__name__)
CORS(app)  # allow requests from frontend
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
mongo = PyMongo(app)

bcrypt = Bcrypt(app)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
Session(app)

@app.route('/')
def home():
    """Landing page with active tickets"""
    if 'full_name' in session:
        return render_template('home.html')
    return render_template('index.html')

@app.route('/signup')
def signup_page():
    return render_template('signup.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json(silent=True) or request.form.to_dict()

    full_name = data.get('full_name')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')
    phone = data.get('phone')

    if not (full_name and username and email and password and confirm_password and phone):
        return jsonify({'error': 'Missing fields'}), 400

    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match'}), 400

    if mongo.db.users.find_one({'$or': [{'username': username}, {'email': email}]}):
        return jsonify({'error': 'Username or email already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    user = {
        'full_name': full_name,
        'username': username,
        'email': email,
        'password': hashed_password,
        'phone': phone
    }
    mongo.db.users.insert_one(user)

    return render_template('index.html'),201

if __name__ == '__main__':
    app.run(debug=True)
