import {players,startGame,newCard} from '../index.js'
let turn = 0;

// Shuffle Arrays
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}

export class Game {
    constructor(players) {
        this.points = [];
        this.counter = [];
        for(let i = 0; i <= players; i++) {
            this.points.push(0);
            this.counter.push([]);
        }
    }
    
    createPlayers = (players) => {
        const div = document.createElement('div');
        const newPlayer = `
        <h2>Player ${players} - <span>0</span></h2>
        <div id="player-cards">
        </div>`
        div.innerHTML = newPlayer;
        div.classList.add('col-4');
        addPlayer.append(div);
    }

    pointsCounter = (turn,value) => {
        const span  = document.querySelectorAll('span');
        this.points[turn] = this.cardCounter(turn,value) + value;
        span[turn].textContent = this.points[turn];
    }

    startGame = (players) => {
        newCard.createDeck();
        for(let i = 0; i <= players; i++) {
            if (i < players) {
                newCard.addCard(i), newCard.addCard(i);
            } else {
                newCard.addCard(i), newCard.addCard(i);
            }
        }

        this.blackjack(players,this.counter);
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

    blackjack = (players,counter) => {
        for (let i = 0; i < players; i++) {
            const blackjack = counter[i][0] + counter[i][1];
            if (blackjack == 21) {
                btnGet.disabled = true;
                setTimeout(() => {
                    alert('¡Blackjack!');          
                }, 1000);
                break;
            }
        }
    }

    computerTurn = (turn,points) => {
        // if (downCard == true) {
        //     computerFlip();
        //     downCard = false;
    while (points[turn] < points[0] && points[0] <= 21 || points[turn] < 17 && points[0] <= 21 || points[turn] < 17 && points[0] > 21) {
        newCard.addCard(turn);
    }
}
}

export class Card {
    constructor(players) {
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

    addCard = (turn) => {
        let card = this.getCard(), value = this.cardValue(card,turn);
        startGame.pointsCounter(turn,value);
        startGame.counter[turn].push(value);

        console.log(startGame.counter);
        console.log(startGame.cardCounter(turn));

        this.createCard(card,turn);
    }

    createCard = (card,turn) => {
        const img = document.createElement('img');
        img.classList.add('cards');
        img.src = `./assets/img/${card}.png`;
        img.alt = `Card ${card}`;
        addCard[turn].append(img);
    }
}
// Create Number Of Players

// // Face Down Card
// const addDownCards = () => {
//     downCardValue = getCard();

// }

// HTML Selectors
const addPlayer = document.querySelector('#players'),
addCard = document.querySelectorAll('#player-cards'),
btnStart = document.querySelector('#btn-start'),
btnGet = document.querySelector('#btn-get'),
btnStop = document.querySelector('#btn-stop'),
btnNew = document.querySelector('#btn-new');

// // Start Game
// let playerNumbers = 3;
// let turn = 0;

// // Points Counter
// let playerPoints = [];

// const dealerTurn = () => {
//         // Flip Card
//     dealerCards[1].push (downCardValue);
//     computerPoints = computerPoints + cardValue(downCardValue);
//     pointCounter[1].innerText = computerPoints;

//     // Create Card
//     const flipCard = computerCards.querySelector('img');
//     flipCard.src = `/img/${downCardValue}.png`;        
// }

// // Events
btnNew.disabled = true;
btnGet.disabled = true;
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
    if (startGame.points[turn] > 21) {
        const time = setInterval(() => {
            alert('You\'re over 21');
            clearInterval(time);
        }, 500);
        btnGet.disabled = true;
        btnStop.disabled = true;
    }
});

// Stop Button
btnStop.addEventListener('click', () => {
    btnGet.disabled = true;
    btnStop.disabled = true;
    turn += 1;
    do {
        startGame.computerTurn(turn,startGame.points);
        turn += 1;
    } while (turn <= players);

    setTimeout (() => {
        if (startGame.points[1] >= startGame.points[0] && startGame.points[1] <= 21) {
            alert('The Dealer Wins.');
        } else {
            alert('¡You Win!');
        }
    }, 1000);
});

// New Game Button
btnNew.addEventListener('click', () => {
    location.reload();
});