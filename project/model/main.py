# --- Imports ---
import json
from typing import Dict, Text

import numpy as np
import tensorflow as tf
import tensorflow_recommenders as tfrs

# --- Constants ---
EMBEDDING_DIMENSION = 32  # Higher values will correspond to models that may be more accurate, but will also be slower to fit and more prone to overfitting.
BATCH_SIZE = 128

# --- Model loading ---

# model = tf.keras.models.load_model("./trained_model")


# --- Data handle ---


def get_activities():
    data_activities = []
    with open("data_activities.json", "r") as f:
        data_activities = json.load(f)
    return data_activities


def get_feedback():
    data_feedback = []
    with open("data_feedback.json", "r") as f:
        data_feedback = json.load(f)
    return data_feedback


def update_activities():
    pass  # todo: API DB call to get updated activities
    data_activities = []  # here
    with open("data_activities.json", "w") as f:
        json.dump(data_activities, f)

    print("data_activities.json updated")


def update_feedback(new_feedback):
    # Example of use
    # update_feedback({"user_id": "U1", "act_id": "A1"})
    data_feedback = []
    with open("data_feedback.json", "r") as f:
        data_feedback = json.load(f)

    data_feedback.append(new_feedback)
    with open("data_feedback.json", "w") as f:
        json.dump(data_feedback, f)

    print("data_feedback.json updated")


# --- Api routes ---
# todo flask routes
# @app.route("/")
def get_recommendations(user_id):
    # User request to have agenda recommendation - top 5?
    return predicting(user_id, 5)


def set_feedback(data_feedback):
    # re train model with user selection

    # data_feedback should be structured like:
    # data_feedback = {"user_id": "U1", "act_id": "A1"}

    retrain(data_feedback)


# --- model methods ---


def predicting(user, top_n=3):
    # Example of use
    # print(get_recommendations('u2'))

    activities_list = [act["act_id"] for act in get_activities()]
    activities = tf.data.Dataset.from_tensor_slices(activities_list)

    model = tf.keras.models.load_model("./trained_model")
    # Create a model that takes in raw query features, and
    index = tfrs.layers.factorized_top_k.BruteForce(model.user_model)
    # recommends activities out of the entire activity dataset.
    index.index_from_dataset(
        tf.data.Dataset.zip(
            (
                activities.batch(BATCH_SIZE),
                activities.batch(BATCH_SIZE).map(model.activity_model),
            )
        )
    )

    # Get recommendations.
    _, titles = index(tf.constant([str(user)]))

    return [id.decode("utf-8") for id in titles[0, :top_n].numpy()]


def retrain(data_feedback):
    model = tf.keras.models.load_model("./trained_model")
    feedback = structure_input(data_feedback)
    model.compile(optimizer=tf.keras.optimizers.Adagrad(0.1))
    model.fit(feedback, epochs=1) # this wont work = loss error
    model.compile()
    model.save("./trained_model")



def structure_input(data_feedback):
    data_activities = get_activities()
    feedback = tf.data.Dataset.from_tensor_slices(
        {
            "user_id": [data_feedback["user_id"]],
            "act_id": [data_feedback["act_id"]],
            "act_class": [
                next(
                    filter(
                        lambda x: x["act_id"] == data_feedback["act_id"],
                        data_activities,
                    ),
                    {},
                ).get("act_class")
            ],
        }
    )
    feedback = feedback.shuffle(1).batch(1).cache()
