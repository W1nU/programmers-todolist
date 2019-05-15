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
    data = request.args.to_dict()
    return json.dumps(manager.login(data))

app.run('0.0.0.0')
