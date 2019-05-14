from flask import Flask, request
from database.manager import manager

app = Flask(__name__)

@app.route("/signin", method = ["POST", "GET"])
def signin():
    data = request.args.to_dict()
    return manager.signin(data)

@app.route("/login", method = ["POST", "GET"])
def login():
    data = request.args.to_dict()
    return manager.login(data)

app.run('0.0.0.0')