// The sphero object below mimics *some* of the basic commands
// you have access to when using the sphero.js library



var keypress = require('keypress'),
c = require('axel'),
interval = 100,
tick = 0;

module.exports =
{
// iniitial state
xPos: 10.0,
yPos: 55.0,
speed: 0.0,
direction: 0.0,
color: '',

draw: function() {
  c.cursor.reset()
  c.fg(80,150,230);
  c.brush = '0'
  c.point(sphero.xPos, sphero.yPos)
},
// mimic Sphero's connect method
connect: function(work) {
    console.log("...let's roll! \n")
    sphero = this
    function drawSphero(x,y){
        // c.bg(80,150,230);
        // c.line(x,y, x+2, y);
    }

    function drawGoal(){
        // c.cursor.reset()
        // c.bg(255,255,255);
        c.fg(230,0,0);
        var goalX = 40
        var goalY = 20

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
    function updateSphero(){

        var lx = sphero.xPos
        var ly = sphero.yPos
        sphero.xPos += 1
        sphero.yPos -= 1
        // drawSphero(sphero.xPos,sphero.yPos);
        // drawSphero(tick,tick);
        c.cursor.reset()
        c.brush = ' '
        c.point(lx, ly)

        // c.brush = theBrush
        // c.clear()
        // c.fg(80,150,230);
        c.cursor.reset()
        c.fg(80,150,230);
        c.brush = '0'
        c.point(sphero.xPos, sphero.yPos)

        // Draw off
        // c.cursor.reset();
        // c.brush = ' ';
        // c.point(bullet.lx, bullet.ly);

        // // Draw on
        // c.brush = theBrush;
        // c.bg(0,255,0);
        // c.point(bullet.x, bullet.y);
    }

    function eachLoop(){
        tick+=1;
        // width = c.cols;
        // height = c.rows;
        updateSphero();
      }

    function endGame(){
        process.stdin.pause();
        clearInterval(gameLoop);
        c.cursor.on();
        c.cursor.restore();
      }

    function start(){
        work()
        c.cursor.off()
        c.clear()
        drawBarrier()
        drawGoal()
        gameLoop = setInterval(eachLoop, interval)
        process.stdin.setRawMode(true)
        keypress(process.stdin)
        process.stdin.resume()
    }
    process.stdin.on('keypress', function (ch, key) {

      if (key) {
        if (key.name == 'escape') endGame();
        if (key.name == 'q') endGame();
      }

      if (key && key.ctrl && key.name == 'c') {
        endGame();
      }

    });


    drawBarrier()
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

    // sphero.speed = speed
    // sphero.direction =

    // console.log('-> moving sphero at a speed of ' + speed + ' in ' + direction + ' degrees...')
    sphero = this
    speed = speed/100
    var rads = direction * ( Math.PI / 180 );
    var timeInt = 500;
    setInterval(function() {
        // console.log('Moving sphero...');
        // console.log("speed: " + speed)
        // console.log("speed: " + speed)
        // console.log("timeInt%500: " + (timeInt % 500))
        // console.log("timeInt: " + (timeInt))
        // console.log("cos: " + Math.cos(rads))
        // console.log("sin: " + Math.sin(rads))

        sphero.xPos += speed * Math.cos(rads)
        sphero.yPos += speed * Math.sin(rads)
        // console.log(sphero.xPos)
        // console.log(sphero.yPos)
        sphero.draw()
    }, timeInt);
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
