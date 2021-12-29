'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1'); // another way to get by ID, supposed to be a little bit faster
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  // Starting conditions

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset the scores to 0
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;

  diceElement.classList.add('hidden');
  // Remove the winning state
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  // Remove the active state
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  // Reset the current player score to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Reset the current score of the next player to 0
  currentScore = 0;
  // Switch to the next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Toggle the player active class
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // When playing is true do the following : do nothing
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;
    // 3. Check for rolled 1: if true, swicth to the next player
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice; // Same as currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Hold button functionality
btnHold.addEventListener('click', function () {
  // When playing is true do the following : do nothing
  if (playing) {
    // 1. Add current score to active players score
    scores[activePlayer] += currentScore; // scores[0] = scores[0] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // Hide the dice image
      diceElement.classList.add('hidden');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Reset the game (Alex version)
/*
btnNew.addEventListener('click', function () {
  // playing
  playing = true;
  // Show the dice image
  diceElement.classList.remove('hidden');
  // Toggle to player 0
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
  // Remove the winning state
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  // Reset the scores to 0
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;

  // Reset the active player to 0
  activePlayer = 0;
});
*/

// Reset the game (Instructor version)
btnNew.addEventListener('click', init);
