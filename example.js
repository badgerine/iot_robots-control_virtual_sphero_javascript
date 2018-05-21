// This example file is meant to give you an idea of some of the basic
// Sphero commands. Refer to this when solving activities 1 & 2.

// var sphero = require('./sphero.js');
var sphero = require('./spheroV2.js');

// First step is to connect to Sphero
sphero.connect(function() {

  // Move Sphero a distance of 200 units at an angle of 90 degrees
  sphero.roll(1000,-20)
  // sphero.roll(10,20)

  // Get Sphero's color
  // console.log("Sphero's current color is: " + sphero.getColor());

  // Change Sphero's color
  // sphero.setColor('blue');

  // Verify Sphero's color has changed
  // console.log("Sphero's current color is: " + sphero.getColor());

  // Use the Odometer to find Sphero's position in format [x,y]
  // console.log(sphero.readOdometer());

  // Check if Sphero's state is what is expected
  // sphero.assertState(0, 200, 'blue');
});