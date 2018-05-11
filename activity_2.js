// In this activity, Sphero's initial position is randomized. Get Sphero
// back to (0, 0) by reading the Odometer and using the returned values.

var sphero = require('./sphero.js');

sphero.connect_random(function() {
  // your code goes between here...


  // let's check your code...
  if (sphero.assertState(0, 0)) {
    console.log("\nCongrats, you've completed Activity #2!")
  } else {
    console.log("\nWoops! Sphero isn't quite there yet...");
  }
});

