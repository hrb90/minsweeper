const Board = require('./board');
require('./mjqga');

const render = (boardEl, board) => {
  boardEl.remove(".tile");
  board.publicGrid().forEach((row, rowIdx) => {
    row.forEach((tile, colIdx) => {
      let tileEl = document.createElement("div");
      tileEl.classList.add("tile");
      tileEl.setAttribute("data-row", rowIdx);
      tileEl.setAttribute("data-col", colIdx);
      tileEl.innerHTML = tile;
      boardEl.append(tileEl);
    });
  });
  $l(".tile").on("click", e => {
    board.reveal([+(e.target.dataset.row), +(e.target.dataset.col)]);
    render(boardEl, board);
  });
  $l(".tile").on("contextmenu", e => {
    e.preventDefault();
    board.flag([+(e.target.dataset.row), +(e.target.dataset.col)]);
    render(boardEl, board);
    return false;
  });
};

$l(function() {
  let board = new Board(16, 16, 28);
  let boardEl = $l("#board");
  render(boardEl, board);
});
