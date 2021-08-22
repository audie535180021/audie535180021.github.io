let chunks = [];

document.getElementById(`aud-recorder`).style.display = 'block';

const audioMediaConstraints = {
  audio: true,
  video: false,
};

function startRecording(thisButton, otherButton) {
  navigator.mediaDevices.getUserMedia(audioMediaConstraints).then((mediaStream) => {
    const mediaRecorder = new MediaRecorder(mediaStream);
    window.mediaStream = mediaStream;
    window.mediaRecorder = mediaRecorder;
    mediaRecorder.start();
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, {
        type: 'audio/wav',
      });
      chunks = [];

      const recordedMedia = document.createElement('audio');
      recordedMedia.setAttribute('class', 'd-flex flex-columns my-2');
      recordedMedia.controls = true;
      const recordedMediaURL = URL.createObjectURL(blob);
      recordedMedia.src = recordedMediaURL;
      document.getElementById(`aud-recorder`).append(recordedMedia);
    };

    thisButton.disabled = true;
    otherButton.disabled = false;
  });
}

function stopRecording(thisButton, otherButton) {
  window.mediaRecorder.stop();
  window.mediaStream.getTracks().forEach((track) => {
    track.stop();
  });

  thisButton.disabled = true;
  otherButton.disabled = false;
}
