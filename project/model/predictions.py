# All imports
import json
import tensorflow as tf
import tensorflow_recommenders as tfrs

# --------------- Loading the model -----------

model = tf.keras.models.load_model("./trained_model")


# --------------- Loading necessary data ---------------

BATCH_SIZE = 128
data_activities = {}
with open("data_activities.json", "r") as f:
    data_activities = json.load(f)
activities_list = [act["act_id"] for act in data_activities]
activities = tf.data.Dataset.from_tensor_slices(activities_list)


# --------------- Making predictions -----------


def predicting(user, top_n=3):

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

    print(f"\nTop {top_n} recommendations for user {user}:")
    for i, title in enumerate(titles[0, :top_n].numpy()):
        title = title.decode("utf-8")
        print(f"{i + 1}. {title}")


# Get recommendations.

predicting("U4")

predicting("U3")
