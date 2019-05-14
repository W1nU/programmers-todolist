from flask import Flask, request
from database.manager import manager
from flask_cors import CORS
import hashlib

app = Flask(__name__)
CORS(app)
db_manager = manager()

@app.route("/signin", methods = ["POST", "GET"])
def signin():
    data = request.json
    data['user_password'] = hashlib.md5(data['user_password'].encode()).hexdigest() 
    print(data) 
    return db_manager.signin(data)

@app.route("/login", methods = ["POST", "GET"])
def login():
    data = request.args.to_dict()
    return manager.login(data)

app.run('0.0.0.0')
