import './styles.css';

// HTML Selectors
// Buttons
const btnNew   = document.querySelector('#btn-new'),
        btnGet   = document.querySelector('#btn-get'),
        btnStop  = document.querySelector('#btn-stop'),
        btnStart = document.querySelector('#btn-start');

// Functions
// Start Game
let playerNumbers = 3;
let turn = 0;

const startGame = (playerNumbers) => {
    let deck = createDeck();
    numberPlayers(playerNumbers);
    for(let i = 0; i < playerNumbers; i++) {
        playerPoints.push(0);
        for(let x = 0; x < 2; x++) {
            addCards(i);
        }
    }
}

// Create Deck
let deck = [];
const types = ['C','D','H','S'],
        kings = ['A','J','Q','K'];

// Add Cards To The Deck
const createDeck = () => {
    deck = [];

    for (let i = 2; i <= 10; i++) {
        for (let x of types) {
            deck.push (i + x);
        }
    }

    for (let y of types) {
        for (let x of kings) {
            deck.push (x + y);
        }
    }

    return shuffle(deck);
}

// Get Card
const getCard = () => {
    if (deck.length == 0) {
    throw 'Game Over. There\'re no more cards in the deck.';
    }

    return deck.pop();
}

// Card Value
const cardValue = (card) => {
    let value = card.substring(0, card.length - 1);
    if (playerPoints[turn] < 11) {
        return (isNaN (value)) ? (value == 'A') ? 11 : 10 : value * 1;
    } else {
        return (isNaN (value)) ? (value == 'A') ? 1 : 10 : value * 1;
    }
}

// Add Players Card
const addCards = (turn) => {
    const playerCards = document.querySelectorAll('#player-cards');
    const card = getCard();
    // cardCounter[turn].push(card);
    pointsCounter(turn,card);

    // Create Card
    const time = setInterval(() => {
        const imgCard = document.createElement('img');
        imgCard.classList.add('cards');
        imgCard.src = `/img/${card}.png`;
        imgCard.alt = `Card ${card}`;
        playerCards[turn].append(imgCard);
        clearInterval(time);
    },500);
}

// Points Counter
let playerPoints = [];

const pointsCounter = (turn,card) => {
    const points  = document.querySelectorAll('span');
    playerPoints[turn] = playerPoints[turn] + cardValue(card);
    points[turn].textContent = playerPoints[turn];
}


const dealerTurn = () => {
        // Flip Card
    dealerCards[1].push (downCardValue);
    computerPoints = computerPoints + cardValue(downCardValue);
    pointCounter[1].innerText = computerPoints;

    // Create Card
    const flipCard = computerCards.querySelector('img');
    flipCard.src = `/img/${downCardValue}.png`;        
}

const computerTurn = () => {
    do {
        // if (downCard == true) {
        //     computerFlip();
        //     downCard = false;
        addCards(turn);
    } while (playerPoints[turn] < playerPoints[0] && playerPoints[0] <= 21 || playerPoints[turn] < 17 && playerPoints[0] <= 21 || playerPoints[turn] < 17 && playerPoints[0] > 21);
}

// Events
// Start Button
btnStart.addEventListener ('click', () => {
    btnNew.disabled = false;
    btnGet.disabled = false;
    btnStop.disabled = false;
    btnStart.disabled = true;
    startGame(playerNumbers);
});

// Get Button
btnGet.addEventListener('click', () => {
    addCards(turn);
    if (playerPoints[0] > 21) {
        const time = setInterval(() => {
            alert('You\'re over 21');
            clearInterval(time);
            do {
                turn++;
                computerTurn();
            } while (turn < playerNumbers);
        }, 500);
        btnGet.disabled = true;
        btnStop.disabled = true;
    }
});

// Stop Button
btnStop.addEventListener('click', () => {
    btnGet.disabled = true;
    btnStop.disabled = true;
    do {
        turn++;
        computerTurn();
    } while (turn < playerNumbers);

    // setTimeout (() => {
    //     if (computerPoints >= playerPoints && computerPoints <= 21) {
    //         alert('The Dealer Wins.');
    //     } else {
    //         alert('¡You Win!');
    //     }
    // }, 1000);
});

// New Game Button
btnNew.addEventListener('click', () => {
    location.reload();
});