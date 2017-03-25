const Board = require('./board');

class Game {
  constructor() {
    this.reset();
  }

  reset() {
    this.board = new Board(16, 16, 28);
    this.canPlay = true;
    this.won = false;
  }

  click(pos) {
    if (!this.board.isFlagged(pos) && this.canPlay) {
      this.canPlay = !this.board.reveal(pos);
      if (this.board.isWon()) {
        this.canPlay = false;
        this.won = true;
      }
    }
  }

  toggleFlag(pos) {
    if (this.canPlay) {
      if (this.board.isFlagged(pos)) {
        this.board.unflag(pos);
      } else if (!this.board.isRevealed(pos)) {
        this.board.flag(pos);
      }
    }
  }

  grid() {
    return this.board.publicGrid();
  }
}

module.exports = Game;
