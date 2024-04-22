# All imports
import json

import numpy as np
import tensorflow as tf
import tensorflow_recommenders as tfrs

# -----------Handling data---------------
data_activities = {}
with open('data_activities.json', 'r') as f:
    data_activities = json.load(f)

unique_activity_names = set(activity['name'] for activity in data_activities)
# convert to bytes (tensorflow requires)
unique_activity_names = np.array(list(map(str.encode, unique_activity_names)))

data_feedback = []
with open('data_feedback.json', 'r') as f:
    data_feedback = json.load(f)

unique_user_ids = set(u['user_id'] for u in data_feedback)
# convert to bytes (tensorflow requires)
unique_user_ids = np.array(list(map(str.encode, unique_user_ids)))

# cast activity data into TF tensor 
activities_list = [act['name'] for act in data_activities]
activities = tf.data.Dataset.from_tensor_slices(activities_list)

# cast feedback data into TF tensor 
feedback = tf.data.Dataset.from_tensor_slices({
    'user_id': [entry['user_id'] for entry in data_feedback],
    'activity': [entry['picked'] for entry in data_feedback]
})


# ----------Train/test split ---------------

tf.random.set_seed(42)
num_samples = len(data_feedback)
shuffled = feedback.shuffle(buffer_size=num_samples, seed=42, reshuffle_each_iteration=False)

train_percent = 0.8 #0.2 test

train_size = int(train_percent * num_samples)
test_size = num_samples - train_size  # El resto para el conjunto de prueba

train = shuffled.take(train_size)
test = shuffled.skip(train_size)

# ------------ The model ----------------------
embedding_dimension = 32 # Higher values will correspond to models that may be more accurate, but will also be slower to fit and more prone to overfitting.

# Query tower = user
user_model = tf.keras.Sequential([
  tf.keras.layers.StringLookup(
      vocabulary=unique_user_ids, mask_token=None),
  # We add an additional embedding to account for unknown tokens.
  tf.keras.layers.Embedding(len(unique_user_ids) + 1, embedding_dimension)
])

# Candidate tower = activity
activity_model = tf.keras.Sequential([
  tf.keras.layers.StringLookup(
      vocabulary=unique_activity_names, mask_token=None),
  tf.keras.layers.Embedding(len(unique_activity_names) + 1, embedding_dimension)
])

# --------- Metrics -----------
metrics = tfrs.metrics.FactorizedTopK(
  candidates = activities.batch(128).map(activity_model)
)

