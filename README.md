# Emotion-Detection
### This project is a web-based emotion detection system using DeepFace for emotion analysis. Users can capture live images or upload an image, detect emotions, and receive remedies based on the detected emotion. The system also maintains an emotion frequency heatmap and suggests music recommendations.
## Features
### 1.Live Camera Capture: Captures images from the webcam.

### 2.Image Upload: Allows users to upload images for emotion detection.

### 3.Emotion Detection: Uses DeepFace to analyze emotions.

### 4.Emotion-Based Remedies: Provides remedies based on detected emotions.

### 5.Music Recommendation: Suggests music from YouTube and Spotify.

### 6.Emotion Frequency Heatmap: Displays a heatmap of detected emotions.

### 7.Dataset Storage: Stores captured images in a dataset folder with detected emotions.
## Installation and Setup
# 1. Clone the Repository
```
git clone https://github.com/your-repo/emotion-detection.git
cd emotion-detection
```
# 2. Set Up Virtual Environment
```
python -m venv emotion-env
source emotion-env/bin/activate  # On macOS/Linux
emotion-env\Scripts\activate     #On Windows
```
# 3. Install Dependencies
```
pip install -r requirements.txt
```
### Dependencies:

Flask

OpenCV (cv2)

NumPy

DeepFace

Chart.js (for heatmap visualization)
```
pip install Flask opencv-python numpy deepface
```
# 4. Run the Application
```
python app.py
```
# 5. Open in Browser
### visit :
```
http://127.0.0.1:5000/
```
# Project Structure
```
├── dataset/                 # Stores captured images with detected emotions
├── static/
│   ├── script.js            # Handles frontend logic
│   ├── styles.css           # UI Styling
├── templates/
│   ├── index.html           # Main frontend file
├── app.py                   # Flask backend
├── requirements.txt         # List of dependencies
├── README.md                # Project documentation
```
