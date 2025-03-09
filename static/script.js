// document.addEventListener("DOMContentLoaded", function () {
//     const video = document.getElementById("video");
//     const captureButton = document.getElementById("capture");
//     const uploadInput = document.getElementById("upload");
//     const canvas = document.getElementById("canvas");
//     const resultDiv = document.getElementById("result");
//     const confirmationDiv = document.getElementById("confirmation");
//     const remedyDiv = document.getElementById("remedy");
//     const musicOptionDiv = document.getElementById("musicOption");
//     const musicLinksDiv = document.getElementById("musicLinks");
//     const heatmapCanvas = document.getElementById("heatmap");
//     const spotifyButton = document.createElement("button");
//     const youtubeButton = document.createElement("button");

//     spotifyButton.textContent = "Listen on Spotify";
//     youtubeButton.textContent = "Listen on YouTube";

//     navigator.mediaDevices.getUserMedia({ video: true })
//         .then(stream => {
//             video.srcObject = stream;
//         })
//         .catch(err => console.error("Camera access denied", err));

//     captureButton.addEventListener("click", function () {
//         captureAndSendImage();
//     });

//     uploadInput.addEventListener("change", function (event) {
//         const file = event.target.files[0];
//         if (file) {
//             sendImageToBackend(file);
//         }
//     });

//     function captureAndSendImage() {
//         const context = canvas.getContext("2d");
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         context.drawImage(video, 0, 0, canvas.width, canvas.height);

//         canvas.toBlob(blob => {
//             sendImageToBackend(blob);
//         }, "image/jpeg");
//     }

//     function sendImageToBackend(imageBlob) {
//         const formData = new FormData();
//         formData.append("image", imageBlob);

