const Game = require('./game');
require('./mjqga');

const makeTile = (rowIdx, colIdx) => {
  let tileEl = document.createElement("div");
  tileEl.classList.add("tile");
  tileEl.setAttribute("data-row", rowIdx);
  tileEl.setAttribute("data-col", colIdx);
  return tileEl;
};

const populateBoard = boardEl => {
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j ++) {
      let tile = makeTile(i, j);
      boardEl.append(tile);
    }
  }
};

const virtualBoard = boardEl => {
  let vBoard = [];
  let tiles = boardEl.children().toArray();
  for (let i = 0; i < 16; i++) {
    let row = [];
    for (let j = 0; j < 16; j ++) {
      row.push(tiles[16 * i + j]);
    }
    vBoard.push(row);
  }
  return vBoard;
};

const CLASS_NAMES = {
  "o": "blank",
  "f": "flagged",
  "b": "bomb",
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
};

const render = (vBoard, game) => {
  game.grid().forEach((row, rowIdx) => {
    row.forEach((tile, colIdx) => {
      vBoard[rowIdx][colIdx].className = `tile ${CLASS_NAMES[tile]}`;
    });
  });
};

const addListeners = (vBoard, game) => {
  $l(".tile").on("click", e => {
    game.click([+(e.target.dataset.row), +(e.target.dataset.col)]);
    render(vBoard, game);
  });
  $l(".tile").on("contextmenu", e => {
    e.preventDefault();
    game.toggleFlag([+(e.target.dataset.row), +(e.target.dataset.col)]);
    render(vBoard, game);
    return false;
  });
};

$l(function() {
  let game = new Game();
  let boardEl = $l("#board");
  populateBoard(boardEl);
  let vBoard = virtualBoard(boardEl);
  addListeners(vBoard, game);
  render(vBoard, game);
});
