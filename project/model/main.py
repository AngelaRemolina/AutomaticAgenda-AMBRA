# All imports
import json
import tensorflow as tf

# import tensorflow_recommenders as tfrs
# from flask import Flask

# app = Flask(__name__)

# @app.route("/")
# def hello_world():
#     return "<p>Hello, World!</p>"

# --------------- Loading the model -----------

model = tf.keras.models.load_model("./trained_model", compile=False)


# retrain the model

data_feedback = {"user_id": "U1", "act_id": "A1"}  # obtained from api call
# data_activities = #obtained from api call must update data_activities.json

data_activities = {}
with open("data_activities.json", "r") as f:
    data_activities = json.load(f)


feedback = tf.data.Dataset.from_tensor_slices(
    {
        "user_id": [data_feedback["user_id"]],
        "act_id": [data_feedback["act_id"]],
        "act_class": [
            next(
                filter(
                    lambda x: x["act_id"] == data_feedback["act_id"], data_activities
                ),
                {},
            ).get("act_class")
        ],
    }
)

feedback = feedback.shuffle(1).batch(1).cache()



def dummy_loss(y_true, y_pred):
    return tf.constant(0.0)

# model.compile(optimizer=)
model.compile(optimizer=tf.keras.optimizers.Adagrad(0.1), loss=dummy_loss)
# model.retrieval_weight = 0.1

model.fit(feedback, epochs=1)

print(model.inputs)
print(model.outputs)
print(model.summary())


# # # # save after retrain
# # model.compile()
# model.save("./trained_model")
