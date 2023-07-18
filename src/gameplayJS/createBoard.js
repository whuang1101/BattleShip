/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
const { matchArray } = require('./ship');

function restartButtonInitiator() {
  const restartButton = document.querySelector('.restart');
  restartButton.addEventListener('click', () => {
    const titleScreen = document.querySelector('.title-screen');
    const gameScreen = document.querySelector('.game-screen');
    const popUp = document.querySelector('.popup');
    gameScreen.classList.remove('blur');
    gameScreen.classList.add('hide');
    titleScreen.classList.remove('hide');
    popUp.classList.add('hide');

    const firstBoard = document.querySelector('.player-board');
    const enemyBoard = document.querySelector('.enemy-board');
    const playerBoardTwo = document.querySelector('.player-board-two');
    console.log(firstBoard.firstChild);
    while (firstBoard.firstChild) {
      firstBoard.firstChild.remove();
    }
    while (enemyBoard.firstChild) {
      enemyBoard.firstChild.remove();
    }
    while (playerBoardTwo.firstChild) {
      playerBoardTwo.firstChild.remove();
    }
  });
}
function createFinalBoard(board, player, className, playerAttacked, aiOrNot = false) {
  const gameScreen = document.querySelector('.game-screen');
  const aiAttacks = [];
  const gameText = document.querySelector('.game-text');
  let isClickDisabled = false;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.classList.add(className);
      cell.setAttribute('data-row', i);
      cell.setAttribute('data-col', j);
      board.appendChild(cell);
    }
  }
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cells = board.getElementsByClassName(className);
      const cellIndex = i * 10 + j;
      const specificCell = cells[cellIndex];
      if (player.gameBoard.board[i][j] === 'x') {
        if (!aiOrNot) {
          specificCell.style.backgroundColor = 'white';
        }
      } const clickHandler = () => {
        if (isClickDisabled) { return; }
        if (aiOrNot) {
          if (gameText.innerHTML === 'Player 1\'s Turn:') {
            player.gameBoard.receiveAttack([i, j]);
            if (player.gameBoard.board[i][j] === 'x') {
              const shipName = player.gameBoard.currentShipSunk();
              if (shipName === 'Carrier') {
                gameText.innerHTML = 'You hit an enemy ship and you sank their carrier!';
              } else if (shipName === 'Battleship') {
                gameText.innerHTML = 'You hit an enemy ship and you sank their battleship!';
              } else if (shipName === 'Cruiser') {
                gameText.innerHTML = 'You hit an enemy ship and you sank their cruiser!';
              } else if (shipName === 'Destroyer') {
                gameText.innerHTML = 'You hit an enemy ship and you sank their destroyer!';
              } else {
                gameText.innerHTML = 'You hit an enemy ship!';
              }
              specificCell.style.backgroundColor = 'red';
            } else {
              gameText.innerHTML = 'You shot and you missed!';
              specificCell.style.backgroundColor = 'grey';
            }
            if (player.gameBoard.allShipsSunk()) {
              setTimeout(() => {
                gameText.innerHTML = 'You have sank the last ship!';
              }, 1000);
              const popUp = document.querySelector('.popup');
              const winner = document.querySelector('.winner');
              winner.innerHTML = 'You win !!!';
              popUp.classList.remove('hide');
              gameScreen.classList.add('blur');
            }
            specificCell.removeEventListener('click', clickHandler);
          }
          isClickDisabled = true;
          if (player.gameBoard.allShipsSunk()) {
            console.log('Player One wins');
          } else {
            setTimeout(
              () => {
                gameText.innerHTML = "AI's Turn:";
              },
              2000,
            );
            setTimeout(
              () => {
                const playerBoardTwo = document.querySelector('.player-board-two');
                const newCells = playerBoardTwo.getElementsByClassName(className);
                let randomX = Math.floor(Math.random() * 10);
                let randomY = Math.floor(Math.random() * 10);
                while (matchArray(aiAttacks, [randomX, randomY])) {
                  randomX = Math.floor(Math.random() * 10);
                  randomY = Math.floor(Math.random() * 10);
                }
                const newCellIndex = randomX * 10 + randomY;
                const newSpecificCell = newCells[newCellIndex];
                playerAttacked.gameBoard.receiveAttack([randomX, randomY]);
                if (playerAttacked.gameBoard.board[randomX][randomY] === 'x') {
                  const shipName = player.gameBoard.currentShipSunk();
                  if (shipName === 'Carrier') {
                    gameText.innerHTML = 'Ai hit an your ship and sank your carrier!';
                  } else if (shipName === 'BattleShip') {
                    gameText.innerHTML = 'Ai hit an your ship and sank your battleship!';
                  } else if (shipName === 'Cruiser') {
                    gameText.innerHTML = 'Ai hit an your ship and sank your cruiser!';
                  } else if (shipName === 'Destroyer') {
                    gameText.innerHTML = 'Ai hit an your ship and sank your destroyer!';
                  } else {
                    gameText.innerHTML = 'Ai hit an your ship!';
                  }
                  newSpecificCell.style.backgroundColor = 'red';
                } else {
                  gameText.innerHTML = 'AI shot and AI missed!';
                  newSpecificCell.style.backgroundColor = 'grey';
                }
                aiAttacks.push([randomX, randomY]);
              },
              4000,
            );
            if (playerAttacked.gameBoard.allShipsSunk()) {
              gameText.innerHTML = 'The AI has sank your last ship!';
              const popUp = document.querySelector('.popup');
              const winner = document.querySelector('.winner');
              winner.innerHTML = 'AI wins! :(((';
              popUp.classList.remove('hide');
              gameScreen.classList.add('blur');
            } else {
              setTimeout(
                () => {
                  gameText.innerHTML = 'Player 1\'s Turn:';
                  isClickDisabled = false;
                },
                5000,
              );
            }
          }
        }
      };
      specificCell.addEventListener('click', clickHandler);
    }
  }
}

