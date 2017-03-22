/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(2);

class Board {
  constructor (rows, cols, numBombs) {
    this._grid = Tile.makeGrid(rows, cols, numBombs);
    this._populateCounts();
  }

  static deltas () {
    return [[-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1]];
  }

  revealBombs () {
    this._flatGrid().forEach((tile) => {
      if (tile.isBomb()) tile.reveal();
    });
  }

  reveal (pos) {
    let tile = this.getPos(pos);
    tile.reveal();
    if (tile.isEmpty()) {
      let neighbors = this.neighbors(pos);
      neighbors.forEach((neighbor) => {
        if (!this.getPos(neighbor).revealed) this.reveal(neighbor);
      });
    } else if (tile.isBomb()) {
      this.revealBombs();
      return true;
    }
    return false;
  }

  flag (pos) {
    this.getPos(pos).flag();
  }

  unflag (pos) {
    this.getPos(pos).unflag();
  }

  _populateCounts () {
    this._grid.forEach((row, rowIdx) => {
      row.forEach((tile, colIdx) => {
        if (!tile.isBomb()) {
          tile.value = this._countBombNeighbors([rowIdx, colIdx]);
        }
      });
    });
  }

  _countBombNeighbors (pos) {
    let numBombNeighbors = 0;
    let neighborTiles = this.neighbors(pos).map(this.getPos.bind(this));
    neighborTiles.forEach((tile) => {
      if (tile.isBomb()) numBombNeighbors++;
    });
    return numBombNeighbors;
  }

  isValid (pos) {
    return (pos[0] >= 0 &&
      pos[0] < this._grid.length &&
      pos[1] >= 0 &&
      pos[1] < this._grid[0].length);
  }

  render () {
    this.publicGrid().forEach((row) => {
      console.log(row.join(""));
    });
  }

  publicGrid () {
    return this._grid.map((row) => {
      return row.map((tile) => {
        return tile.public();
      });
    });
  }

  isWon () {
    let isWon = true;
    this._flatGrid().forEach((tile) => {
      if (!(tile.revealed || tile.isBomb())) isWon = false;
    });
    return isWon;
  }

  /* Returns a one-dimensional version of the grid for ease of iteration.
  */
  _flatGrid () {
    let flattened = [];
    this._grid.forEach((row) => {
      flattened = flattened.concat(row);
    });
    return flattened;
  }

  neighbors (pos) {
    let neighbors = [];
    Board.deltas().forEach((delta) => {
      let newPos = [pos[0] + delta[0], pos[1] + delta[1]];
      if (this.isValid(newPos)) neighbors.push(newPos);
    });
    return neighbors;
  }

  getPos (pos) {
    return this._grid[pos[0]][pos[1]];
  }
}

