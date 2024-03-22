import './styles.css';
import {Game,Card} from './js/functions.js';

export let players = 1, turn = 0;
export const startGame = new Game(players), newCard = new Card;

// HTML Selectors
export const addCard = document.querySelectorAll('#player-cards'),
addPlayer = document.querySelector('#players');
const btnStart = document.querySelector('#btn-start'),
btnGet = document.querySelector('#btn-get'),
btnStop = document.querySelector('#btn-stop'),
btnNew = document.querySelector('#btn-new');

// // Events
btnNew.disabled = true, btnGet.disabled = true;
btnStop.disabled = true;

// Start Button
btnStart.addEventListener ('click', () => {
    btnNew.disabled = false, btnGet.disabled = false,
    btnStop.disabled = false, btnStart.disabled = true;
    startGame.startGame(players);
});

// Get Button
btnGet.addEventListener('click', () => {
    newCard.addCard(turn);
    if (startGame.points[0] > 21) {
        const time = setInterval(() => {
            alert('You\'re over 21');
            clearInterval(time);
            btnGet.disabled = true, btnStop.disabled = true;
            turn += 1;

            do {
                startGame.computerTurn(turn,startGame.points);
                turn += 1;
            } while (turn <= players);

            setTimeout (() => {
                if (startGame.points[1] >= 17 && startGame.points[1] <= 21) {
                    alert('The Dealer Wins.');
                } else {
                    alert('¡You Win!');
                }
            }, 1000);
        }, 500);
    }
});

// Stop Button
btnStop.addEventListener('click', () => {
    btnGet.disabled = true, btnStop.disabled = true;
    turn += 1;

    do {
        startGame.computerTurn(turn,startGame.points);
        turn += 1;
    } while (turn <= players);

    setTimeout (() => {
        if (startGame.points[1] > startGame.points[0] && startGame.points[1] <= 21) {
            alert('The Dealer Wins.');
        } else if (startGame.points[1] == startGame.points[0]) {
            alert('Tie');
        } else {
            alert('¡You Win!');
        }
    }, 1000);
});

// New Game Button
btnNew.addEventListener('click', () => {
    location.reload();
});