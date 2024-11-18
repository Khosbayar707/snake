// Хэмжээ өгөх
let headTop = 10;
let headLeft = 12;
let direction = "up";

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

// Зүүн тийш

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

setInterval(gameLoop, 300);

function gameLoop() {
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

// Могой оруулах
function render() {
  const snakeHTML = `<div class="snake" style="width: ${
    1 * config.size
  }px; height: ${1 * config.size}px; top: ${headTop * config.size}px; left: ${
    headLeft * config.size
  }px"></div>`;
  boardEl.innerHTML = snakeHTML;
}
render();
