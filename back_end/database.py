from pymongo import MongoClient
import datetime

uri = "mongodb+srv://hello:there@cluster0.79ymkqj.mongodb.net/?retryWrites=true&w=majority"  # Replace with the MongoDB cluster URI

client = MongoClient(uri)

#database to use
db = client['Budgeting_App']

#Collections
expenses = db['Expenditure_List']
utilities = db["Utilities"]
groceries = db['Groceries']
eat = db['Eat_Out']
Departmental = db['Departmental']
Misc = db['Miscellaneous']

def get_all_list():
    db = client['Budgeting_App']  
    expenses = db['Expenditure_List']
    return list(expenses.find({}))  

def get_all_utils():
    db = client['Budgeting_App']  # Replace with the database name
    utilities = db["Utilities"] # Replace with the collection name
    return list(utilities.find({}))

def get_all_groceries():
    db = client['Budgeting_App']  
    groceries = db['Groceries']
    return list(groceries.find({}))  

def get_all_eat_out():
    db = client['Budgeting_App']  
    eat = db['Eat_Out']
    return list(eat.find({}))  

def get_all_departmental():
    db = client['Budgeting_App']  
    Departmental = db['Departmental']
    return list(Departmental.find({}))  

def get_all_misc():
    db = client['Budgeting_App']  
    Misc = db['Miscellaneous']
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
