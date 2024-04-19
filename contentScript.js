console.log("Successfully loading the content script");

var recorder = null;
function onAccessApproved(stream) {
  recorder = new MediaRecorder(stream);
  recorder.start();
  recorder.onstop = function (track) {
    console.log(track);
    if (track.readyState === "live") {
      track.stop();
    }
  };

  //   Accessing the recording
  recorder.ondataavailable = function (event) {
    console.log(event);
    let recordedBlob = event.data;
    console.log("recordedBlob", recordedBlob);
    // url to save this recording
    let url = URL.createObjectURL(recordedBlob);
    console.log("url for saving the file", url);
    let a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    // Downloading the file
    a.download = "screen-recording.webm";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
}

// Listening to the message event from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "request_recording") {
    console.log("request recording");
    sendResponse(`processed: ${message.action}`);
    // Request the recording from the user
    navigator.mediaDevices
      .getDisplayMedia({
        audio: true,
        video: {
          width: 999999999999,
          height: 999999999999,
        },
      })
      .then((stream) => {
        onAccessApproved(stream);
      });
  } else {
    console.log("No requesting");
  }

  //   for stopping the video from the extension UI
  if (message.action === "stop_recording") {
    console.log("stopping");
    sendResponse(`processed: ${message.action}`);
    if (!recorder) {
      return console.log("no recorder");
    }

    recorder.stop();
  }
});
