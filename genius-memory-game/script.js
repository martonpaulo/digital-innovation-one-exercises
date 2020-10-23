let order = [];
let clickedOrder = [];
let score = 0;

// 0 - green
// 1 - red
// 2 - yellow
// 3 - blue

const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(order[i], elementColor, Number(i) + 1);
  }
}

let lightColor = (color, element, number) => {
  number *= 500;
  let time = 250;

  setTimeout(() => {
    element.classList.add('selected');
    playBeep(color);

    setTimeout(() => {
      element.classList.remove('selected');
    }, time);

  }, number - time);
}

let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }
  if (clickedOrder.length == order.length) {
    alert(`Score: ${score}\nVocê acertou! Iniciando próximo nível!`);
    nextLevel();
  }
}

let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add('selected');
  playBeep(color);

  setTimeout(() => {
    createColorElement(color).classList.remove('selected');
    checkOrder();
  }, 250);
}

let createColorElement = (color) => {
  if (color == 0) return green;
  else if (color == 1) return red;
  else if (color == 2) return yellow;
  else if (color == 3) return blue;
}

let nextLevel = () => {
  score++;
  shuffleOrder();
}

let gameOver = () => {
  alert(`Score: ${score}.\nGame over!\nReload the game.`);
  order = [];
  clickedOrder = [];

  playGame();
}

let playGame = () => {
  alert('Welcome to Genius! Initializing new game...');
  score = 0;
  nextLevel();
}

function playBeep (color) {
  let audio;
  
  if (color == 0) audio = new Audio('./audio/do.wav');
  else if (color == 1) audio = new Audio('./audio/re.wav');
  else if (color == 2) audio = new Audio('./audio/mi.wav');
  else if (color == 3) audio = new Audio('./audio/fa.wav');

  audio.play();
}

/*
let createPopUp = () => {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  
  overlay.innerHTML = `
    <div class="popup">
      <h2>Here i am</h2>
      <br />
      <a class="close" href="#">&times;</a>
      <div class="content">
        Thank to pop me out of that button, but now i'm done so you can close this window.
      </div>
    </div>
  `;

  document.getElementById('alerts').appendChild(overlay);
}
*/

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();