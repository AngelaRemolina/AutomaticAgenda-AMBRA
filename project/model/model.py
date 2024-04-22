# All imports
import json

# import numpy as np
import tensorflow as tf
# import tensorflow_recommenders as tfrs

# Handling data
data_activities = {}
with open('data_activities.json', 'r') as f:
    data_activities = json.load(f)

data_feedback = []
with open('data_feedback.json', 'r') as f:
    data_feedback = json.load(f)

# cast activity data into TF tensor 
activities_list = [act['name'] for act in data_activities]
activities = tf.data.Dataset.from_tensor_slices(activities_list)
# todo: delete debug prints when done
# for i in activities:
#     print(i)
# print(type(activities))
# print()


# cast feedback data into TF tensor 
user_ids = [entry['user_id'] for entry in data_feedback]
activities = [entry['picked'] for entry in data_feedback]

feedback = tf.data.Dataset.from_tensor_slices({
    'user_id': user_ids,
    'activity': activities
})

# todo: delete debug prints when done
for i in feedback:
    print(i)
print(type(feedback))

