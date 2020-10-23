let order = [];
let clickedOrder = [];
let score = 0;
let gameStarted = false;
let isGameOver = false;

// 0 - green
// 1 - red
// 2 - yellow
// 3 - blue

const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

const menu = document.querySelector('.menu');
const startButton = document.querySelector('.start-button');


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
      isGameOver = true;
      gameOver();
      break;
    }
  }

  if (!isGameOver && clickedOrder.length == order.length) {
    const oldScore = document.querySelector('.score-text');
    menu.removeChild(oldScore);
    createScoreMenu();
    
    sleep(2000).then(() => {
      nextLevel();
    });
  }
}


let click = (color) => {
  playBeep(color);

  if (gameStarted) {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
  
    setTimeout(() => {
      createColorElement(color).classList.remove('selected');
      checkOrder();
    }, 250);
  }
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
  for (let i = 0; i < 4; i++) {
    sleep(i * 150).then(() => {
      playBeep(3 - i);
    });
  }

  sleep(1000).then(() => {
    alert(`Game over!\nScore: ${score - 1}\nReload the page.`);
    window.location.reload();
  });
}


let sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}


let createScoreMenu = () => {
  const scoreP = document.createElement('p');
  const scoreText = document.createTextNode(`Score: ${score}`);
  scoreP.className += ' score-text';
  
  scoreP.appendChild(scoreText);
  menu.appendChild(scoreP);
}


let playGame = () => {
  gameStarted = true;

  for (let i = 0; i < 4; i++) {
    sleep(i * 150).then(() => {
      playBeep(i);
    });
  }

  sleep(1500).then(() => {
    score = 0;
    menu.removeChild(startButton);
    createScoreMenu();
  });

  sleep(2500).then(() => {
    nextLevel();
  });
}


function playBeep (color) {
  let audio;
  
  if (color == 0) audio = new Audio('./audio/do.wav');
  else if (color == 1) audio = new Audio('./audio/re.wav');
  else if (color == 2) audio = new Audio('./audio/mi.wav');
  else if (color == 3) audio = new Audio('./audio/fa.wav');

  audio.play();
}


green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


startButton.onclick = () => playGame();