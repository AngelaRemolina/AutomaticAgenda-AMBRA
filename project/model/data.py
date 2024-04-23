import json

# this is just a simulation, the real data must be obtain by a call to the database api
# returns all the activities available in that slot!
activities = [
    {'id': 'A1', 'act_name': 'football', 'class': 'sports'},
    {'id': 'A2', 'act_name': 'chess', 'class': 'boardgame'},
    {'id': 'A3', 'act_name': 'jenga', 'class': 'boardgame'},
    {'id': 'A4', 'act_name': 'salsa', 'class': 'dancing'},
    {'id': 'A5', 'act_name': 'bachata', 'class': 'dancing'},
    {'id': 'A6', 'act_name': 'yoga', 'class': 'sports'},
    {'id': 'A7', 'act_name': 'drawing', 'class': 'leisure'},
    {'id': 'A8', 'act_name': 'singing', 'class': 'leisure'},
    {'id': 'A9', 'act_name': 'jump rope', 'class': 'sports'},
    {'id': 'A10', 'act_name': 'karate', 'class': 'sports'},
    {'id': 'A11', 'act_name': 'play uno', 'class': 'boardgame'},
    # .... all activities note: dataset must have at least 10
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
    {'user_id':'U1', 'act_name': 'football'},
    {'user_id':'U1', 'act_name': 'salsa'},
    {'user_id':'U2', 'act_name': 'chess'},
    {'user_id':'U3', 'act_name': 'jenga'},
    {'user_id':'U3', 'act_name': 'salsa'},
    {'user_id':'U3', 'act_name': 'salsa'},
    {'user_id':'U3', 'act_name': 'salsa'},
    # Todo: check if it's better to add a counter or
    # to append each selection individually
    # Todo: Append feedback when recieving
]

with open('data_feedback.json', 'w') as f:
    json.dump(user_feedback, f)
