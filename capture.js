const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

// Options for getDisplayMedia()

var displayMediaOptions = {
    video: {
        cursor: "always",
        width: { ideal: 1280, max: 1920 },
        height: { ideal: 720, max: 1080 },
        mimeType: 'video/mp4; codecs=h264'
    },
    audio: true
};

// Set event listeners for the start and stop buttons

navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
.then(function(mediaStreamObj) {
    
    //add listeners for saving video/audio
    videoElem.srcObject = mediaStreamObj;
    let mediaRecorder = new MediaRecorder(mediaStreamObj);
    let vidSave = document.getElementById('vid2');
    let chunks = [];
    
    startElem.addEventListener('click', (ev)=>{
        mediaRecorder.start();
        console.log(mediaRecorder.state);
    })
    stopElem.addEventListener('click', (ev)=>{
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
    });
    mediaRecorder.ondataavailable = function(ev) {
        chunks.push(ev.data);
    }
    mediaRecorder.onstop = (ev)=>{
        let blob = new Blob(chunks, { type : "video/mp4" });
        chunks = [];
        var videoURL = window.URL.createObjectURL(blob);
        vidSave.src = videoURL;

        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "test.mp4";
        a.click();
        window.URL.revokeObjectURL(url);
    }
})
.catch(function(err) { 
    console.log(err.name, err.message); 
});

console.log = msg => logElem.innerHTML += `${msg}<br>`;
console.error = msg => logElem.innerHTML += `<span class="error">${msg}</span><br>`;
console.warn = msg => logElem.innerHTML += `<span class="warn">${msg}<span><br>`;
console.info = msg => logElem.innerHTML += `<span class="info">${msg}</span><br>`; 


function dumpOptionsInfo() {
    const videoTrack = videoElem.srcObject.getVideoTracks()[0];
    console.info("Track settings:");
    console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
    console.info("Track constraints:");
    console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
}
