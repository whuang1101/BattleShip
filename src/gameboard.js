const { Ship, matchArray } = require('./ship');

function validPosition(coordinates, length, orientation, board) {
  if (orientation === 'horizontal') {
    if (coordinates[1] + length - 1 < 10) {
      for (let i = 0; i < length; i++) {
        if (board[coordinates[0]][coordinates[1] + i] === 'x') {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  if (coordinates[0] + length - 1 < 10) {
    for (let i = 0; i < length; i++) {
      if (board[coordinates[0] + i][coordinates[1]] === 'x') {
        return false;
      }
    }
    return true;
  }
  return false;
}
class GameBoard {
  constructor() {
    this.board = [['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
      ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-']];
    this.allShips = [];
    this.missedAttacks = [];
    this.shipCoordinates = [];
    this.allAttacks = [];
  }

  // coordinates in the form of [x,x]
  placeShip(coordinates, length, orientation = 'horizontal') {
    if (validPosition(coordinates, length, orientation, this.board)) {
      const newShip = new Ship(length);
      if (orientation === 'horizontal') {
        for (let i = 0; i < length; i++) {
          this.board[coordinates[0]][coordinates[1] + i] = 'x';
          newShip.coordinate.push([coordinates[0], coordinates[1] + i]);
          this.shipCoordinates.push([coordinates[0], coordinates[1] + i]);
        }
      } else {
        for (let i = 0; i < length; i++) {
          this.board[coordinates[0] + i][coordinates[1]] = 'x';
          newShip.coordinate.push([coordinates[0] + i, coordinates[1]]);
          this.shipCoordinates.push([coordinates[0] + i, coordinates[1]]);
        }
      }
      this.allShips.push(newShip);
    }
  }

  receiveAttack(coordinates) {
    if (!matchArray(this.allAttacks, coordinates)) {
      if (matchArray(this.shipCoordinates, coordinates)) {
        for (let i = 0; i < this.allShips.length; i++) {
          if (matchArray(this.allShips[i].coordinate, coordinates)) {
            this.allShips[i].hit(coordinates);
          }
        }
      } else {
        this.missedAttacks.push(coordinates);
      }
    }
    this.allAttacks.push(coordinates);
  }
}

module.exports = {
  GameBoard,
  validPosition,
};
