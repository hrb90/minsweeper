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
	}

	function arrayDifference(arr1, arr2) {
	  return arr1.filter(function(el) {
	    return !arr2.includes(el);
	  });
	}
	module.exports = DomNodeCollection;


/***/ }
/******/ ]);
