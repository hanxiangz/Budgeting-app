from flask import Flask,jsonify
import database

app = Flask(__name__)

@app.route("/")
def flask_hello():
    return "Hello World!"

@app.route("/add")
def addTransaction():
    return {"users": ["user", "user", "user3"]} ## just testing

#to retrieve all the spending from the database

@app.route('/list', methods=['GET'])
def get_all_list():
    expenses = database.get_all_list()
    for expense in expenses:
        expense['_id'] = str(expense['_id'])
    return jsonify(expenses)

#to add a expenditure to the database

""" @app.route('/list', methods=['POST'])
def add_spending():
    spending = database.
 """

 #to remove expenditure from the database


 
 #to call and display the different categories



 #

if __name__ == "__main__":
    app.run(debug=True)
