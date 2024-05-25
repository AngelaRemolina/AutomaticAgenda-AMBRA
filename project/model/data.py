import json

# this is just a simulation, the real data must be obtain by a call to the database api
# returns all the activities available in that slot!
activities = [
    {'act_id': 'A1', 'act_name': 'football', 'act_class': 'sports'},
    {'act_id': 'A2', 'act_name': 'chess', 'act_class': 'boardgame'},
    {'act_id': 'A3', 'act_name': 'jenga', 'act_class': 'boardgame'},
    {'act_id': 'A4', 'act_name': 'salsa', 'act_class': 'dancing'},
    {'act_id': 'A5', 'act_name': 'bachata', 'act_class': 'dancing'},
    {'act_id': 'A6', 'act_name': 'yoga', 'act_class': 'sports'},
    {'act_id': 'A7', 'act_name': 'drawing', 'act_class': 'leisure'},
    {'act_id': 'A8', 'act_name': 'singing', 'act_class': 'leisure'},
    {'act_id': 'A9', 'act_name': 'jump rope', 'act_class': 'sports'},
    {'act_id': 'A10', 'act_name': 'karate', 'act_class': 'sports'},
    {'act_id': 'A11', 'act_name': 'play uno', 'act_class': 'boardgame'},
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
    {'user_id':'U1', 'act_id': 'A1'},
    {'user_id':'U1', 'act_id': 'A8'},
    {'user_id':'U2', 'act_id': 'A11'},
    {'user_id':'U3', 'act_id': 'A1'},
    {'user_id':'U3', 'act_id': 'A4'},
    {'user_id':'U3', 'act_id': 'A2'},
    {'user_id':'U3', 'act_id': 'A5'},
    {'user_id':'U3', 'act_id': 'A5'},
]

with open('data_feedback.json', 'w') as f:
    json.dump(user_feedback, f)
