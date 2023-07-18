const { GameBoard } = require('./gameboard');

class Player {
  constructor(name) {
    this.gameBoard = new GameBoard();
    this.name = name;
  }

  attack(enemyGameBoard, coordinates) {
    enemyGameBoard.receiveAttack(coordinates);
  }
}

module.exports = {
  Player,
};
