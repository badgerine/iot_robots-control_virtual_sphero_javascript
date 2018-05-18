// The sphero object below mimics *some* of the basic commands
// you have access to when using the sphero.js library



  var keypress = require('keypress'),
    c = require('axel'),
    interval = 20,
    tick = 0;

module.exports =
{
    // iniitial state
    xPos: 75,
    yPos: 28,
    color: '',
    // mimic Sphero's connect method
    connect: function(work) {
        console.log("...let's roll! \n")
        sphero = this
        function drawSphero(x,y){
            c.bg(80,150,230);
            c.line(x,y, x+2, y+1);
        }

        function updateBarrier(){
            c.bg(255,255,255);
            c.box(0,0,170,60);
            c.scrub(4,2,164,57);
        }
        function updateSphero(){
            // drawSphero(75,28);
            // drawSphero(xPos,yPos);
            drawSphero(sphero.xPos,sphero.yPos);
        }

        function eachLoop(){
            tick+=1;
            width = c.cols;
            height = c.rows;
            updateBarrier();
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

        setTimeout(function(){
            start();
            // c.bg(255,255,255);
            // c.box(0,0,170,60);
            // c.scrub(4,2,164,57);

        }, 100);
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
