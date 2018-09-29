describe("The strobe tuner", function() {
  
  var strobeTuner;
  
  beforeEach(function(done) {
    strobeTuner = new StrobeTuner();
    spyOn(strobeTuner, "handleEvent").and.callFake(function() {
      done();
    });
    
    strobeTuner.startMicrophone();
  });
  
  afterEach(function() {
    strobeTuner.stopMicrophone();
  });
  
  it("can listen to the microphone", function() {
    expect(strobeTuner.handleEvent).toHaveBeenCalled();
  });
  
  it("can stop listening to the microphone", function() {
    strobeTuner.stopMicrophone();
    
    expect(strobeTuner.stream.getTracks()[0].readyState).toBe("ended");
    expect(strobeTuner.context.state).toBe("closed");
  });
  
});
