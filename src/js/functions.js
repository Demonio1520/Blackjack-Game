// Shuffle Arrays

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}

// Create Number Of Players
const numberPlayers = (numberPlayers) => {
    for (let i = 1; i <= numberPlayers; i++) {
        const players = document.querySelectorAll('#players'),
              div = document.createElement('div'),
              div2 = document.createElement('div'),
              h2 = document.createElement('h2'),
              span = document.createElement('span');

        if (i < numberPlayers) {
            players[0].appendChild(div);
            div.classList.add('col-4');
            div.appendChild(h2);
            div.appendChild(div2);
            (i == 1) ? h2.textContent = 'You - ' : h2.textContent = `Player ${i} - `;
            h2.append(span);
            div2.id = 'player-cards'
        } else {
            players[1].appendChild(div);
            div.classList.add('col-4');
            div.appendChild(h2);
            div.appendChild(div2);
            h2.textContent = 'Dealer - ';
            h2.append(span);
            div2.id = 'player-cards'
        }
    }
}

// Face Down Card
const addDownCards = () => {
    downCardValue = getCard();

    // Create Card
    const imgCard = document.createElement('img');
    imgCard.classList.add('cards');
    imgCard.src = `/img/grey_back.png`;
    imgCard.alt = "Card Face-Down";
    computerCards.append(imgCard);
}

// ¡Blackjack!
const Blackjack = () => {
    if ((cardCounter[0][0].charAt(0)) == 'A' && isNaN (cardCounter[0][1].charAt(0)) || (cardCounter[0][1].charAt(0)) == 'A' && isNaN (cardCounter[0][0].charAt(0))) {
        btnGet.disabled = true;
        setTimeout(() => {
            alert('¡Blackjack!');          
        }, 1000);
    }
}

// As Value