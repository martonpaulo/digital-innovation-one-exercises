const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = false;

const imgDino1 = 'url("./img/dino1.png")';
const imgDino2 = 'url("./img/dino2.png")';

let score = 0;
let speed = 10;

const gameSpeed = 2500;
const startTime = Date.now() - (gameSpeed * 10);


function handleKeyOrMouseUp (event) {

  if (isJumping) return;

  const keyCodes = [13, 32, 38];

  if (keyCodes.indexOf(event.keyCode) !== -1 || event.button == 0) {
    jump();
  }
}


function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 250) {
      // coming down
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    
    } else {
      //coming up
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}


function createCactus() {

  if (isGameOver) return;

  const cactus = document.createElement('div');
  cactus.classList.add('cactus');
  background.appendChild(cactus);

  let cactusPosition = window.innerWidth * 0.8 - 60;
  cactus.style.left = cactusPosition + 'px';  

  let randomTime = (Math.random() * gameSpeed / 2) + (speed * gameSpeed / 20);

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // left screen
      clearInterval(leftTimer);
      background.removeChild(cactus);
    
   } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = `
        <h1 class="game-over">Game over</h1>
        <h2 class="game-over">Score: ${score}</h2>
      `;

    } else {
      cactusPosition -= speed;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}


function loop() {
  setInterval(() => {
    // alternate dino images
    dino.style.backgroundImage = (dino.style.backgroundImage == imgDino1) ? imgDino2 : imgDino1;
    
    // set speed
    speed = (Date.now() - startTime) / gameSpeed;

    // set score
    if (!isGameOver) score = Math.floor(speed * 10);
  }, 200); 
}


loop();
createCactus();
document.addEventListener('keyup', handleKeyOrMouseUp);
document.addEventListener('mouseup', handleKeyOrMouseUp);