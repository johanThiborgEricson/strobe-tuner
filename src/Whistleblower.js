function Whistleblower(theWindow, theDocument) {
  theWindow.addEventListener("error", this);
  this.myWindow = theWindow;
  this.myDocument = theDocument;
}

Whistleblower.prototype
.handleEvent = function(e) {
  if(e.type == "error") {
    var errorMessage = document.createElement("p");
    errorMessage.innerHTML = e.toString();
    this.errorMessage = errorMessage;
  }
  
  var body = this.myDocument.body;
  if(body){
    body.insertBefore(this.errorMessage, body.firstChild);
  } else {
    this.myWindow.addEventListener("load", this);
  }
};