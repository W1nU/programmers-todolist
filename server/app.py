from flask import Flask, request
from database.manager import manager
from flask_cors import CORS
import hashlib
import json

app = Flask(__name__)
CORS(app)
db_manager = manager()

@app.route("/signin", methods = ["POST", "GET"])
def signin():
    print(db_manager)
    data = request.json
    data['user_password'] = hashlib.md5(data['user_password'].encode()).hexdigest() 
    print(data) 
    return json.dumps(db_manager.signin(data), ensure_ascii=False)

@app.route("/login", methods = ["POST", "GET"])
def login():
    data = request.json
    data['user_password'] = hashlib.md5(data['user_password'].encode()).hexdigest()
    return json.dumps(db_manager.login(data) ,ensure_ascii=False)

@app.route("/check_session", methods = ["POST","GET"])
def check_session():
    data = request.json
    print(db_manager.session_check(data['sessionKey'], data['user_email']))
    return json.dumps(db_manager.session_check(data['sessionKey'], data['user_email']),ensure_ascii=False)

@app.route("/update_todo", methods = ["POST","GET"])
def add_todo():
    data = request.json
    return json.dumps(db_manager.update_todo(data))

@app.route("/get_todo", methods = ["POST", "GET"])
def get_todo():
    data = request.json
    return

app.run('0.0.0.0')
