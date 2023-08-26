from pymongo import MongoClient

uri = "mongodb+srv://hello:there@cluster0.79ymkqj.mongodb.net/"  # Replace with the MongoDB cluster URI

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




