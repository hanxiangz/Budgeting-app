from pymongo import MongoClient
import datetime
from decouple import config

uri = config('MONGO_URI')
client = MongoClient(uri)

#database to use
db = client['Budgeting_app']

#Collections
all_expenses = db['Expenditure_List']
food = db['food']
bills = db["bills"]
transport = db['transport']
healthcare = db['healthcare']
house = db['house']
savings = db['savings']

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

#Remove a single item by its _id from the MongoDB collections
def remove_item_by_id(category, item_id):
    # Remove the item from the 'all_expenses' collection
    result_all = all_expenses.delete_one({"_id": item_id})
    
    # Remove the item from the category-specific collection
    result_category = db[category].delete_one({"_id": item_id})
    
    # Check if either operation succeeded and return a count of deleted documents
    if result_all.deleted_count > 0 or result_category.deleted_count > 0:
        return result_all.deleted_count + result_category.deleted_count
    else:
        return 0  # If neither operation succeeded
    