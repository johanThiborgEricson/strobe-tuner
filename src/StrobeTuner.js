function StrobeTuner() {
  this.context = new AudioContext();
}

StrobeTuner.prototype
.startMicrophone = function() {
  var that = this;
  var source;
  
  navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream) {
    that.stream = stream;
    var analyser = that.context.createScriptProcessor(1024,1,1);
    var source = that.context.createMediaStreamSource(stream);
    source.connect(analyser);
    // Bugfix: Connect analyzer node to AudioContext.destination
    // or else it won't start. Also mute it.
    var mute = that.context.createGain();
    mute.gain.value = 0;
    analyser.connect(mute);
    mute.connect(that.context.destination);
    
    analyser.addEventListener("audioprocess", that);

  }).catch(function(e) {
    alert('Error capturing audio.');
  });

};

StrobeTuner.prototype
.handleEvent = function(e) {
  
};

StrobeTuner.prototype
.stopMicrophone = function() {
  this.stream.getTracks().map(function(track) {
    track.stop();
  });
  
  if(this.context.state != "closed") {
    this.context.close();
  }
  
};