//         fetch("/detect_emotion", {
//             method: "POST",
//             body: formData
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.emotion) {
//                 resultDiv.innerHTML = `<p>Detected Emotion: ${data.emotion}</p>`;
//                 confirmationDiv.style.display = "block";
//                 remedyDiv.style.display = "none";
//                 musicOptionDiv.style.display = "none";
//                 musicLinksDiv.style.display = "none";

//                 document.querySelectorAll("input[name='confirm']").forEach(radio => {
//                     radio.onclick = function () {
//                         if (this.value === "yes") {
//                             showRemedy(data.emotion);
//                             updateHeatMap();
//                         } else {
//                             resultDiv.innerHTML = "<p>Reanalyzing...</p>";
//                             setTimeout(() => sendImageToBackend(imageBlob), 1000);
//                         }
//                     };
//                 });
//             }
//         })
//         .catch(error => console.error("Error:", error));
//     }

//     function showRemedy(emotion) {
//         let remedies = {
//             "happy": "Keep smiling! Watch a fun movie or share your joy with friends.",
//             "sad": "Try watching a comedy movie or listening to uplifting music.",
//             "angry": "Take deep breaths, go for a walk, or listen to relaxing music.",
//             "neutral": "Enjoy your time! Maybe read a book or relax.",
//             "surprised": "Embrace the unexpected! Explore something new.",
//             "fearful": "Take deep breaths, stay calm, and reassure yourself.",
//             "disgusted": "Try focusing on something pleasant or taking a break."
//         };

//         remedyDiv.innerHTML = `<p>${remedies[emotion] || "Enjoy your day!"}</p>`;
//         remedyDiv.style.display = "block";
//         musicOptionDiv.style.display = "block";
//         musicOptionDiv.innerHTML = "<p>Would you like to listen to music?</p>";
//         musicOptionDiv.appendChild(spotifyButton);
//         musicOptionDiv.appendChild(youtubeButton);

//         spotifyButton.onclick = function () {
//             let spotifySearch = `${emotion} mood music`;
//             let spotifyLinks = `<p>Here are some Spotify playlists:</p>
//                 <ul>
//                     <li><a href="https://open.spotify.com/search/${spotifySearch}" target="_blank">Spotify Playlist 1</a></li>
//                     <li><a href="https://open.spotify.com/search/${spotifySearch}+songs" target="_blank">Spotify Playlist 2</a></li>
//                 </ul>`;
//             musicLinksDiv.innerHTML = spotifyLinks;
//             musicLinksDiv.style.display = "block";
//         };

//         youtubeButton.onclick = function () {
//             let youtubeSearch = `${emotion} relaxing music`;
//             let youtubeLinks = `<p>Here are some YouTube videos:</p>
//                 <ul>
//                     <li><a href="https://www.youtube.com/results?search_query=${youtubeSearch}" target="_blank">YouTube Music 1</a></li>
//                     <li><a href="https://www.youtube.com/results?search_query=${youtubeSearch}" target="_blank">YouTube Music 2</a></li>
//                 </ul>`;
//             musicLinksDiv.innerHTML = youtubeLinks;
//             musicLinksDiv.style.display = "block";
//         };
//     }

//     function updateHeatMap() {
//         fetch("/emotion_data")
//             .then(response => response.json())
//             .then(data => generateHeatMap(data))
//             .catch(error => console.error("Error fetching heatmap data:", error));
//     }

//     function generateHeatMap(emotionData) {
//         new Chart(heatmapCanvas.getContext("2d"), {
//             type: "bar",
//             data: {
//                 labels: Object.keys(emotionData),
//                 datasets: [{
//                     label: "Emotion Frequency",
//                     data: Object.values(emotionData),
//                     backgroundColor: ["red", "blue", "green", "yellow", "purple", "orange", "pink"]
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 scales: {
//                     y: { beginAtZero: true }
//                 }
//             }
//         });
//     }
// });
// document.addEventListener("DOMContentLoaded", function () {
//     const video = document.getElementById("video");
//     const captureButton = document.getElementById("capture");
//     const uploadInput = document.getElementById("upload");
//     const canvas = document.getElementById("canvas");
//     const resultDiv = document.getElementById("result");
//     const confirmationDiv = document.getElementById("confirmation");
//     const remedyDiv = document.getElementById("remedy");
//     const heatmapCanvas = document.getElementById("heatmap");
//     let chartInstance = null;

//     navigator.mediaDevices.getUserMedia({ video: true })
//         .then(stream => {
//             video.srcObject = stream;
//         })
//         .catch(err => console.error("Camera access denied", err));

//     captureButton.addEventListener("click", captureAndSendImage);
//     uploadInput.addEventListener("change", function (event) {
//         const file = event.target.files[0];
//         if (file) sendImageToBackend(file);
//     });

//     function captureAndSendImage() {
//         const context = canvas.getContext("2d");
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         context.drawImage(video, 0, 0, canvas.width, canvas.height);
//         canvas.toBlob(blob => {
//             sendImageToBackend(blob);
//         }, "image/jpeg");
//     }

//     function sendImageToBackend(imageBlob) {
//         const formData = new FormData();
//         formData.append("image", imageBlob);

//         fetch("/detect_emotion", {
//             method: "POST",
//             body: formData
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.emotion) {
//                 console.log("Detected Emotion:", data.emotion);
//                 resultDiv.innerHTML = `<p>Detected Emotion: ${data.emotion}</p>`;
//                 confirmationDiv.style.display = "block";

//                 document.querySelectorAll("input[name='confirm']").forEach(radio => {
//                     radio.onclick = function () {
//                         if (this.value === "yes") {
//                             showRemedy(data.emotion);
//                             updateHeatMap();
//                         } else {
//                             resultDiv.innerHTML = "<p>Reanalyzing...</p>";
//                             setTimeout(() => sendImageToBackend(imageBlob), 1000);
//                         }
//                     };
//                 });
//             }
//         })
//         .catch(error => console.error("Error:", error));
//     }

//     function showRemedy(emotion) {
//         const remedies = {
//             "happy": "Watch a fun movie or share your joy with friends.",
//             "sad": "Try listening to uplifting music or watching comedy.",
//             "angry": "Take deep breaths or listen to calming music.",
//             "neutral": "Enjoy your time with a book or relaxing activity.",
//             "surprise": "Embrace the unexpected! Try something new.",
//             "fearful": "Take deep breaths and calm your mind.",
//             "disgusted": "Focus on something positive and take a break."
//         };

//         remedyDiv.innerHTML = `<p>${remedies[emotion] || "Enjoy your day!"}</p>`;
//         remedyDiv.style.display = "block";
//     }

//     function updateHeatMap() {
//         fetch("/emotion_data")
//             .then(response => response.json())
//             .then(data => {
//                 console.log("Heatmap Data:", data);
//                 generateHeatMap(data);
//             })
//             .catch(error => console.error("Error fetching heatmap data:", error));
//     }

//     function generateHeatMap(emotionData) {
//         if (chartInstance) {
//             chartInstance.destroy(); // Clear old chart instance
//         }

//         chartInstance = new Chart(heatmapCanvas.getContext("2d"), {
//             type: "bar",
//             data: {
//                 labels: Object.keys(emotionData),
//                 datasets: [{
//                     label: "Emotion Frequency",
//                     data: Object.values(emotionData),
//                     backgroundColor: ["red", "blue", "green", "yellow", "purple", "orange", "pink"]
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 scales: {
//                     y: { beginAtZero: true }
//                 }
//             }
//         });
//     }
// });
document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("video");
    const captureButton = document.getElementById("capture");
    const uploadInput = document.getElementById("upload");
    const canvas = document.getElementById("canvas");
    const resultDiv = document.getElementById("result");
    const confirmationDiv = document.getElementById("confirmation");
    const remedyDiv = document.getElementById("remedy");
    const heatmapCanvas = document.getElementById("heatmap");
    const musicOptionDiv = document.getElementById("musicOption");
    const musicLinksDiv = document.getElementById("musicLinks");
    let chartInstance = null;

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => console.error("Camera access denied", err));

    captureButton.addEventListener("click", captureAndSendImage);
    uploadInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) sendImageToBackend(file);
    });

    function captureAndSendImage() {
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
            sendImageToBackend(blob);
        }, "image/jpeg");
    }

    function sendImageToBackend(imageBlob) {
        const formData = new FormData();
        formData.append("image", imageBlob);

        fetch("/detect_emotion", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.emotion) {
                console.log("Detected Emotion:", data.emotion);
                resultDiv.innerHTML = `<p>Detected Emotion: ${data.emotion}</p>`;
                confirmationDiv.style.display = "block";

                document.querySelectorAll("input[name='confirm']").forEach(radio => {
                    radio.onclick = function () {
                        if (this.value === "yes") {
                            showRemedy(data.emotion);
                            updateHeatMap();
                        } else {
                            resultDiv.innerHTML = "<p>Reanalyzing...</p>";
                            setTimeout(() => sendImageToBackend(imageBlob), 1000);
                        }
                    };
                });
            }
        })
        .catch(error => console.error("Error:", error));
    }

    function showRemedy(emotion) {
        const remedies = {
            "happy": "Watch a fun movie or share your joy with friends.",
            "sad": "Try listening to uplifting music or watching comedy.",
            "angry": "Take deep breaths or listen to calming music.",
            "neutral": "Enjoy your time with a book or relaxing activity.",
            "surprise": "Embrace the unexpected! Try something new.",
            "fearful": "Take deep breaths and calm your mind.",
            "disgusted": "Focus on something positive and take a break."
        };

        remedyDiv.innerHTML = `<p>${remedies[emotion] || "Enjoy your day!"}</p>`;
        remedyDiv.style.display = "block";
        musicOptionDiv.style.display = "block";
        musicOptionDiv.innerHTML = "<p>Would you like to listen to music?</p>";

        const spotifyButton = document.createElement("button");
        spotifyButton.textContent = "Spotify Music";
        const youtubeButton = document.createElement("button");
        youtubeButton.textContent = "YouTube Music";

        musicOptionDiv.appendChild(spotifyButton);
        musicOptionDiv.appendChild(youtubeButton);

        spotifyButton.onclick = function () {
            let spotifySearch = `${emotion} mood music`;
            let spotifyLinks = `<p>Here are some Spotify playlists:</p>
                <ul>
                    <li><a href="https://open.spotify.com/search/${spotifySearch}" target="_blank">Spotify Playlist 1</a></li>
                    <li><a href="https://open.spotify.com/search/${spotifySearch}+songs" target="_blank">Spotify Playlist 2</a></li>
                </ul>`;
            musicLinksDiv.innerHTML = spotifyLinks;
            musicLinksDiv.style.display = "block";
        };

        youtubeButton.onclick = function () {
            let youtubeSearch = `${emotion} relaxing music`;
            let youtubeLinks = `<p>Here are some YouTube videos:</p>
                <ul>
                    <li><a href="https://www.youtube.com/results?search_query=${youtubeSearch}" target="_blank">YouTube Music 1</a></li>
                    <li><a href="https://www.youtube.com/results?search_query=${youtubeSearch}" target="_blank">YouTube Music 2</a></li>
                </ul>`;
            musicLinksDiv.innerHTML = youtubeLinks;
            musicLinksDiv.style.display = "block";
        };
    }

    function updateHeatMap() {
        fetch("/emotion_data")
            .then(response => response.json())
            .then(data => {
                console.log("Heatmap Data:", data);
                generateHeatMap(data);
            })
            .catch(error => console.error("Error fetching heatmap data:", error));
    }

    function generateHeatMap(emotionData) {
        if (chartInstance) {
            chartInstance.destroy(); // Clear old chart instance
        }

        chartInstance = new Chart(heatmapCanvas.getContext("2d"), {
            type: "bar",
            data: {
                labels: Object.keys(emotionData),
                datasets: [{
                    label: "Emotion Frequency",
                    data: Object.values(emotionData),
                    backgroundColor: ["red", "blue", "green", "yellow", "purple", "orange", "pink"]
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
});
