# All imports
import json
from typing import Dict, Text

import numpy as np
import tensorflow as tf
import tensorflow_recommenders as tfrs

# -----------Handling data---------------
data_activities = {}
with open("data_activities.json", "r") as f:
    data_activities = json.load(f)

data_feedback = []
with open("data_feedback.json", "r") as f:
    data_feedback = json.load(f)

unique_activity_ids = set(activity["act_id"] for activity in data_activities)
unique_user_ids = set(u["user_id"] for u in data_feedback)

# convert to bytes (tensorflow requires)
unique_user_ids = np.array(list(map(str.encode, unique_user_ids)))
unique_activity_ids = np.array(list(map(str.encode, unique_activity_ids)))

# cast activity data into TF tensor
activities_list = [act["act_id"] for act in data_activities]
activities = tf.data.Dataset.from_tensor_slices(activities_list)

# cast feedback data into TF tensor
user_id_list = []
act_id_list = []
act_class_list = []
for entry in data_feedback:
    user_id_list.append(entry["user_id"])
    act_id_list.append(entry["act_id"])
    # from 'act_id' extract also the activity class
    act_class_list.append(next(filter(lambda x: x['act_id'] == entry["act_id"], data_activities), {}).get('act_class'))
    

feedback = tf.data.Dataset.from_tensor_slices(
    {
        "user_id": user_id_list,
        "act_id": act_id_list,
        "class": act_class_list,
    }
)


# ----------Train/test split ---------------

num_samples = len(data_feedback)
shuffled = feedback.shuffle(
    buffer_size=num_samples, reshuffle_each_iteration=False
)

train_percent = 0.8  # 0.2 test

train_size = int(train_percent * num_samples)
test_size = num_samples - train_size 

train = shuffled.take(train_size)
test = shuffled.skip(train_size)

# ------------ The model ----------------------
# todo: search what values to set to these constants
EMBEDDING_DIMENSION = 32  # Higher values will correspond to models that may be more accurate, but will also be slower to fit and more prone to overfitting.
BATCH_SIZE = 128 
NUM_EPOCH = 3

# Query tower = user
user_model = tf.keras.Sequential(
    [
        tf.keras.layers.StringLookup(vocabulary=unique_user_ids, mask_token=None),
        # We add an additional embedding to account for unknown tokens.
        tf.keras.layers.Embedding(len(unique_user_ids) + 1, EMBEDDING_DIMENSION),
    ]
)

# Candidate tower = activity
activity_model = tf.keras.Sequential(
    [
        tf.keras.layers.StringLookup(vocabulary=unique_activity_ids, mask_token=None),
        tf.keras.layers.Embedding(len(unique_activity_ids) + 1, EMBEDDING_DIMENSION),
    ]
)


# --------- Metrics -----------
metrics = tfrs.metrics.FactorizedTopK(
    candidates=activities.batch(BATCH_SIZE).map(activity_model)
)

task = tfrs.tasks.Retrieval(metrics=metrics)


# -----------Class model ---------

class ActivityModel(tfrs.Model):

    def __init__(self, user_model, activity_model):
        super().__init__()
        self.activity_model: tf.keras.Model = activity_model
        self.user_model: tf.keras.Model = user_model
        self.task: tf.keras.layers.Layer = task

    def compute_loss(self, features: Dict[Text, tf.Tensor], training=False) -> tf.Tensor:
        # We pick out the user features and pass them into the user model.
        user_embeddings = self.user_model(features["user_id"])
        # And pick out the activity features and pass them into the activity model,
        # getting embeddings back.
        positive_activity_embeddings = self.activity_model(features["act_id"])

        # The task computes the loss and the metrics.
        return self.task(user_embeddings, positive_activity_embeddings)


#----------Fitting the model--------------------

model = ActivityModel(user_model, activity_model)
model.compile(optimizer=tf.keras.optimizers.Adagrad(learning_rate=0.1))

cached_train = train.shuffle(num_samples).batch(BATCH_SIZE).cache()
cached_test = test.batch(BATCH_SIZE).cache()

model.fit(cached_train, epochs=NUM_EPOCH)

# stats
model.evaluate(cached_test, return_dict=True)


#--------------- Exporting the model -----------

model.user_model.save('user_model', save_format='tf')
model.activity_model.save('activity_model', save_format='tf')
