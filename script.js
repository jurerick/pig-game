'use strict';
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const maxScore = 100;
let currentPlayer = 0;

const newGame = () => {
  currentPlayer = 0;
  document.querySelectorAll('.current-score').forEach((item) => {
    item.textContent = 0;
  });
  document.querySelectorAll('.score').forEach((item) => {
    item.textContent = 0;
  });
  changePlayer(0);

  document.querySelectorAll(`.player`).forEach((item) => {
    item.classList.remove('player--winner');
  })
  rollBtn.removeAttribute('disabled');
  holdBtn.removeAttribute('disabled');
}

const rollDice = () => {
  const diceResult = Math.floor(Math.random() * (6 - 1)) + 1;
  if(diceResult === 1) {
    displayDice(diceResult);
    saveCurrentScore(0);
    changePlayer();
  }
  else {
    displayDice(diceResult);
    saveCurrentScore(diceResult);
  }
}

const hold = () => {
  let playerScore = parseInt(
    document.getElementById(`score--${currentPlayer}`).textContent
  );

  const currentScore = parseInt(
    document.getElementById(`current--${currentPlayer}`).textContent
  );

  playerScore = playerScore + currentScore;
  document.getElementById(`score--${currentPlayer}`).textContent =
      playerScore;

  saveCurrentScore(0);
  if(playerScore >= maxScore) {
    setWinner();
  }
  else {
    changePlayer();
  }
}

const setWinner = () => {
  dice.classList.add('hide');
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--winner');
  rollBtn.setAttribute('disabled', 'disabled');
  holdBtn.setAttribute('disabled', 'disabled');
}

const changePlayer = (player) => {
  if(player === 0 || player === 1) {
    currentPlayer = player;
  } else {
    currentPlayer = (currentPlayer === 0)? 1: 0;
  }
  
  document.querySelector('.player--active').classList.remove('player--active');
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--active');
}

const displayDice = (num) => {
  dice.setAttribute('src', `dice-${num}.png`);
  dice.classList.remove('hide');
}

const saveCurrentScore = (num) => {
  const currentPlayerScore = document.getElementById(`current--${currentPlayer}`);
  if(num !== 0 && num > 1) {
    currentPlayerScore.textContent = parseInt(currentPlayerScore.textContent) + num;
  } else {
    currentPlayerScore.textContent = 0; 
  }
}

rollBtn.addEventListener('click', () => rollDice());
holdBtn.addEventListener('click', () => hold());
newBtn.addEventListener('click', () => newGame());
