/* eslint-disable no-plusplus */
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
    this.allShipsTemp = [];
  }

  // coordinates in the form of [x,x]
  placeShip(coordinates, length, orientation = 'horizontal') {
    if (validPosition(coordinates, length, orientation, this.board)) {
      const newShip = new Ship(length);
      const newTempShip = new Ship(length);
      if (orientation === 'horizontal') {
        for (let i = 0; i < length; i++) {
          this.board[coordinates[0]][coordinates[1] + i] = 'x';
          newShip.coordinate.push([coordinates[0], coordinates[1] + i]);
          newTempShip.coordinate.push([coordinates[0], coordinates[1] + i]);
          this.shipCoordinates.push([coordinates[0], coordinates[1] + i]);
        }
      } else {
        for (let i = 0; i < length; i++) {
          this.board[coordinates[0] + i][coordinates[1]] = 'x';
          newShip.coordinate.push([coordinates[0] + i, coordinates[1]]);
          newTempShip.coordinate.push([coordinates[0] + i, coordinates[1]]);
          this.shipCoordinates.push([coordinates[0] + i, coordinates[1]]);
        }
      }
      this.allShips.push(newShip);
      this.allShipsTemp.push(newTempShip);
      return true;
    }
    return false;
  }

  randomBoard() {
    let a = 0;
    while (a < 5) {
      const lengths = [5, 4, 3, 3, 2];
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      const orientationNumber = Math.floor(Math.random() * 2);
      let direction = '';
      if (orientationNumber === 0) {
        direction = 'horizontal';
      } else {
        direction = 'vertical';
      }
      if (this.placeShip([row, col], lengths[a], direction)) {
        a += 1;
      }
    }
  }

  receiveAttack(coordinates) {
    if (!matchArray(this.allAttacks, coordinates)) {
      if (matchArray(this.shipCoordinates, coordinates)) {
        for (let i = 0; i < this.allShips.length; i++) {
          if (matchArray(this.allShips[i].coordinate, coordinates)) {
            this.allShips[i].hit(coordinates);
            this.allShipsTemp[i].hit(coordinates);
            console.log('hit');
          }
        }
      } else {
        console.log('missed');
        this.missedAttacks.push(coordinates);
      }
    }

    this.allAttacks.push(coordinates);
  }

  allShipsSunk() {
    let shipSunkCounter = 0;
    for (let i = 0; i < this.allShips.length; i++) {
      if (this.allShips[i].isSunk()) {
        shipSunkCounter += 1;
        console.log(shipSunkCounter);
      }
    }
    if (shipSunkCounter === this.allShips.length) {
      return true;
    }
    return false;
  }

  currentShipSunk() {
    console.log(this.allShipsTemp);
    let neededArray = '';
    for (let i = 0; i < this.allShipsTemp.length; i++) {
      if (this.allShipsTemp[i] !== 'temp') {
        if (this.allShipsTemp[i].isSunk()) {
          if (this.allShipsTemp[i].length === 5) {
            neededArray = 'Carrier';
          }
          if (this.allShipsTemp[i].length === 4) {
            neededArray = 'Battleship';
          }
          if (this.allShipsTemp[i].length === 3) {
            neededArray = 'Cruiser';
          }
          if (this.allShipsTemp[i].length === 2) {
            neededArray = 'Destroyer';
          }
          this.allShipsTemp.splice(i, 1);
          const newNumbers = [
            ...this.allShipsTemp.slice(0, i),
            'temp',
            ...this.allShipsTemp.slice(i),
          ];
          this.allShipsTemp = newNumbers;
        }
      }
    }
    return neededArray;
  }
}

module.exports = {
  GameBoard,
  validPosition,
};
