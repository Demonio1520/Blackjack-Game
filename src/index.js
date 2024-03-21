import './styles.css';
import {Game,Card} from './js/functions.js';

export let players = 1;
export let turn = 0;
export const startGame = new Game(players), newCard = new Card;
console.log(newCard.deck);