// The sphero object below mimics *some* of the basic commands
// you have access to when using the sphero.js library

var keypress = require('keypress'),
c = require('axel'),
interval = 100,
tick = 0;

module.exports =
{
  // iniitial state
  xPos: 15.0,
  lxPos: 15.0,
  lyPos: 55.0,
  yPos: 55.0,
  speed: 0.0,
  direction: 0.0,
  color: '',
  goalX: 120,
  goalY: 20,
  // rolling: true,

  draw: function() {
    c.cursor.reset()
    c.cursor.off()
    c.brush = ' '
    c.point(sphero.lxPos, sphero.lyPos)

    c.fg(80,150,230);
    c.brush = '0'
    c.point(sphero.xPos, sphero.yPos)
  },
  hitTarget: function() {
    if ((Math.abs(sphero.xPos-sphero.goalX) < 6) && (Math.abs(sphero.yPos-sphero.goalY) < 6)){
      return true
    } else {
      return false
    }
  },
  // mimic Sphero's connect method
  connect: function(work) {
      console.log("...let's roll! \n")
      sphero = this

      function drawGoal(){
          c.fg(230,0,0);
          var goalX = sphero.goalX
          var goalY = sphero.goalY

          c.brush = '/'
          c.point(goalX - 2, goalY + 2)
          c.point(goalX - 1, goalY + 1)
          c.point(goalX, goalY)
          c.point(goalX + 1, goalY - 1)
          c.point(goalX + 2, goalY - 2)
          c.point(goalX + 3, goalY - 3)

          c.brush = '\\'
          c.point(goalX - 2, goalY - 3)
          c.point(goalX - 1, goalY - 2)
          c.point(goalX, goalY - 1)
          c.point(goalX + 1, goalY)
          c.point(goalX + 2, goalY + 1)
          c.point(goalX + 3, goalY + 2)
      }
      function drawBarrier(){
          c.bg(255,255,255);
          // vertical lines
          c.line(1,0,1,60);
          c.line(2,0,2,60);
          c.line(168,0,168,60);
          c.line(169,0,169,60);
          // horizontal lines:
          c.line(0,0,170,0);
          c.line(0,60,170,60);
      }

      drawBarrier()
      drawGoal()
      work();
  },
  readOdometer: function () {
      console.log("-> receiving sphero's coordinates from the odometer...");
      var x = parseFloat(this.xPos.toFixed(2));
      var y = parseFloat(this.yPos.toFixed(2));
      return [x,y];
  },
  getColor: function () {
      return this.color;
  },
  roll: function (speed, direction) {
      // console.log('-> moving sphero at a speed of ' + speed + ' in ' + direction + ' degrees...')
      sphero = this
      speed = speed/100
      var rads = direction * ( Math.PI / 180 );

      var interval = setInterval(function () {
        sphero.lxPos = sphero.xPos
        sphero.lyPos = sphero.yPos
        sphero.xPos += speed * Math.cos(rads)
        sphero.yPos += speed * Math.sin(rads)

        if(sphero.hitTarget() == true){
          clearInterval(interval)
        }
        sphero.draw()
      }, 100);
  },
  setColor: function (color) {
      console.log("-> changing sphero's color to " + color + '...');
      this.color = color;
  },
  assertState: function (xPos, yPos, color) {
      var colorMatches = false
      var posMatches = false
      xPos = parseFloat(xPos);
      yPos = parseFloat(yPos);

      console.log('-> asserting that sphero is ' + color + ' and at ' + '[' + xPos + ',' + yPos + ']...')

      if (this.color == color) {
          console.log('Color matches');
          colorMatches = true;
      } else if (color == undefined) {
          console.log('Not checking color');
          colorMatches = true;
      } else {
          console.log("Color doesn't match");
      }
      var position = this.readOdometer();
      if (position[0] == xPos.toFixed(2) && position[1] == yPos.toFixed(2)) {
          console.log('Position matches');
          posMatches = true;
      } else {
          console.log("Position doesn't match");
          console.log('Odometer reading is: ' + position);
          console.log('Expecting Sphero at: ' + [xPos.toFixed(2), yPos.toFixed(2)]);
      }
      return (colorMatches && posMatches);
  }
};
