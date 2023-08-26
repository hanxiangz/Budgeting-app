from flask import Flask,jsonify
import database

app = Flask(__name__)

@app.route("/")
def flask_hello():
    return "Hello World!"


#to retrieve all the spending from the database

@app.route('/list', methods=['GET'])
def get_all_list():
    expenses = database.get_all_list()
    return jsonify(expenses) 

#to add a expenditure to the database

""" @app.route('/list', methods=['POST'])
def get_list():
    spending = database.
 """

if __name__ == "__main__":
    app.run(debug=True)
