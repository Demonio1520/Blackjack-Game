// Blackjack Game V-2.4.3
import './css/normalize.css';
import './styles.css';
import {update,addCash,Game,Card} from './js/functions.js';

// HTML Selectors - Let Variables - Const Variables
export const addCard = document.querySelectorAll('#player-cards'),
addPlayer = document.querySelector('#players');

export let version = '2.4.3', players = 1, turn = 0, cash = 200, bet = 2;
export const startGame = new Game(players), newCard = new Card,
backCard = ['./assets/img/grey_back.png','./assets/img/red_back.png'];

// HTML Selectors
const btnAmount = document.querySelector('#btn-amount'),
btnStart = document.querySelector('#btn-start'),
btnGet = document.querySelector('#btn-get'),
btnStop = document.querySelector('#btn-stop'),
btnNew = document.querySelector('#btn-new');

// // Events
update(version);
btnGet.disabled = true;
btnNew.disabled = true, btnStop.disabled = true;

// Amount To Bet
btnAmount.addEventListener('click', () => {
    switch (bet) {
        case 2:
            bet = 5;
        break;
        case 5:
            bet = 10;
        break;
        case 10:
            bet = 2;
        break;
    }
    btnAmount.textContent = `X${bet}`;
});

// Start Button
if (cash >= (10 * bet)) {
    btnStart.disabled = false;
    btnStart.addEventListener ('click', () => {
        startGame.startGame(players);
        (startGame.points[0] == 21) ? btnGet.disabled = true : btnGet.disabled = false;
        btnNew.disabled = false, btnStop.disabled = false, btnStart.disabled = true;
    });
} else { btnStart.disabled = true; }

// Get Button
btnGet.addEventListener('click', () => {
    btnGet.disabled = true, newCard.addCard(turn);
    if (startGame.points[turn] > 21) {
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
                addCash();
            }, 1000);
        }, 500);
    } else { btnGet.disabled = false; }
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
        addCash(cash);
    }, 1000);
});

// New Game Button
btnNew.addEventListener('click', () => {
    startGame.newGame(players);
    if (turn == 0) {
        cash = cash - (10 * bet);
        addCash(cash);
    } else { turn = 0; }
    if (cash >= (10 * bet)) {
        btnStart.disabled = false;
    } else { btnStart.disabled = true; }
    btnNew.disabled = true;
    btnGet.disabled = true, btnStop.disabled = true;
});