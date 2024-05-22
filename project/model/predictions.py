# All imports
import json
import tensorflow as tf
import tensorflow_recommenders as tfrs

#--------------- Loading the models -----------

user_model = tf.keras.models.load_model('user_model')
activity_model = tf.keras.models.load_model('activity_model')


# --------------- Loading necessary data ---------------

BATCH_SIZE = 128 
data_activities = {}
with open("data_activities.json", "r") as f:
    data_activities = json.load(f)
activities_list = [act["act_id"] for act in data_activities]
activities = tf.data.Dataset.from_tensor_slices(activities_list)


#--------------- Making predictions -----------

# Create a model that takes in raw query features, and
index = tfrs.layers.factorized_top_k.BruteForce(user_model)
# recommends activities out of the entire activity dataset.
index.index_from_dataset(
  tf.data.Dataset.zip((activities.batch(BATCH_SIZE), activities.batch(BATCH_SIZE).map(activity_model)))
)

# Get recommendations.
user_test = 'U4' # New user example, it does recomend
_, titles = index(tf.constant([user_test]))
print(f"\nRecommendations for user {user_test}: {titles[0, :5]}")

user_test = 'U3'
_, titles = index(tf.constant([user_test]))
print(f"\nRecommendations for user {user_test}: {titles[0, :5]}")