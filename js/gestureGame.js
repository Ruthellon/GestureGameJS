const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
ctx.canvas.width = CANVAS_WIDTH;
ctx.canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);

let x = 0;
let y = 0;
let directionX = 1;
let directionY = 1;
let prevTimestamp = 1000;
let gameTime = 0;
function Draw(timestamp) {

    //ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
    // if ((Rune.gameTime() / 1000) >= startDelay)
    //     ctx.fillStyle = "green";
    // else
    //     ctx.fillStyle = "red";
    // ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);



    // requestAnimationFrame(Draw);
}
var playerID;
// client.js
Rune.initClient({
    onChange: ({
      game,
      previousGame,
      futureGame,
      yourPlayerId,
      players,
      action,
      event,
      rollbacks,
    }) => {
      render(game)
    },
  });

var startDelay = 0;
function render(game) {
    
    startDelay = game.delay;
    Draw(0);
}

let isDrawing = false;
canvas.addEventListener("mousedown", (event) => {
    isDrawing = true;
    drawLine(event);
  });

  canvas.addEventListener("mousemove", (event) => {
    if (isDrawing) {
        drawLine(event);
    }
  });

  canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    ctx.beginPath();
  });

  function drawLine(event) {
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;

    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }