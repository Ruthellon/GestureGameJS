const GAME_WIDTH = 320;
const GAME_RENDERED_HEIGHT = 600;

const { canvas, context } = setupCanvas();

const recognizer = new DollarRecognizer();

var game;

var Rune;
var previousDelay = 0;
window.onload = function () {
  let triggered = false;
  let lastTimeStamp = 0;
  let timeElapsed = 0;
  document.body.appendChild(canvas);

  if (Rune) {
    Rune.initClient({
      onChange: (params) => {
        game = params.game;

        if (game.delay !== previousDelay) {
          triggered = false;
          timeElapsed = 0;
        }

        previousDelay = game.delay;
      },
    });
  }
  else {
    game = newGame();
  }

  var points = [];

  let isDrawing = false;

  let startTime = 0;
  window.addEventListener("pointerdown", (event) => {
    points = [];
    startTime = document.timeline.currentTime;

    if (Rune)
      Rune.actions.startedDrawing(triggered);

    isDrawing = true;
    context.beginPath();
    drawLine(event);
  });

  window.addEventListener("pointermove", (event) => {
    if (isDrawing) {
        drawLine(event);
    }
  });
  
  window.addEventListener("pointerup", () => {
    if (isDrawing)
      finishedDrawing();
  });


  function finishedDrawing() {
    isDrawing = false;
    context.beginPath();
    let drawTime = document.timeline.currentTime - startTime;
    let result = recognizer.RecognizeShape(points, false, game.drawing);
    if (result.Name !== recognizer.Unistrokes[game.drawing].Name){
      result.Score = 0;
    }

    console.log(result.Name);
    
    if (Rune) {
      Rune.actions.finishedDrawing({
        score: result,
        drawTime: drawTime
      });
    }
    else {
      alert(Math.floor((result.Score * 100) - (drawTime / 1000)));
      game = newGame();
      triggered = false;
      timeElapsed = 0;
    }
  }

  function drawLine(event) {
    const x = getX(event);
    const y = getY(event);

    let point = new Point(x, y);
    points.push(point);

    context.lineWidth = 3;
    context.lineCap = "round";
    context.strokeStyle = "#000";

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
  }

  function getX(event) {
    return ((event.clientX || event.touches[0].clientX) - canvas.getBoundingClientRect().left) / (window.innerWidth / GAME_WIDTH);
  }

  function getY(event) {
    return ((event.clientY || event.touches[0].clientY) - canvas.getBoundingClientRect().top) / (window.innerHeight / GAME_RENDERED_HEIGHT);
  }

  function draw(timestamp) {
    let deltaTime = timestamp - lastTimeStamp;
    lastTimeStamp = timestamp;
    timeElapsed += deltaTime;
    if (game && triggered === false) {
      context.fillStyle = "red";
      context.fillRect(0,0, GAME_WIDTH, GAME_RENDERED_HEIGHT);

      if ((timeElapsed / 1000) >= game.delay) {
        triggered = true;
        context.fillStyle = "green";
        context.fillRect(0,0, GAME_WIDTH, GAME_RENDERED_HEIGHT);

        context.strokeStyle = "rgba(206, 1, 132, 1)";
        context.fillStyle = "rgba(206, 1, 132, 1)";

        context.stroke();

        context.font = "400 50px Poppins";
        context.textAlign = "center";
        context.fillText(recognizer.Unistrokes[game.drawing].Name, 100, 50);

        drawShape();
      }
    }
    requestAnimationFrame(draw);
  }

    function drawShape() {
        context.lineWidth = 3;
        context.lineCap = "round";
        context.strokeStyle = "#000";
        recognizer.Unistrokes[game.drawing].OriginalPoints.forEach((point) => {

            let x = point.X; //(point.X - canvas.getBoundingClientRect().left) / (window.innerWidth / GAME_WIDTH);
            let y = point.Y; //(point.Y- canvas.getBoundingClientRect().top) / (window.innerHeight / GAME_RENDERED_HEIGHT);

            //console.log(point.X + ', ' + point.Y)
            //console.log(x + ', ' + y);

            context.lineWidth = 3;
            context.lineCap = "round";
            context.strokeStyle = "#000";

            context.lineTo(x, y);
            context.stroke();
            context.beginPath();
            context.moveTo(x, y);
        });
    }
  draw(0);
}

function newGame() {
  return {
    delay: Math.random() * (4 - 1) + 1,
    drawing: Math.floor(Math.random() * 16)
  }
}

function setupCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const scaleX = window.innerWidth / GAME_WIDTH;
  const scaleY = window.innerHeight / GAME_RENDERED_HEIGHT;

  canvas.style.height = "100vh";
  canvas.style.width = "100vw";
  
  const context = canvas.getContext("2d");

  context.scale(scaleX, scaleY);

  context.fillStyle = "red";
  context.fillRect(0,0, GAME_WIDTH, GAME_RENDERED_HEIGHT);

  return {
    canvas,
    context,
  };
}

function fittingString(c, str,maxWidth) {
  let width = c.measureText(str).width
  const ellipsis = "…"
  const ellipsisWidth = c.measureText(ellipsis).width
  if (width <= maxWidth || width <= ellipsisWidth) {
    return str
  } else {
    let len = str.length
    while (width >= maxWidth - ellipsisWidth && len-- > 0) {
      str = str.substring(0, len)
      width = c.measureText(str).width
    }
    return str + ellipsis
  }
}