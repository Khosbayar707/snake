// Хэмжээ өгөх
let headTop = 5;
let headLeft = 5;

let foodY;
let foodX;

let direction = "right";

let tails = [
  { x: 2, y: 5 },
  { x: 3, y: 5 },
  { x: 4, y: 5 },
];
let intervalValid = null;

const config = { size: 20, width: 30, height: 20 };
const boardEl = document.getElementById("board");
boardEl.style.width = config.width * config.size + "px";
boardEl.style.height = config.height * config.size + "px";

// Дээшээ явуулах
function goUp() {
  headTop = headTop - 1;
  if (headTop < 0) {
    headTop = config.height - 1;
  }
  render();
}

// Баруун тийш явуулах

function goRight() {
  headLeft = headLeft + 1;
  if (headLeft === config.width) {
    headLeft = 0;
  }
  render();
}

// Доошоо явуулах

function goDown() {
  headTop = headTop + 1;
  if (headTop === config.height) {
    headTop = 0;
  }
  render();
}

// Зүүн тийш явуулах

function goLeft() {
  headLeft = headLeft - 1;
  if (headLeft < 0) {
    headLeft = config.width - 1;
  }
  render();
}

// Чиглэлээ өөрлөх товч ажлуулах

function changeDirection(newDirection) {
  if (direction === "up" || direction === "down") {
    if (newDirection === "right" || newDirection === "left") {
      direction = newDirection;
    }
  } else if (direction === "right" || direction === "left") {
    if (newDirection === "up" || newDirection === "down") {
      direction = newDirection;
    }
  }
}
// Хөдөлгөх

function gameLoop() {
  tails.push({ x: headLeft, y: headTop });
  tails.shift();
  switch (direction) {
    case "up":
      goUp();
      break;
    case "right":
      goRight();
      break;
    case "down":
      goDown();
      break;
    case "left":
      goLeft();
      break;
  }
}
function listenKeys(event) {
  const key = event.code;
  switch (key) {
    case "ArrowUp":
      changeDirection("up");
      break;
    case "ArrowDown":
      changeDirection("down");
      break;
    case "ArrowRight":
      changeDirection("right");
      break;
    case "ArrowLeft":
      changeDirection("left");
      break;
  }
}
document.addEventListener("keydown", listenKeys);

document.addEventListener("keydown", listenSpace);
function listenSpace(event) {
  if (event.code === "Space") {
    if (intervalValid) {
      pauseGame();
    } else {
      startGame();
    }
  }
}

function generateFood() {
  foodX = Math.floor(Math.random() * config.width);
  foodY = math.floor(Math.random() * config.height);
}

function startGame() {
  if (!intervalValid) {
    intervalValid = setInterval(gameLoop, 200);
  }
  render();
}

function pauseGame() {
  clearInterval(intervalValid);
  intervalValid = null;
}

function reset() {
  (headTop = 5), (headLeft = 5);
}

function restartGame() {
  headTop = 5;
  headLeft = 5;
  tails = [
    { x: 2, y: 5 },
    { x: 3, y: 5 },
    { x: 4, y: 5 },
  ];
  generateFood();
}

// Могой оруулах
function render() {
  let tailsHTML = "";
  let foodHTML = "";
  for (let i = 0; i < tails.length; i++) {
    tailsHTML += `<div class="snake" style="width: ${
      1 * config.size
    }px; height: ${1 * config.size}px; top: ${
      tails[i].y * config.size
    }px; left: ${tails[i].x * config.size}px"></div>`;
    foodHTML += `<div class="food" style="width: ${
      1 * config.size
    }px; height: ${1 * config.size}px; top: ${foodY * config.size}px; left: ${
      foodX * config.size
    }px"></div>`;
  }
  let snakeHTML = `${tailsHTML} ${foodHTML}`;
  boardEl.innerHTML = snakeHTML;
}
