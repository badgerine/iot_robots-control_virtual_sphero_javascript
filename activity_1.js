// In this activity you have to move Sphero to
// (0, 200) and change it's color to "Blue".

var sphero = require('./sphero.js');

sphero.connect(function() {
  // your code goes here
  sphero.roll(200,90);
  sphero.setColor('blue');

  // let's check your code...
  if (sphero.assertState(0.00, 200.00, 'blue')) {
    console.log("\nCongrats, you've completed Activity #1!")
  } else {
    console.log("\nWoops! Sphero isn't quite there yet...");
  }
});

