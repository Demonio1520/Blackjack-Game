// Let Variables - Const Variables - HTML Selectors
import {cash,turn,bet} from '../index.js';
import {startGame,newCard, backCard} from '../index.js';
import {addPlayer,addCard} from '../index.js';

// HTML Selectors
const p = document.querySelectorAll('p'),
span  = document.querySelectorAll('span');

// Shuffle Arrays
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}

export function update(version) {
    p[0].innerText = `V-${version}`;
}

export function addCash(cash = 200) {
    span[0].innerText = cash;
}

export class Game {
    constructor(players) {
        this.newGame(players);
        addCash(cash);
    }

    createPlayers = (players) => {
        const div = document.createElement('div');
        newPlayer = `
        <h2>Player ${players} - <span>0</span></h2>
        <div id="player-cards">
        </div>`;
        div.innerHTML = newPlayer;
        div.classList.add('col-4');
        addPlayer.append(div);
    }

    pointsCounter = (turn,value) => {
        this.points[turn] = this.cardCounter(turn,value) + value;
        span[turn + 1].textContent = this.points[turn];
    }

    startGame = (players) => {
        newCard.createDeck();
        for(let i = 0; i <= players; i++) {
            if (i < players) {
                newCard.addCard(i), newCard.addCard(i);
            } else {
                newCard.addCard(i), newCard.addCard(i,true);
            }
        }

        this.blackjack(turn,this.counter);
    }

    cardCounter = (turn,value) => {
        let amount = 0;
        if ((this.points[turn] + value) > 21) {
            for(let i = 0; i < this.counter[turn].length; i++) {
                if(this.counter[turn][i] == 11) this.counter[turn][i] = 1;
            }
        }
        for(let i = 0; i < this.counter[turn].length; i++) {
            amount = amount + this.counter[turn][i];
        }
        return amount;
    }

    blackjack = (turn,counter) => {
        const blackjack = counter[turn][0] + counter[turn][1];
        if (blackjack === 21) {
            setTimeout(() => {
                alert('¡Blackjack!');          
            }, 1000);
            return true;
        }
    }

    computerTurn = (turn,points) => {
        newCard.flipCard(turn);
        this.blackjack(turn,this.counter);
        while (points[turn] < points[0] && points[0] <= 21 || points[turn] < 17 && points[0] <= 21 || points[turn] < 17 && points[0] > 21) {
            newCard.addCard(turn);
        }
    }

    winner = (points,cash) => {
        if (points[1] > points[0] && points[1] <= 21 || points[1] <= 21 && points[0] > 21) {
            alert('The Dealer Wins.');
            return cash - (10 * bet);
        } else if (points[1] == points[0]) {
            alert('Tie');
            return cash;
        } else {
            alert('¡You Win!');
            if (this.blackjack(0,this.counter) == true) { return cash + (15 * bet) }
            else { return cash + (10 * bet); }  
        }
    }

    newGame = (players) => {
        this.points = [];
        this.counter = [];
        for(let i = 0; i <= players; i++) {
            span[i + 1].textContent = 0;
            addCard[i].innerHTML = '';

            this.points.push(0);
            this.counter.push([]);
        }
    }

    saveData = (cash) => {
        localStorage.setItem('cash', cash);
    }

    loadData = () => {
        return localStorage.getItem('cash');
    }
}

export class Card {
    constructor() {
        this.createDeck();
    }

    createDeck = () => {
        this.deck = [];
        this.types = ['C','D','H','S'];
        this.kings = ['A','J','Q','K'];

        
        for (let n = 2; n <= 10; n++) {
            for (let i of this.types) {
                this.deck.push (n + i);
            }
        }

        for (let i of this.types) {
            for (let x of this.kings) {
                this.deck.push (x + i);
            }
        }

        return shuffle(this.deck);
    }

    getCard = () => {
        if (this.deck.length == 0) {
        throw 'Game Over. There\'re no more cards in the deck.';
        }

        return this.deck.pop();
    }

    cardValue = (card,turn) => {
        let value = card.substring(0, card.length - 1);
        if (startGame.points[turn] < 11) {
            return (isNaN (value)) ? (value == 'A') ? 11 : 10 : value * 1;
        } else {
            return (isNaN (value)) ? (value == 'A') ? 1 : 10 : value * 1;
        }
    }

    addCard = (turn,down = false) => {
        let card = this.getCard(), value = this.cardValue(card,turn);
        if (down == false ) startGame.pointsCounter(turn,value,down);
        (down == false) ? startGame.counter[turn].push(value) :
        startGame.counter[turn].push(card);

        this.createCard(card,turn,down);
    }

    createCard = (card,turn,down = false) => {
        const img = document.createElement('img');
        shuffle(backCard);

        img.classList.add('cards');
        (down == true) ? img.src = `${backCard[0]}` : img.src = `./assets/img/${card}.png`;
        (down == true) ? img.alt = `Back Card` : img.alt = `Card ${card}`;
        addCard[turn].append(img);
    }

    flipCard = (turn) => {
        const img = addCard[turn].querySelectorAll('img'),
        card = startGame.counter[turn][1];
        startGame.counter[turn].pop();
        addCard[turn].removeChild(img[1]);

        this.createCard(card,turn);
        let value = this.cardValue(card,turn);
        startGame.pointsCounter(turn,value);
        startGame.counter[turn][1] = value;
    }
}