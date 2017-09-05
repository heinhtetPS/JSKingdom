const Snake = require('./snake');
const Food = require('./food');

class Board {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.snake = new Snake(this);
    this.food = new Food(this);
  }



}

module.exports = Board;
