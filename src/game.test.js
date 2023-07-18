/* eslint-disable no-undef */
const { Ship, matchArray } = require('./gameplayJS/ship');
const { GameBoard, validPosition } = require('./gameplayJS/gameboard');

test('3 hits sinks the ship', () => {
  const length = 3;
  const testShip = new Ship(length);
  testShip.coordinate.push([3, 3]);
  testShip.coordinate.push([3, 4]);
  testShip.coordinate.push([3, 5]);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    testShip.hit([3, 3 + i]);
  }
  expect(testShip.isSunk()).toBeTruthy();
});

test('Placed ship at the right place', () => {
  const length = 3;
  const gameBoard = new GameBoard();
  const coordinates = [0, 0];
  gameBoard.placeShip(coordinates, length, 'horizontal');
  expect(gameBoard.board[coordinates[0]][coordinates[1]]).toMatch('x');
});

test('Ship properly spans out', () => {
  const length = 3;
  const gameBoard = new GameBoard();
  const coordinates = [0, 0];
  gameBoard.placeShip(coordinates, length, 'horizontal');
  expect(gameBoard.board[coordinates[0]][coordinates[1]]).toMatch('x');
  expect(gameBoard.board[coordinates[0]][coordinates[1] + 1]).toMatch('x');
  expect(gameBoard.board[coordinates[0]][coordinates[1] + 2]).toMatch('x');
  gameBoard.placeShip([0, 1], length, 'horizontal');
  expect(gameBoard.board[coordinates[0]][coordinates[1] + 3]).toMatch('-');
});

test('Valid ship function works', () => {
  const gameBoard = new GameBoard();
  expect(validPosition([0, 0], 3, 'horizontal', gameBoard.board)).toBeTruthy();
  expect(validPosition([0, 8], 3, 'horizontal', gameBoard.board)).toBeFalsy();
  expect(validPosition([0, 8], 3, 'vertical', gameBoard.board)).toBeTruthy();
  expect(validPosition([0, 0], 3, 'vertical', gameBoard.board)).toBeTruthy();
  expect(validPosition([8, 0], 3, 'vertical', gameBoard.board)).toBeFalsy();
});

test('Ship properly spans vertical', () => {
  const length = 3;
  const gameBoard = new GameBoard();
  const coordinates = [0, 0];
  gameBoard.placeShip(coordinates, length, 'vertical');
  expect(gameBoard.board[coordinates[0]][coordinates[1]]).toMatch('x');
  expect(gameBoard.board[coordinates[0] + 1][coordinates[1]]).toMatch('x');
  expect(gameBoard.board[coordinates[0] + 2][coordinates[1]]).toMatch('x');
});

test('Array contains smaller array', () => {
  expect(matchArray([[3, 3], [2, 1]], [3, 3])).toBeTruthy();
  expect(matchArray([[2, 1]], [3, 3])).toBeFalsy();
});

test('Receive Attack function works if missed', () => {
  const gameBoard = new GameBoard();
  gameBoard.receiveAttack([3, 3]);
  expect(matchArray(gameBoard.missedAttacks, [3, 3])).toBeTruthy();
});

test('Receive Attack hitting', () => {
  const gameBoard = new GameBoard();
  gameBoard.placeShip([0, 0], 3, 'horizontal');
  gameBoard.receiveAttack([0, 0]);
  gameBoard.receiveAttack([0, 0]);
  gameBoard.receiveAttack([0, 1]);
  gameBoard.receiveAttack([0, 2]);
  const numberOfHits = gameBoard.allShips[0].hits;
  expect(numberOfHits).toBe(3);
  expect(gameBoard.allShips[0].isSunk()).toBeTruthy();
  expect(gameBoard.allShipsSunk()).toBeTruthy();
});
