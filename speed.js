// var myInt =
  // setInterval(function () {
    // console.log("Hello");
  // }, 1000);

// This example file is meant to give you an idea of some of the basic
// Sphero commands. Refer to this when solving activities 1 & 2.

var sphero = require('./sphero.js');

var ctx = require('axel');


setInterval(function() {
  // Clear the terminal
  ctx.clear();
  // Sets the pixel BG color to green
  ctx.bg(0,255,0);
  // Draws a line into the console
  ctx.line(1,1,10,10);

}, 100);



// First step is to connect to Sphero
// sphero.connect(function() {
//   sphero.roll(200,30)
// });





// // This example file is meant to give you an idea of some of the basic
// // Sphero commands. Refer to this when solving activities 1 & 2.

// var sphero = require('./sphero.js');

// // First step is to connect to Sphero
// sphero.connect(function() {

//   // Move Sphero a distance of 200 units at an angle of 90 degrees
//   sphero.roll(200,90)

//   // Get Sphero's color
//   console.log("Sphero's current color is: " + sphero.getColor());

//   // Change Sphero's color
//   sphero.setColor('blue');

//   // Verify Sphero's color has changed
//   console.log("Sphero's current color is: " + sphero.getColor());

//   // Use the Odometer to find Sphero's position in format [x,y]
//   console.log(sphero.readOdometer());

//   // Check if Sphero's state is what is expected
//   sphero.assertState(0, 200, 'blue');
// });