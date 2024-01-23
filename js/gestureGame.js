const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerWidth;
ctx.canvas.width = CANVAS_WIDTH;
ctx.canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "black";
ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);

let x = 0;
let y = 0;
function Draw(timestamp) {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "black";
    ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    ctx.fillStyle = "green";
    ctx.fillRect(x,y,100,100);
    x++;
    y++;
    requestAnimationFrame(Draw);
}

Draw(0);