// Blackjack Game V-2.3.8
import './css/normalize.css';
import './styles.css';
import {update,Game,Card} from './js/functions.js';

export const addCard = document.querySelectorAll('#player-cards'),
addPlayer = document.querySelector('#players');

export let version = '2.3.8', players = 1, turn = 0, cash = 200;
export const startGame = new Game(players), newCard = new Card,
backCard = ['./assets/img/grey_back.png','./assets/img/red_back.png'];

// HTML Selectors
const btnStart = document.querySelector('#btn-start'),
btnGet = document.querySelector('#btn-get'),
btnStop = document.querySelector('#btn-stop'),
btnNew = document.querySelector('#btn-new');

// // Events
update(version);
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
                cash = startGame.winner(startGame.points,cash);
                startGame.addCash(cash);
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
        cash = startGame.winner(startGame.points,cash);
        startGame.addCash(cash);
    }, 1000);
});

// New Game Button
btnNew.addEventListener('click', () => {
    startGame.newGame(players);
    turn = 0;

    btnNew.disabled = true, btnStart.disabled = false,
    btnGet.disabled = true, btnStop.disabled = true;
});