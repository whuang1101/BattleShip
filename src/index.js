import './CSS/titleScreen.css';
import { Player } from './gameplayJS/player';
import './CSS/playerScreen.css';
import './CSS/gameScreen.css';
import { createFinalBoard, createPlayerBoard, restartButtonInitiator } from './gameplayJS/createBoard';
import './CSS/popup.css';

const startGame = document.querySelector('.start-game');
const titleScreen = document.querySelector('.title-screen');
const playerScreen = document.querySelector('.player-screen');
restartButtonInitiator();
function gameLoop() {
  const playerName = document.querySelector('.type-name');
  const firstPlayerName = document.querySelector('.player-name');
  const playerGameText = document.querySelector('.player-name-text');
  if (playerName.value !== '') {
    firstPlayerName.innerHTML = playerName.value;
    playerGameText.innerHTML = `${playerName.value}, place your carriers:`;
  } else {
    firstPlayerName.innerHTML = 'Anonymous';
    playerGameText.innerHTML = 'Anonymous, place your carriers:';
  }
  playerName.value = '';
  const firstBoard = document.querySelector('.player-board');
  const playerOne = new Player('bob');
  const playerTwo = new Player('bob');
  const enemyBoard = document.querySelector('.enemy-board');
  playerTwo.gameBoard.randomBoard();
  console.log(playerTwo.gameBoard.board);
  createPlayerBoard(firstBoard, playerOne, 'cell');
  createFinalBoard(enemyBoard, playerTwo, 'cell', playerOne, true);
  const gameText = document.querySelector('.game-text');
  gameText.innerHTML = 'Player 1\'s Turn:';
}
startGame.addEventListener('click', () => {
  playerScreen.classList.remove('hide');
  titleScreen.classList.add('hide');
  const playerName = document.querySelector('.type-name');
  const playerGameText = document.querySelector('.player-name-text');
  playerGameText.innerHTML = `${playerName.value}, place your carriers`;
  gameLoop(playerName.value);
});
