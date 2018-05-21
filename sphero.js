// The sphero object below mimics *some* of the basic commands
// you have access to when using the sphero.js library



  var keypress = require('keypress'),
    c = require('axel'),
    interval = 100,
    tick = 0;

module.exports =
{
    // iniitial state
    xPos: 10,
    yPos: 55,
    color: '',
    // mimic Sphero's connect method
    connect: function(work) {
        console.log("...let's roll! \n")
        sphero = this
        function drawSphero(x,y){
            // c.bg(80,150,230);
            // c.line(x,y, x+2, y);
        }

        function drawBarrier(){
            c.bg(255,255,255);
            // vertical lines
            // c.brush = '||'
            c.line(1,0,1,60);
            c.line(2,0,2,60);
            c.line(168,0,168,60);
            c.line(169,0,169,60);
            // horizontal lines:
            // c.brush = '-'
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
            // c.bg(80,150,230);
            c.cursor.reset()
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
            c.cursor.off();
            c.clear();
            drawBarrier();
            gameLoop = setInterval(eachLoop, interval);
            process.stdin.setRawMode(true);
            keypress(process.stdin);
            process.stdin.resume();
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

        start();
        // work();
        // c.bg(255,255,255);
        // c.box(0,0,170,60);
        // c.scrub(4,2,164,57);
        setTimeout(function(){
            // endGame();
            // console.log(' 987654321');
        }, 1000);


        // work();
    },
    connect_random: function(work) {
        this.random_move();
        console.log("...let's roll! \n")
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
        console.log('-> moving sphero at a speed of ' + speed + ' in ' + direction + ' degrees...')
        sphero = this
        var rads = direction * ( Math.PI / 180 );
        sphero.xPos = 20;
        sphero.yPos = 20;
        // var timeInt = 500;
        // setInterval(function() {
        //     console.log('Moving sphero...');
        //     sphero.xPos += speed * timeInt * Math.cos(rads);
        //     sphero.yPos += speed * timeInt * Math.sin(rads);
        // }, timeInt);
    },
    random_move: function () {
        var distance = Math.random() * 500;
        var direction = Math.random() * 360;
        var rads = direction * ( Math.PI / 180 );
        this.xPos += distance * Math.cos(rads);
        this.yPos += distance * Math.sin(rads);
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
