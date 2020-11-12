let player, winner = null;
let selectedPlayer = document.getElementById('selected-player');

changePlayer('X');


function selectSquare (id) {
  if (winner != null) return;

  let square = document.getElementById(id);
  if (square.innerHTML !== '-') return;

  square.innerHTML = player;
  square.style.color = '#000';

  player = player === 'X' ? 'O' : 'X';
  changePlayer(player);

  checkWinner();
}


function changePlayer (value) {
  player = value;
  selectedPlayer.innerHTML = player;
}


function checkWinner() {
  let squares = [];

  for (let i = 1; i <= 9; i++)
    squares.push(document.getElementById(i));

  let squaresToCheck;
  
  // horizontal
  for (let i = 0; i < 3; i++) {
    squaresToCheck = [squares[i*3], squares[i*3+1], squares[i*3+2]];
    if (checkSequence(squaresToCheck)) {
      changeColor(squaresToCheck);
      changeWinner(squaresToCheck[0]);
      return;
    }
  }

  // vertical
  for (let i = 0; i < 3; i++) {
    squaresToCheck = [squares[i], squares[i+3], squares[i+6]];
    if (checkSequence(squaresToCheck)) {
      changeColor(squaresToCheck);
      changeWinner(squaresToCheck[0]);
      return;
    }
  }

  // crossed
  squaresToCheck = [squares[0], squares[4], squares[8]];
  if (checkSequence(squaresToCheck)) {
    changeColor(squaresToCheck);
    changeWinner(squaresToCheck[0]);
    return;
  }

  squaresToCheck = [squares[2], squares[4], squares[6]];
  if (checkSequence(squaresToCheck)) {
    changeColor(squaresToCheck);
    changeWinner(squaresToCheck[0]);
    return;
  }

  // all squares are filled
  if (checkAllFilled(squares))
    changeWinner(null);

}


function changeWinner (square) {

  let wrapper = document.querySelector('.wrapper');
  let playerDiv = document.querySelector('.player');
  wrapper.removeChild(playerDiv);

  let finalDiv = document.createElement('div');

  if (square != null) {
    finalDiv.innerHTML = `
      <div class="winner">
        <label>Winner: ${square.innerHTML}</label>
        <label id="selected-winner"></label>
      </div>
    `;

  } else {
    finalDiv.innerHTML = `
      <div class="winner">
        <label>Tie!</label>
      </div>
    `;
  }

  finalDiv.innerHTML += `
    <div>
      <button class="hvr-grow" onclick="restart()">Restart</button>
    </div>
  `;

  wrapper.appendChild(finalDiv);
}


function changeColor (squares) {
  for (let i = 0; i < 3; i++)
    squares[i].style.background = '#0F0';
}


function checkSequence (squares) {
  if (squares[0].innerHTML === '-') return false;
  else if (squares[0].innerHTML !== squares[1].innerHTML) return false;
  else if (squares[1].innerHTML !== squares[2].innerHTML) return false;
  else return true;
}


function checkAllFilled (squares) {
  for (let square of squares)
    if (square.innerHTML === '-')
      return false;
  return true;
}


function restart() {
  window.location.reload();
}