module.exports = Board;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DomNodeCollection = __webpack_require__(1);

	let readyQueue = [];

	document.addEventListener('DOMContentLoaded', function() {
	  readyQueue.forEach((f) => { f.call(document); });
	  readyQueue = [];
	});

	window.$l = function(arg){
	  if (typeof arg === "string") {
	    let list = document.querySelectorAll(arg);
	    let listArray = [].slice.call(list);
	    return new DomNodeCollection(listArray);
	  } else if (arg instanceof HTMLElement) {
	    return new DomNodeCollection([arg]);
	  } else if (arg instanceof Function){
	    if (document.readyState === "complete") {
	      arg.call(document);
	    } else {
	      readyQueue.push(arg);
	    }
	  }
	};

	$l.extend = function(...objects) {
	  if (objects.length < 2) {
	    throw 'Too few objects';
	  }
	  let newObject = objects[0];
	  objects.slice(1).forEach(function(obj){
	    Object.keys(obj).forEach(function(key) {
	        newObject[key] = obj[key];
	    });
	  });
	};

	$l.ajax_defaults = {
	  url: "",
	  method: "GET",
	  data: {},
	  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	  success: console.log,
	  error: console.log
	};

	$l.ajax = function(options) {
	  let finalOptions = {};
	  $l.extend(finalOptions, $l.ajax_defaults, options);
	  const xhr = new XMLHttpRequest();
	  xhr.open(finalOptions.method, finalOptions.url);
	  xhr.onload = function() {
	    if (xhr.status >= 200 && xhr.status < 300) {
	      finalOptions.success(JSON.parse(xhr.response));
	    } else {
	      finalOptions.error(JSON.parse(xhr.response));
	    }
	  };
	  xhr.setRequestHeader('Content-type', finalOptions.contentType);
	  xhr.send(finalOptions.data);
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DomNodeCollection {
	  constructor(els) {
	    this.els = els;
	    this.els.forEach((el) => {
	      el.listeners = [];
	    });
	  }

	  html (str) {
	    if (str === undefined) {
	      return this.els[0].innerHTML;
	    } else {
	      this.els.forEach((el) => {
	        el.innerHTML = str;
	      });
	    }
	  }

	  empty () {
	    this.html("");
	  }

	  append (arg) {
	    if (arg instanceof DomNodeCollection) {
	      this.els.forEach((el) => {
	        arg.els.forEach((argEl) => {
	          el.innerHTML+= argEl.outerHTML;
	        });
	      });
	    } else if (arg instanceof HTMLElement) {
	      this.els.forEach((el) => {
	        el.innerHTML+= arg.outerHTML;
	      });
	    } else if (typeof arg === 'string') {
	      this.els.forEach((el) => {
	        el.innerHTML+= arg;
	      });
	    }
	  }

	  attr (attrName, attrVal) {
	    if (attrVal === undefined) {
	      return this.els[0].getAttribute(attrName);
	    } else {
	    this.els.forEach((el) => {
	      el.setAttribute(attrName, attrVal);
	    });
	   }

	  }

	  addClass (className) {
	    this.els.forEach((el) => {
	      el.classList.add(className);
	    });
	  }

	  removeClass (className) {
	    this.els.forEach((el) => {
	      el.classList.remove(className);
	    });
	  }

	  children () {
	    let childrenArray = [];
	    this.els.forEach((el) => {
	      let elsChildren = [].slice.call(el.children);
	      childrenArray = childrenArray.concat(elsChildren);
	    });
	    return new DomNodeCollection(childrenArray);
	  }

	  parent () {
	    return this.els.map((el) => el.parentElement);
	  }

	  find(selector) {
	    let matchingDescendants = [];
	    this.els.forEach((el) => {
	      let elsMatchingDescendants = [].slice.call(el.querySelectorAll(selector));
	      matchingDescendants = matchingDescendants.concat(elsMatchingDescendants);

	    });
	    return new DomNodeCollection(matchingDescendants);
	  }

	  remove(selector) {
	    if (selector === undefined) {
	      this.els.map(function(el) {
	        let parent = el.parentNode;
	        parent.removeChild(el);
	      });
	      this.els = [];
	    } else {
	      let selectedDescendants = this.find(selector);
	      let newEls = arrayDifference(this.els, selectedDescendants.els);

	      selectedDescendants.remove();
	      this.els = newEls;
	    }
	  }

	  on (eventType, callback) {
	    this.els.forEach((el) => {
	      el.addEventListener(eventType, callback);
	      el.listeners.push(callback);
	    });
	  }

	  off (eventType) {
	    this.els.forEach((el) => {
	      el.listeners.forEach((callback) => {
	        el.removeEventListener(eventType, callback);
	      });
	    });
	  }

		toArray () {
			return this.els;
		}
	}

	function arrayDifference(arr1, arr2) {
	  return arr1.filter(function(el) {
	    return !arr2.includes(el);
	  });
	}
	module.exports = DomNodeCollection;


/***/ }
/******/ ]);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Tile {
  constructor(isBomb) {
    this.value = isBomb ? "b" : undefined;
    this.revealed = false;
    this.flagged = false;
  }

  static makeGrid(rows, cols, numBombs) {
    let bombArray = new Array(rows * cols);
    bombArray.fill(false);
    bombArray.fill(true, 0, numBombs);
    function _shuffleBombs() {
      for (let i = bombArray.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [bombArray[i - 1], bombArray[j]] = [bombArray[j], bombArray[i - 1]];
      }
    }
    _shuffleBombs();
    let grid = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push(new Tile(bombArray.pop()));
      }
      grid.push(row);
    }
    return grid;
  }

  reveal () {
    this.unflag();
    this.revealed = true;
  }

  flag () {
    this.flagged = true;
  }

  unflag () {
    this.flagged = false;
  }

  isEmpty() {
    return (this.value === 0);
  }

  isBomb() {
    return (this.value === "b");
  }

  public() {
    if (this.flagged) return "f";
    if (!this.revealed) return "o";
    if (this.isBomb()) return "b";
    return this.value;
  }
}

module.exports = Tile;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(0);
__webpack_require__(1);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map