
�root"_tf_keras_model*�{"name": "activity_model", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": null, "must_restore_from_config": false, "preserve_input_structure_in_config": false, "autocast": true, "class_name": "ActivityModel", "config": {"retrieval_weight": 1.0}, "shared_object_id": 0, "build_input_shape": {"user_id": {"class_name": "TensorShape", "items": [null]}, "act_id": {"class_name": "TensorShape", "items": [null]}, "act_class": {"class_name": "TensorShape", "items": [null]}}, "is_graph_network": false, "full_save_spec": {"class_name": "__tuple__", "items": [[{"user_id": {"class_name": "TypeSpec", "type_spec": "tf.TensorSpec", "serialized": [{"class_name": "TensorShape", "items": [null]}, "string", "user_id"]}, "act_id": {"class_name": "TypeSpec", "type_spec": "tf.TensorSpec", "serialized": [{"class_name": "TensorShape", "items": [null]}, "string", "act_id"]}, "act_class": {"class_name": "TypeSpec", "type_spec": "tf.TensorSpec", "serialized": [{"class_name": "TensorShape", "items": [null]}, "string", "act_class"]}}], {}]}, "save_spec": {"user_id": {"class_name": "TypeSpec", "type_spec": "tf.TensorSpec", "serialized": [{"class_name": "TensorShape", "items": [null]}, "string", "user_id"]}, "act_id": {"class_name": "TypeSpec", "type_spec": "tf.TensorSpec", "serialized": [{"class_name": "TensorShape", "items": [null]}, "string", "act_id"]}, "act_class": {"class_name": "TypeSpec", "type_spec": "tf.TensorSpec", "serialized": [{"class_name": "TensorShape", "items": [null]}, "string", "act_class"]}}, "keras_version": "2.15.0", "backend": "tensorflow", "model_config": {"class_name": "ActivityModel", "config": {"retrieval_weight": 1.0}}, "training_config": {"loss": null, "metrics": null, "weighted_metrics": null, "loss_weights": null, "optimizer_config": {"class_name": "Custom>RMSprop", "config": {"name": "RMSprop", "weight_decay": null, "clipnorm": null, "global_clipnorm": null, "clipvalue": null, "use_ema": false, "ema_momentum": 0.99, "ema_overwrite_frequency": 100, "jit_compile": false, "is_legacy_optimizer": false, "learning_rate": 0.0010000000474974513, "rho": 0.9, "momentum": 0.0, "epsilon": 1e-07, "centered": false}}}}2
�root.activity_model"_tf_keras_sequential*�{"name": "sequential", "trainable": true, "expects_training_arg": true, "dtype": "float32", "batch_input_shape": null, "must_restore_from_config": false, "preserve_input_structure_in_config": false, "autocast": false, "class_name": "Sequential", "config": {"name": "sequential", "layers": [{"class_name": "InputLayer", "config": {"batch_input_shape": {"class_name": "__tuple__", "items": [null]}, "dtype": "string", "sparse": false, "ragged": false, "name": "string_lookup_input"}}, {"class_name": "StringLookup", "config": {"name": "string_lookup", "trainable": true, "dtype": "int64", "invert": false, "max_tokens": null, "num_oov_indices": 1, "oov_token": "[UNK]", "mask_token": null, "output_mode": "int", "sparse": false, "pad_to_max_tokens": false, "idf_weights": null, "vocabulary": [{"class_name": "__bytes__", "value": "A7"}, {"class_name": "__bytes__", "value": "A10"}, {"class_name": "__bytes__", "value": "A4"}, {"class_name": "__bytes__", "value": "A5"}, {"class_name": "__bytes__", "value": "A9"}, {"class_name": "__bytes__", "value": "A2"}, {"class_name": "__bytes__", "value": "A1"}, {"class_name": "__bytes__", "value": "A6"}, {"class_name": "__bytes__", "value": "A8"}, {"class_name": "__bytes__", "value": "A3"}, {"class_name": "__bytes__", "value": "A11"}], "vocabulary_size": 12, "encoding": "utf-8"}}, {"class_name": "Embedding", "config": {"name": "embedding", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 12, "output_dim": 32, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}}, "embeddings_regularizer": null, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}}]}, "shared_object_id": 5, "build_input_shape": {"class_name": "TensorShape", "items": [null]}, "is_graph_network": true, "full_save_spec": {"class_name": "__tuple__", "items": [[{"class_name": "TypeSpec", "type_spec": "tf.TensorSpec", "serialized": [{"class_name": "TensorShape", "items": [null]}, "string", "string_lookup_input"]}], {}]}, "save_spec": {"class_name": "TypeSpec", "type_spec": "tf.TensorSpec", "serialized": [{"class_name": "TensorShape", "items": [null]}, "string", "string_lookup_input"]}, "keras_version": "2.15.0", "backend": "tensorflow", "model_config": {"class_name": "Sequential", "config": {"name": "sequential", "layers": [{"class_name": "InputLayer", "config": {"batch_input_shape": {"class_name": "__tuple__", "items": [null]}, "dtype": "string", "sparse": false, "ragged": false, "name": "string_lookup_input"}, "shared_object_id": 1}, {"class_name": "StringLookup", "config": {"name": "string_lookup", "trainable": true, "dtype": "int64", "invert": false, "max_tokens": null, "num_oov_indices": 1, "oov_token": "[UNK]", "mask_token": null, "output_mode": "int", "sparse": false, "pad_to_max_tokens": false, "idf_weights": null, "vocabulary": null, "vocabulary_size": 12, "encoding": "utf-8", "has_input_vocabulary": true}, "shared_object_id": 2}, {"class_name": "Embedding", "config": {"name": "embedding", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 12, "output_dim": 32, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}, "shared_object_id": 3}, "embeddings_regularizer": null, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}, "shared_object_id": 4}]}}}2
�	root.user_model"_tf_keras_sequential*�{"name": "sequential_1", "trainable": true, "expects_training_arg": true, "dtype": "float32", "batch_input_shape": null, "must_restore_from_config": false, "preserve_input_structure_in_config": false, "autocast": false, "class_name": "Sequential", "config": {"name": "sequential_1", "layers": [{"class_name": "InputLayer", "config": {"batch_input_shape": {"class_name": "__tuple__", "items": [null]}, "dtype": "string", "sparse": false, "ragged": false, "name": "string_lookup_1_input"}}, {"class_name": "StringLookup", "config": {"name": "string_lookup_1", "trainable": true, "dtype": "int64", "invert": false, "max_tokens": null, "num_oov_indices": 1, "oov_token": "[UNK]", "mask_token": null, "output_mode": "int", "sparse": false, "pad_to_max_tokens": false, "idf_weights": null, "vocabulary": [{"class_name": "__bytes__", "value": "U3"}, {"class_name": "__bytes__", "value": "U1"}, {"class_name": "__bytes__", "value": "U2"}], "vocabulary_size": 4, "encoding": "utf-8"}}, {"class_name": "Embedding", "config": {"name": "embedding_1", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 4, "output_dim": 32, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}}, "embeddings_regularizer": null, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}}]}, "shared_object_id": 10, "build_input_shape": {"class_name": "TensorShape", "items": [null]}, "is_graph_network": true, "full_save_spec": {"class_name": "__tuple__", "items": [[{"class_name": "TypeSpec", "type_spec": "tf.TensorSpec", "serialized": [{"class_name": "TensorShape", "items": [null]}, "string", "string_lookup_1_input"]}], {}]}, "save_spec": {"class_name": "TypeSpec", "type_spec": "tf.TensorSpec", "serialized": [{"class_name": "TensorShape", "items": [null]}, "string", "string_lookup_1_input"]}, "keras_version": "2.15.0", "backend": "tensorflow", "model_config": {"class_name": "Sequential", "config": {"name": "sequential_1", "layers": [{"class_name": "InputLayer", "config": {"batch_input_shape": {"class_name": "__tuple__", "items": [null]}, "dtype": "string", "sparse": false, "ragged": false, "name": "string_lookup_1_input"}, "shared_object_id": 6}, {"class_name": "StringLookup", "config": {"name": "string_lookup_1", "trainable": true, "dtype": "int64", "invert": false, "max_tokens": null, "num_oov_indices": 1, "oov_token": "[UNK]", "mask_token": null, "output_mode": "int", "sparse": false, "pad_to_max_tokens": false, "idf_weights": null, "vocabulary": null, "vocabulary_size": 4, "encoding": "utf-8", "has_input_vocabulary": true}, "shared_object_id": 7}, {"class_name": "Embedding", "config": {"name": "embedding_1", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 4, "output_dim": 32, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}, "shared_object_id": 8}, "embeddings_regularizer": null, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}, "shared_object_id": 9}]}}}2
�
root.retrieval_task"_tf_keras_layer*�{"name": "retrieval_1", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": null, "stateful": false, "must_restore_from_config": false, "preserve_input_structure_in_config": false, "autocast": true, "class_name": "Retrieval", "config": {"name": "retrieval_1"}, "shared_object_id": 11, "build_input_shape": {"class_name": "TensorShape", "items": [null, 32]}}2
�root.activity_model.layer-0"_tf_keras_layer*�{"name": "string_lookup", "trainable": true, "expects_training_arg": false, "dtype": "int64", "batch_input_shape": null, "stateful": false, "must_restore_from_config": true, "preserve_input_structure_in_config": false, "autocast": true, "class_name": "StringLookup", "config": {"name": "string_lookup", "trainable": true, "dtype": "int64", "invert": false, "max_tokens": null, "num_oov_indices": 1, "oov_token": "[UNK]", "mask_token": null, "output_mode": "int", "sparse": false, "pad_to_max_tokens": false, "idf_weights": null, "vocabulary": null, "vocabulary_size": 12, "encoding": "utf-8", "has_input_vocabulary": true}, "shared_object_id": 2, "build_input_shape": {"class_name": "TensorShape", "items": [null]}}2
�(root.activity_model.layer_with_weights-0"_tf_keras_layer*�{"name": "embedding", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "stateful": false, "must_restore_from_config": false, "preserve_input_structure_in_config": false, "autocast": false, "class_name": "Embedding", "config": {"name": "embedding", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 12, "output_dim": 32, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}, "shared_object_id": 3}, "embeddings_regularizer": null, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}, "shared_object_id": 4, "build_input_shape": {"class_name": "TensorShape", "items": [null]}}2
�$root.user_model.layer-0"_tf_keras_layer*�{"name": "string_lookup_1", "trainable": true, "expects_training_arg": false, "dtype": "int64", "batch_input_shape": null, "stateful": false, "must_restore_from_config": true, "preserve_input_structure_in_config": false, "autocast": true, "class_name": "StringLookup", "config": {"name": "string_lookup_1", "trainable": true, "dtype": "int64", "invert": false, "max_tokens": null, "num_oov_indices": 1, "oov_token": "[UNK]", "mask_token": null, "output_mode": "int", "sparse": false, "pad_to_max_tokens": false, "idf_weights": null, "vocabulary": null, "vocabulary_size": 4, "encoding": "utf-8", "has_input_vocabulary": true}, "shared_object_id": 7, "build_input_shape": {"class_name": "TensorShape", "items": [null]}}2
�%$root.user_model.layer_with_weights-0"_tf_keras_layer*�{"name": "embedding_1", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "stateful": false, "must_restore_from_config": false, "preserve_input_structure_in_config": false, "autocast": false, "class_name": "Embedding", "config": {"name": "embedding_1", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 4, "output_dim": 32, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}, "shared_object_id": 8}, "embeddings_regularizer": null, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}, "shared_object_id": 9, "build_input_shape": {"class_name": "TensorShape", "items": [null]}}2