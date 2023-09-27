from flask import Flask,jsonify,request
from database import add_spending, remove_item_by_id
import database
from flask_cors import CORS
from bson.objectid import ObjectId


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "methods": ["GET", "POST", "DELETE"]}})


@app.route("/")
def flask_hello():
    return "Wise Wallet"


#to retrieve all the spending from a particular category 
@app.route('/transactions/<category>', methods=['GET'])
def get_all_in_category(category): 
    # return a list of the category's expenses
    if category == 'food':
        category_expenses = database.get_all_food()
    elif category == 'bills':
        category_expenses = database.get_all_bills()
    elif category == 'transport':
        category_expenses = database.get_all_transport()
    elif category == 'healthcare':
        category_expenses = database.get_all_healthcare()
    elif category == 'house':
        category_expenses = database.get_all_house()
    elif category == 'savings':
        category_expenses = database.get_all_savings()
    else:
        return jsonify([])
        
    for expense in category_expenses:
        expense['_id'] = str(expense['_id'])
    return jsonify(category_expenses)


#to add a expenditure to the database
@app.route('/add_transaction', methods=['POST'], strict_slashes=False)
def add_spending_route():
    """
    Flask route to handle adding a new spending.
    Expects the spending data to be sent as JSON in the request body.
    """
    data = request.get_json()
    result = add_spending(data)
    if "id" in result:
        return jsonify(result), 201
    else:
        return jsonify({"message": "Failed to add data."}), 500


 #to remove expenditure from the database
@app.route('/transactions/<category>/<item_id>', methods=['DELETE'])
def delete_spending_route(category, item_id):
    try:
        deleted_count = remove_item_by_id(category, ObjectId(item_id))
        if deleted_count:
            return jsonify({"message": "Data deleted successfully!"}), 200
        else:
            return jsonify({"message": "Failed to delete data."}), 404
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500


#to update a spending 
@app.route('/transactions/<category>/<item_id>', methods=['PUT'])
def ammend_spending_route(category, item_id):
    
    try:
        # Get the updated data from the request body as JSON
        editedItem = request.json
        # Remove the _id field from the editedItem to avoid modifying it
        if '_id' in editedItem:
            del editedItem['_id']
        # Update the item in the MongoDB collection
        result_all = database.all_expenses.update_one({'_id': ObjectId(item_id)}, {'$set': editedItem}, upsert=True)
        result_category = database.db[category].update_one({'_id': ObjectId(item_id)}, {'$set': editedItem})

        if result_all.modified_count == 1 or result_category.modified_count == 1:
            return jsonify({"message": "Transaction updated successfully"})
        else:
            return jsonify({"message": "Transaction not found or not updated"}), 404

    except Exception as e:
        # Log the error for debugging
        print(f"Error in ammend_spending_route: {str(e)}")
        return jsonify({"error": str(e)}), 500
    

if __name__ == "__main__":
    app.run(debug=True)
