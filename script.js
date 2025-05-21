'use strict';

// PLAYER 1
const player0El = document.querySelector(".player--0")
const score0El = document.getElementById("score--0");
const currentScore0El = document.getElementById("current--0");
// PLAYER 2
const player1El = document.querySelector(".player--1")
const score1El = document.getElementById("score--1");
const currentScore1El = document.getElementById("current--1");
//
const diceEl = document.querySelector(".dice");;
const [btnNew, btnRoll, btnHold] = document.querySelectorAll(".btn");

// INITIAL CONFIG
let scores, currentScore, activePlayer, playing;

const init = () => {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;

    diceEl.classList.add("hidden");
    player0El.classList.remove("player--winner")
    player1El.classList.remove("player--winner")
    player0El.classList.add("player--active")
    player1El.classList.remove("player--active")
}
init();

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; // SWITCH PLAYER
    currentScore = 0;
    player0El.classList.toggle("player--active")
    player1El.classList.toggle("player--active")
}

// ROLL DICE
btnRoll.addEventListener("click", () => {

    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        diceEl.classList.remove("hidden");
        // diceEl.setAttribute("src", `dice-${dice}.png`);
        diceEl.src = `dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        };
    }
})

// HOLD
btnHold.addEventListener("click", () => {

    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 20) {
            playing = false;
            diceEl.classList.add("hidden");
            alert(`El ganador es el jugador ${activePlayer}`)
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        } else {
            switchPlayer();
        }
    }
})

// NEW GAME
btnNew.addEventListener("click", init)

