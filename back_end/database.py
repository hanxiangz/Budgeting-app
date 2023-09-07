from pymongo import MongoClient
import datetime

uri = "mongodb+srv://user123:WcCydZeAK2Xy99mC@budgeting-app.nlj2cmb.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)

#database to use
db = client['Budgeting_app']

#Collections
expenses = db['Expenditure_List']
utilities = db["Utilities"]
groceries = db['Groceries']
eat = db['Eat_Out']
Departmental = db['Departmental']
Misc = db['Miscellaneous']

def get_all_list():
    return list(expenses.find({}))  

def get_all_utils():
    return list(utilities.find({}))

def get_all_groceries():
    return list(groceries.find({}))  

def get_all_eat_out():
    return list(eat.find({}))  

def get_all_departmental():
    return list(Departmental.find({}))  

def get_all_misc():
    return list(Misc.find({}))  

def add_spending(data):
    result = expenses.insert_one(data)
    if result.inserted_id:
        return {"message": "Data added successfully!", "id": str(result.inserted_id)}
    else:
        return {"message": "Failed to add data."}

#Remove a single item by its _id from the MongoDB collections(testing)
def remove_item_by_id(item_id):
    result = expenses.delete_one({"_id": item_id})
    return result.deleted_count  # returns the number of documents deleted (0 or 1)
