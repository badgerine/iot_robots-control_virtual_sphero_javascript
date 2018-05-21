// The sphero object below mimics *some* of the basic commands
// you have access to when using the sphero.js library

var c = require('axel'),
interval = 100,
tick = 0;

module.exports =
{
  // iniitial state
  color: '',
  xPos: 15.0,
  yPos: 55.0,
  lxPos: 15.0,
  lyPos: 55.0,
  speed: 0.0,
  goalX: 120,
  goalY: 20,
  direction: 0.0,
  hitTarget: false,

  madeIt: function() {
    c.line(80, 40, 120, 70);
  },
  draw: function() {
    c.cursor.reset()
    c.cursor.off()
    c.brush = ' '
    c.point(sphero.lxPos, sphero.lyPos)

    c.fg(80,150,230);
    c.brush = '0'
    c.point(sphero.xPos, sphero.yPos)
  },
  onTarget: function() {
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
  roll: function (speed, direction) {
      // console.log('-> moving sphero at a speed of ' + speed + ' in ' + direction + ' degrees...')
      sphero = this
      speed = speed/100
      var rads = direction * ( Math.PI / 180 );

      var interval = setInterval(function () {

        if(sphero.hitTarget == false) {
          sphero.lxPos = sphero.xPos
          sphero.lyPos = sphero.yPos
          sphero.xPos += speed * Math.cos(rads)
          sphero.yPos += speed * Math.sin(rads)
          sphero.draw()
        } else {

        }

        if(sphero.onTarget() == true){
          // clearInterval(interval)
          sphero.hitTarget = true
          // sphero.madeIt()
          // c.clear()
          // clearInterval(interval)
          // console.log('whhheeeeee')
          setTimeout(function(){
            // c.bg =

            console.log('YOU WON')
            c.cursor.reset()
            c.cursor.off()
            c.brush = ' '
            c.bg(0,0,60);
            c.box(0,0,170,60);

            // clearInterval(interval)

          },200)
        }

      }, 100);
  },
  setColor: function (color) {
      console.log("-> changing sphero's color to " + color + '...');
      this.color = color;
  },
};
