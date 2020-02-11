//Elements
var displayElem = $("#random-number");

//Global Variables
var message = "Testing, Testing One Two There";
var challengeMSG =
  "Hello, this is a test to see if i am able to capture a whole body of strings and out put ";
var test = document.getElementById("random-number");
var speed = 80;
var x = 0;

//Create Object Class for typewriter

typeWriter = {
  counter: 0,
  message: "",
  element: "",

  SetMessage: function(_message, _element) {
    this.message = _message;
    this.element = _element;
  }
};

writerOutput = function() {
  console.log("hello " + this.counter + this.message.length);

  if (this.counter < this.message.length) {
    this.element.innerHTML += this.message.charAt(this.counter);
    this.counter++;

    setTimeout(typeOutput, speed);
  } else {
    this.counter = 0;
  }
};

//Bind typeoutput to typewriter variables
var typeOutput = writerOutput.bind(typeWriter);

//   function typeWriter() {
//     if (i < txt.length) {
//       document.getElementById("random-number").innerHTML += txt.charAt(i);
//       i++;
//       setTimeout(typeWriter, speed);
//     }
//   }

$(document).ready(function() {
  $("#random-button").on("click", function() {
    typeWriter.SetMessage(message, test);
    typeOutput();
  });
});
