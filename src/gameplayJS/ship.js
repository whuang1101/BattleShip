function matchArray(fullArray, partArray) {
  for (let i = 0; i < fullArray.length; i++) {
    if (fullArray[i][0] === partArray[0] && fullArray[i][1] === partArray[1]) {
      return true;
    }
  }
  return false;
}

class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.coordinate = [];
    this.name = '';
  }

  hit(givenCoordinate) {
    if (matchArray(this.coordinate, givenCoordinate)) {
      this.hits += 1;
    }
  }

  isSunk() {
    if (this.hits === this.length) {
      this.sunk = true;
    } else {
      this.sunk = false;
    }
    return this.sunk;
  }
}

module.exports = {
  Ship,
  matchArray,
};
