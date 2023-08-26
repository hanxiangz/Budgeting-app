from flask import Flask,jsonify,request
from database import add_spending
import database
from database import remove_item_by_id
from flask_cors import CORS
from bson.objectid import ObjectId


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "methods": ["GET", "POST", "DELETE"]}})


""" @app.route("/")
def flask_hello():
    return "Wise Wallet"  """

""" @app.route("/")
def members():
    return jsonify({"members": ["members1", "members2", "members3"]}) """


#to retrieve all the spending from the database

@app.route('/list', methods=['GET'])
def get_all_list_route():
    expenses = database.get_all_list()
    for expense in expenses:
        expense['_id'] = str(expense['_id'])
    return jsonify(expenses)

#to add a expenditure to the database

@app.route('/list', methods=['POST'])
def add_spending_route():
    """
    Flask route to handle adding a new spending.
    Expects the spending data to be sent as JSON in the request body.
    """
    data = request.json
    result = add_spending(data)
    if "id" in result:
        return jsonify(result), 201
    else:
        return jsonify({"message": "Failed to add data."}), 500

 #to remove expenditure from the database

@app.route('/list/<item_id>', methods=['DELETE'])
def delete_spending_route(item_id):
    try:
        deleted_count = remove_item_by_id(ObjectId(item_id))
        if deleted_count:
            return jsonify({"message": "Data deleted successfully!"}), 200
        else:
            return jsonify({"message": "Failed to delete data."}), 404
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

 #to call and display the different categories in a dropdown menu

@app.route('/categories', methods=['GET'])
def get_categories():
    categories = ["Eat_Out", "Utilities", "Groceries", "Departmental", "Miscellaneous"]
    return jsonify(categories)

 

if __name__ == "__main__":
    app.run(debug=True)
