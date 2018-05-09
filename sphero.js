// The sphero object below mimics *some* of the basic commands
// you have access to when using the sphero.js library

module.exports =
{
    // iniitial state
    xPos: 0,
    yPos: 0,
    color: 'transparent',
    // mimic Sphero's connect method
    connect: function(work) {
        console.log("...let's roll!")
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
    roll: function (distance, direction) {
        console.log('-> moving sphero ' + distance + 'units in the ' + direction + 'direction...')
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
            console.log('color matches');
            colorMatches = true;
        } else if (color == undefined) {
            console.log('not checking color');
            colorMatches = true;
        } else {
            console.log("color doesn't match");
        }
        var position = this.readOdometer();
        if (position[0] == xPos.toFixed(2) && position[1] == yPos.toFixed(2)) {
            console.log('position matches');
            posMatches = true;
        } else {
            console.log("position doesn't match");
            console.log('Odometer reading is: ' + position);
            console.log(['expecting Sphero at: ' + xPos.toFixed(2), yPos.toFixed(2)]);
        }
        return (colorMatches && posMatches);
    }
};
