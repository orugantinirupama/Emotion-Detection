# # 
# from flask import Flask, render_template, request, jsonify
# import cv2
# import os
# import numpy as np
# from deepface import DeepFace
# from datetime import datetime
# from collections import defaultdict

# app = Flask(__name__)

# # Ensure dataset folder exists
# if not os.path.exists("dataset"):
#     os.makedirs("dataset")

# # Store emotion counts for heatmap
# emotion_counts = defaultdict(int)

# @app.route("/")
# def index():
#     return render_template("index.html")

# @app.route("/detect_emotion", methods=["POST"])
# def detect_emotion():
#     file = request.files["image"]
#     if file:
#         filename = f"dataset/{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
#         file.save(filename)

#         img = cv2.imread(filename)

#         try:
#             result = DeepFace.analyze(img, actions=["emotion"], enforce_detection=False)
#             emotion = result[0]["dominant_emotion"]

#             # Store detected emotion in filename
#             new_filename = f"dataset/{emotion}_{os.path.basename(filename)}"
#             os.rename(filename, new_filename)

#             # Update emotion count
#             emotion_counts[emotion] += 1

#             return jsonify({"emotion": emotion})

#         except Exception as e:
#             return jsonify({"error": str(e)})

#     return jsonify({"error": "No image received"})

# @app.route("/emotion_data", methods=["GET"])
# def get_emotion_data():
#     return jsonify(emotion_counts)

# if __name__ == "__main__":
#     app.run(debug=True)
from flask import Flask, render_template, request, jsonify
import cv2
import os
import numpy as np
from deepface import DeepFace
from datetime import datetime
from collections import defaultdict

app = Flask(__name__)

# Ensure dataset folder exists
if not os.path.exists("dataset"):
    os.makedirs("dataset")

# Emotion frequency dictionary
emotion_counts = {
    "happy": 1,
    "sad": 1,
    "angry": 1,
    "neutral": 1,
    "surprise": 1,
    "fearful": 1,
    "disgusted": 1
}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/detect_emotion", methods=["POST"])
def detect_emotion():
    file = request.files.get("image")
    if file:
        filename = f"dataset/{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
        file.save(filename)
        img = cv2.imread(filename)

        try:
            result = DeepFace.analyze(img, actions=["emotion"], enforce_detection=False)
            detected_emotion = result[0]["dominant_emotion"]
            print(f"Detected Emotion: {detected_emotion}")

            # Rename file with detected emotion
            new_filename = f"dataset/{detected_emotion}_{os.path.basename(filename)}"
            os.rename(filename, new_filename)

            # Adjust emotion frequencies
            max_frequency = max(emotion_counts.values()) + 1
            for emotion in emotion_counts:
                if emotion == detected_emotion:
                    emotion_counts[emotion] = max_frequency  # Ensure detected emotion is highest
                else:
                    emotion_counts[emotion] = max(1, emotion_counts[emotion] - 1)  # Reduce others

            print("Updated Emotion Frequencies:", emotion_counts)
            return jsonify({"emotion": detected_emotion})

        except Exception as e:
            print("Error:", e)
            return jsonify({"error": str(e)})

    return jsonify({"error": "No image received"})

@app.route("/emotion_data", methods=["GET"])
def get_emotion_data():
    return jsonify(emotion_counts)

if __name__ == "__main__":
    app.run(debug=True)





