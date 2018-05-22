// This is exmaple uses Sphero V2! It's not quite ready yet,
// but if you see this and you want to try it out...

var sphero = require('./spheroV2.js');

// First step is to connect to Sphero
sphero.connect(function() {

  // Move Sphero at a speed of 200 units at an angle of -30 degrees
  sphero.roll(200,-30)

});