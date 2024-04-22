import json

# this is just a simulation, the real data must be obtain by a call to the database api
# returns all the activities available in that slot!
activities = [
    {'id': 'A1', 'name': 'football', 'class': 'sports'},
    {'id': 'A2', 'name': 'chess', 'class': 'boardgame'},
    {'id': 'A3', 'name': 'jenga', 'class': 'boardgame'},
    {'id': 'A4', 'name': 'salsa', 'class': 'dancing'}
    # .... all activities
]

with open('data_activities.json', 'w') as f:
    json.dump(activities, f)



# In our retrieval system the user acts as implicit feedback to the model since:

# *   Choosing the activity is a positive feedback
# *   Not choosing an activity is a negative feedback

# It is not explicit since they don't tell us **how much** they like the activity.

# picked        +1
# not picked    +0
user_feedback = [
    {'user_id':'U1', 'picked': 'football'},
    {'user_id':'U1', 'picked': 'salsa'},
    {'user_id':'U2', 'picked': 'chess'},
    {'user_id':'U3', 'picked': 'jenga'},
    {'user_id':'U3', 'picked': 'salsa'},
    {'user_id':'U3', 'picked': 'salsa'},
    {'user_id':'U3', 'picked': 'salsa'},
    # Todo: check if it's better to add a counter or
    # to append each selection individually
    # Todo: Append feedback when recieving
]

with open('data_feedback.json', 'w') as f:
    json.dump(user_feedback, f)
