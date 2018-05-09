// In this activity, Sphero's initial position is randomized. Get Sphero
// back to (0, 0) by reading the Odometer and using the returned values.

var sphero = require('./sphero.js');

sphero.connect(function() {
  // randomizing Sphero's initial position...
  sphero.roll(Math.random() * 500, Math.random() * 360);

  // your code goes between here...

  // ... and here.

  // let's check your code...
  if (sphero.assertState(0, 0, 'red')) {
    console.log("Congrats, you've passed Activity #1!")
  } else {
    console.log("Woops! Sphero isn't quite there yet...");
  }
});

