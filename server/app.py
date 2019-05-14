from flask import Flask
from database import user

app = Flask(__name__)

@app.route("/add_user")
