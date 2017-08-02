describe("The Whistleblower", function() {
  
  var eventTarget;
  
  beforeEach(function() {
    eventTarget = document.createElement("div");
  });
  
  it("registers itself to listen to errors on its EventTarget", 
  function() {
    spyOn(eventTarget, "addEventListener");
    
    var whistleblower = new Whistleblower(eventTarget);
    
    expect(eventTarget.addEventListener)
    .toHaveBeenCalledWith("error", whistleblower);
  });
  
  it("is notified of errors on its EventHandler", function() {
    var whistleblower = new Whistleblower(eventTarget);
    spyOn(whistleblower, "handleEvent");
    
    var error = new ErrorEvent("error");
    eventTarget.dispatchEvent(error);
    
    expect(whistleblower.handleEvent).toHaveBeenCalledWith(error);
  });
  
  describe("when it handles errors,", function() {
    it("shows the message of the error if the body of the document is loaded", 
    function() {
      var theDocument = {
        body: document.createElement("div")
      };
      
      var whistleblower = new Whistleblower(eventTarget, theDocument);
      var error = new Event("error");
      spyOn(error, "toString").and.returnValue("the message");
      
      whistleblower.handleEvent(error);
      
      expect(theDocument.body.firstChild.innerHTML).toBe("the message");
    });
    
    it("schedules the message to be displayed if the body of the document " + 
    "isn't loaded", function() {
      var loadingDocument = document.createElement("div");
      var whistleblower = new Whistleblower(eventTarget, loadingDocument);
      
      var error = new ErrorEvent("error");
      spyOn(error, "toString").and.returnValue("the message");
      eventTarget.dispatchEvent(error);
      
      loadingDocument.body = document.createElement("div");
      
      var load = new Event("load");
      eventTarget.dispatchEvent(load);
      
      expect(loadingDocument.body.firstChild.innerHTML).toBe("the message");
    });
    
    it("displays them on the top of the page", function() {
      var theDocument = {
        body: document.createElement("div")
      };
      
      theDocument.body.appendChild(document.createElement("br"));
      var errorPhrase = document.createElement("p");
      spyOn(document, "createElement").and.returnValue(errorPhrase);
      var whistleblower = new Whistleblower(eventTarget, theDocument);
      var error = new Event("error");
      
      whistleblower.handleEvent(error);
      
      expect(theDocument.body.firstChild).toBe(errorPhrase);
    });
    
  });
  
});
