// Sphero V2 is here

var c = require('axel');

module.exports =
{
  // iniitial state
  color: '',
  xPos: 15.0,
  yPos: 55.0,
  lxPos: 15.0,
  lyPos: 55.0,
  speed: 0.0,
  goalX: 66,
  goalY: 30,
  direction: 0.0,
  hitTarget: false,

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
    if ((Math.abs(sphero.xPos-sphero.goalX) < 4) && (Math.abs(sphero.yPos-sphero.goalY) < 4)){
      return true
    } else {
      return false
    }
  },
  outOfBounds: function() {
    xPos = sphero.xPos
    yPos = sphero.yPos

    if ((xPos < 0) || (xPos > 170) || (yPos < 0) || (yPos > 170)){
      return true
    } else {
      return false
    }
  },
  // mimic Sphero's connect method
  connect: function(work) {

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
        }

        if(sphero.outOfBounds() == true){
          setTimeout(function() {
            c.bg(255,0,0);
            c.fg(255,255,255);
            c.text(65,1," Sphero left the building :-(");
          },250)
          setTimeout(function(){
            c.cursor.restore()
            c.clear()
            console.log("\n Please try again!")
          },1000)

        }

        if(sphero.onTarget() == true){
          sphero.hitTarget = true
          setTimeout(function(){
            c.bg(0,0,255);
            c.fg(255,255,255);
            c.text(65,1," Sphero hit the target! ");
          },250)
          setTimeout(function(){
            c.cursor.restore()
            c.clear()
            console.log("\n Congrats, you've completed Activity #3!")
          },1000)
        }

      }, 100);
  },
  setColor: function (color) {
      console.log("-> changing sphero's color to " + color + '...');
      this.color = color;
  },
};
