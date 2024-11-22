// Хэмжээ өгөх
let headY = 5;
let headX = 4;

let foodY;
let foodX;

let direction = "right";
let nextDirection = direction;

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
  headY = headY - 1;
  if (headY < 0) {
    alert("You dead");
    restartGame();
  }
}

// Баруун тийш явуулах

function goRight() {
  headX = headX + 1;
  if (headX === config.width) {
    alert("You dead");
    restartGame();
  }
}

// Доошоо явуулах

function goDown() {
  headY = headY + 1;
  if (headY === config.height) {
    alert("You dead");
    restartGame();
  }
}

// Зүүн тийш явуулах

function goLeft() {
  headX = headX - 1;
  if (headX < 0) {
    alert("You dead");
    restartGame();
  }
}

// Чиглэлээ өөрлөх товч ажлуулах

function changeDirection(newDirection) {
  if (nextDirection === "up" || nextDirection === "down") {
    if (newDirection === "right" || newDirection === "left") {
      nextDirection = newDirection;
    }
  } else if (nextDirection === "right" || nextDirection === "left") {
    if (newDirection === "up" || newDirection === "down") {
      nextDirection = newDirection;
    }
  }
}
// Хөдөлгөх

function gameLoop() {
  switch (nextDirection) {
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

  tails.push({ x: headX, y: headY });
  tails.shift();
  for (let i = 0; i < tails.length - 1; i++) {
    if (headX === tails[i].x && headY === tails[i].y) {
      alert("Game over");
      restartGame();
    } else if (headX === tails[i].x && headY === tails[i].y) {
      alert("Game over");
      restartGame();
    }
  }
  if (headX === foodX && headY === foodY) {
    tails.push({ x: headX, y: headY });
    generateFood();
  }

  render();
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
  foodY = Math.floor(Math.random() * config.height);
  return foodX, foodY;
}

function startGame() {
  if (!intervalValid) {
    intervalValid = setInterval(gameLoop, 100);
    generateFood();
  }
  render();
}

function pauseGame() {
  clearInterval(intervalValid);
  intervalValid = null;
}

function reset() {
  (headY = 5), (headX = 5);
}

function restartGame() {
  headY = 5;
  headX = 5;
  tails = [
    { x: 2, y: 5 },
    { x: 3, y: 5 },
    { x: 4, y: 5 },
  ];
  nextDirection = "right";
  generateFood();
}
function resumeGame() {}

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
