# backend/app.py
from flask import Flask, jsonify, session, render_template, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from pymongo import errors
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_session import Session
from flask_bcrypt import Bcrypt


load_dotenv()

app = Flask(__name__)

app.config['MONGO_URI'] = os.getenv('MONGO_URI')
mongo = PyMongo(app)

bcrypt = Bcrypt(app)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
Session(app)

# Allow requests from your frontend
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

@app.route('/')
def index():
    return 'API is running.'

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json(silent=True) or request.form.to_dict()

    full_name = data.get('full_name')
    email = data.get('email')
    phone = data.get('phone')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    if not (full_name and email and password and confirm_password and phone):
        return jsonify({'error': 'Missing fields'}), 400

    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match'}), 400

    if mongo.db.users.find_one({'$or': [{'full_name': full_name}, {'email': email}]}):
        return jsonify({'error': 'Name or email already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    user = {
        'full_name': full_name,
        'email': email,
        'phone': phone,
        'password': hashed_password
    }
    mongo.db.users.insert_one(user)

    session['full_name'] = full_name
    return jsonify({'message': 'Registration successful', 'name': full_name}), 201

@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json(silent=True) or request.form.to_dict()

    email = data.get('email')
    password = data.get('password')

    if not (email and password):
        return jsonify({'error': 'Missing email or password'}), 400

    user = mongo.db.users.find_one({'email': email})

    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid email or password'}), 401

    session['full_name'] = user.get('full_name')
    return jsonify({'message': 'Login successful', 'name': user.get('full_name')}), 200

try:
    mongo.db.users.find_one()
    print("MongoDB Connected Successfully!")
except Exception as e:
    print(f"MongoDB connection failed: {e}")

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