function createPlayerBoard(board, player, className) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.classList.add(className);
      cell.setAttribute('data-row', i);
      cell.setAttribute('data-col', j);
      board.appendChild(cell);
    }
  }
  const position = document.querySelector('.position');
  position.addEventListener('click', () => {
    if (position.innerHTML === 'Horizontal') {
      position.innerHTML = 'Vertical';
    } else {
      position.innerHTML = 'Horizontal';
    }
  });
  const allShipsPlaced = [5, 4, 3, 3, 2];
  let counter = 0;
  const allClickedCells = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cells = board.getElementsByClassName(className);
      const cellIndex = i * 10 + j;
      const specificCell = cells[cellIndex];
      const mouseoverHandler = () => {
        if (position.innerHTML === 'Horizontal') {
          if ((i * 10 + j + allShipsPlaced[counter]) < ((i + 1) * 10 + 1)) {
            for (let k = 0; k < allShipsPlaced[counter]; k++) {
              const newCell = cells[i * 10 + j + k];
              newCell.style.backgroundColor = 'white';
            }
          }
        } else if (((i + allShipsPlaced[counter]) * 10 + j) <= 109) {
          for (let k = 0; k < allShipsPlaced[counter]; k++) {
            const newCell = cells[(i + k) * 10 + j];
            newCell.style.backgroundColor = 'white';
          }
        }
      };
      const mouseoutHandler = () => {
        if (position.innerHTML === 'Horizontal') {
          if ((i * 10 + j + allShipsPlaced[counter]) < ((i + 1) * 10 + 1)) {
            for (let k = 0; k < allShipsPlaced[counter]; k++) {
              const newCell = cells[i * 10 + j + k];
              if (!newCell.classList.contains('clicked')) {
                newCell.style.backgroundColor = '';
              }
            }
          }
        } else if (((i + allShipsPlaced[counter]) * 10 + j) <= 109) {
          for (let k = 0; k < allShipsPlaced[counter]; k++) {
            const newCell = cells[(i + k) * 10 + j];
            if (!newCell.classList.contains('clicked')) {
              newCell.style.backgroundColor = '';
            }
          }
        }
      };
      const mouseClickHandler = () => {
        if (position.innerHTML === 'Horizontal') {
          if ((i * 10 + j + allShipsPlaced[counter]) < ((i + 1) * 10 + 1)) {
            let valid = true;
            for (let k = 0; k < allShipsPlaced[counter]; k++) {
              if (allClickedCells.includes(i * 10 + j + k)) {
                valid = false;
              }
            }
            if (valid) {
              for (let k = 0; k < allShipsPlaced[counter]; k++) {
                const newCell = cells[i * 10 + j + k];
                newCell.style.backgroundColor = 'white';
                newCell.classList.add('clicked');
                allClickedCells.push(i * 10 + j + k);
              }
              player.gameBoard.placeShip([i, j], allShipsPlaced[counter], 'horizontal');
              counter++;
            }
          }
        } else if ((i + allShipsPlaced[counter]) * 10 + j < 109) {
          let valid = true;
          for (let k = 0; k < allShipsPlaced[counter]; k++) {
            if (allClickedCells.includes((i + k) * 10 + j)) {
              valid = false;
            }
          }
          if (valid) {
            for (let k = 0; k < allShipsPlaced[counter]; k++) {
              const newCell = cells[(i + k) * 10 + j];
              newCell.style.backgroundColor = 'white';
              newCell.classList.add('clicked');
              allClickedCells.push((i + k) * 10 + j);
            }
            player.gameBoard.placeShip([i, j], allShipsPlaced[counter], 'vertical');
            counter++;
          }
        }
        if (counter === 5) {
          const playerScreen = document.querySelector('.player-screen');
          const gameScreen = document.querySelector('.game-screen');
          playerScreen.classList.add('hide');
          gameScreen.classList.remove('hide');
          const playerBoardTwo = document.querySelector('.player-board-two');
          createFinalBoard(playerBoardTwo, player, 'cell');
        }
      };
      specificCell.addEventListener('mouseover', () => mouseoverHandler());
      specificCell.addEventListener('mouseout', () => mouseoutHandler());
      specificCell.addEventListener('click', mouseClickHandler);
    }
  }
}

module.exports = {
  createFinalBoard,
  createPlayerBoard,
  restartButtonInitiator,
};
