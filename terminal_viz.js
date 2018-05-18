'use strict';

  //Requires
  var keypress = require('keypress')
    , c = require('axel')
    , int = parseInt
    , sin = Math.sin
    , width = c.cols
    , height = c.rows
    , gameLoop
    , interval = 20
    , tick =0
    , enemies = []
    , maxEnemies = 24
    , enemySpeed = 0.025
    ;

    var theBrush = ' ';


  genEnemies();
  function genEnemies(){
    for (var y=0; y< c.rows; y+=3){
      for (var x=0; x< c.cols*0.75; x+=4){
        enemies.push({
          x: 2+x,
          y: y
        });
        if (enemies.length>=maxEnemies) {
          return;
        }
      }
    }
  }

  function updateBarrier(){
    c.bg(255,255,255);
    c.box(0,0,170,60);
    c.scrub(4,2,164,57);
  }

  function updateSphero(){
    drawSphero(75,28);
  }

  function updateEnemies(){
    enemies.forEach(function(enemy){
      enemy.ly = enemy.y;
      enemy.lx = enemy.x;
      enemy.y+=enemySpeed;
      enemy.x=enemy.x+(sin(tick/10)/1.5);

      // Only draw enemies again if they have moved
      if(int(enemy.y)!==int(enemy.ly) ||
          int(enemy.x)!==int(enemy.lx))
        {
          c.cursor.reset();
          c.brush = ' ';
          drawEnemy(int(enemy.lx), int(enemy.ly));

          c.bg(255,0,0);
          c.brush = theBrush;
          drawEnemy(int(enemy.x), int(enemy.y));
      }
    });
  }

  function drawSphero(x,y){
    c.bg(80,150,230);
    c.line(x,y, x+2, y+1);
  }

  function drawEnemy(x,y){
    c.line(x-1, y, x+1, y);
    c.line(x-1, y, x-1, y+2);
    c.line(x+1, y, x+1, y+2);
  }

  function eachLoop(){
    tick+=1;

    width = c.cols;
    height = c.rows;

    updateBarrier();
    updateSphero();
    // updateEnemies();
  }

  //// GAME LOOP LOGIC ///////////////////////////////////////////////////////

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

  start();

  //// KEYBOARD EVENTS ///////////////////////////////////////////////////////

process.stdin.on('keypress', function (ch, key) {

  if (key) {
    if (key.name == 'escape') endGame();
    if (key.name == 'q') endGame();
  }

  if (key && key.ctrl && key.name == 'c') {
    endGame();
  }

});