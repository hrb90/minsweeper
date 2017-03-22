const Board = require('./board');
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

const render = (vBoard, board) => {
  board.publicGrid().forEach((row, rowIdx) => {
    row.forEach((tile, colIdx) => {
      vBoard[rowIdx][colIdx].className = `tile ${tile}`;
      vBoard[rowIdx][colIdx].innerHTML = tile;
    });
  });
};

const addListeners = (vBoard, board) => {
  $l(".tile").on("click", e => {
    board.reveal([+(e.target.dataset.row), +(e.target.dataset.col)]);
    render(vBoard, board);
  });
  $l(".tile").on("contextmenu", e => {
    e.preventDefault();
    board.flag([+(e.target.dataset.row), +(e.target.dataset.col)]);
    render(vBoard, board);
    return false;
  });
};

$l(function() {
  let board = new Board(16, 16, 28);
  let boardEl = $l("#board");
  populateBoard(boardEl);
  let vBoard = virtualBoard(boardEl);
  addListeners(vBoard, board);
  render(vBoard, board);
});
