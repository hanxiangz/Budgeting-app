from pymongo import MongoClient
import datetime
from decouple import config

uri = config('MONGO_URI')
client = MongoClient(uri)

#database to use
db = client['Budgeting_app']

#Collections
all_expenses = db['Expenditure_List']
food = db['Food']
bills = db["Bills"]
transport = db['Transport']
healthcare = db['Healthcare']
house = db['House']
savings = db['Savings']

def get_all_food():
    return list(food.find({}))  

def get_all_bills():
    return list(bills.find({}))

def get_all_transport():
    return list(transport.find({}))  

def get_all_healthcare():
    return list(healthcare.find({}))  

def get_all_house():
    return list(house.find({}))  

def get_all_savings():
    return list(savings.find({}))  

def add_spending(data):
    result = all_expenses.insert_one(data)
    # input expenses into category collection...potential error; same object id for all_expenses and category
    if data['category'] == 'food':
        food.insert_one(data)
    elif data['category'] == 'bills':
        bills.insert_one(data)
    elif data['category'] == 'transport':
        transport.insert_one(data)
    elif data['category'] == 'healthcare':
        healthcare.insert_one(data)
    elif data['category'] == 'house':
        house.insert_one(data)
    elif data['category'] == 'savings':
        savings.insert_one(data)
    else: 
        return {"message": "Failed to add data."}
    
    if result.inserted_id:
        return {"message": "Data added successfully!", "id": str(result.inserted_id)}
    else:
        return {"message": "Failed to add data."}

#Remove a single item by its _id from the MongoDB collections(testing)
def remove_item_by_id(item_id):
    result = all_expenses.delete_one({"_id": item_id})
    return result.deleted_count  # returns the number of documents deleted (0 or 1)
