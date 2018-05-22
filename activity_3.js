// This activity is a WIP at this stage. You are welcome to
// try it out anyway... Make sphero hit the "X" sign by using
// the roll command. You can look at exampleV2.js for clues.

var sphero = require('./spheroV2.js');

sphero.connect(function() {
  // your code goes here...
  sphero.roll(1000, -26)


});

