let chunks = [];
let blobArr = [];

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
      var currentVal = localStorage.getItem('myClicks') ? parseInt(localStorage.getItem('myClicks')) : 0;
      var newVal = currentVal + 1;
      localStorage.setItem('myClicks', newVal);

      const blob = new Blob(chunks, {
        type: 'audio/wav',
      });
      chunks = [];

      const recordedMedia = document.createElement('audio');
      recordedMedia.setAttribute('class', 'd-flex flex-columns my-2');
      recordedMedia.controls = true;
      const recordedMediaURL = URL.createObjectURL(blob);
      blobArr.push(URL.createObjectURL(blob));
      recordedMedia.src = recordedMediaURL;
      document.getElementById(`result`).append(recordedMedia);

      if (blobArr.length >= 5) {
        document.getElementById('downloadAll').style.visibility = 'visible';
      }
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

function getAllAudioTag(e) {
  var fileName = document.getElementById('inputName').value;
  if (fileName === '') {
    fileName = 'anonym';
  }

  var ulist = document.createElement('ul');
  var listItem;
  for (var i = 0; i < blobArr.length; i++) {
    var li = document.createElement('li');
    var sequence = i + 1;
    var a = document.createElement('a');
    var link = document.createTextNode('This is link');
    a.appendChild(link);
    a.href = blobArr[i];
    a.download = fileName + sequence + '.wav';
    a.click();
    a.setAttribute('class', 'audio-result');
    li.appendChild(a);
    ulist.appendChild(li);
    ulist.style.display = 'none';
  }
}
