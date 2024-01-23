const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
ctx.canvas.width = CANVAS_WIDTH;
ctx.canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "black";
ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);

let x = 0;
let y = 0;
let directionX = 5;
let directionY = 5;
let prevTimestamp = 0;
let gameTime = 0;
function Draw(timestamp) {
    let delta = (timestamp - prevTimestamp);
    prevTimestamp = timestamp;

    gameTime += delta;

    if (gameTime > 30) {
        ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.fillStyle = "black";
        ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        ctx.fillStyle = "green";
        ctx.fillRect(x,y,100,100);
        x += directionX;
        y += directionY;

        if (x < 0 || x > CANVAS_WIDTH - 100)
            directionX *= -1;

        if (y < 0 || y > CANVAS_HEIGHT - 100)
            directionY *= -1;

        gameTime = 0;
    }

    requestAnimationFrame(Draw);
}

Draw(0);