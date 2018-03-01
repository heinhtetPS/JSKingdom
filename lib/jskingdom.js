/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);
const Snake = __webpack_require__(2);

let docReady = false;
const docReadyCallbacks = [];

  const $k = function(arg) {
    switch(typeof(arg)){
      case "function":
        return callOrStoreCallback(arg);
      case "string":
        nodes_array = Array.from(document.querySelectorAll(arg));
        return new DomNodeCollection(nodes_array);
      case "object":
        if(arg instanceof HTMLElement){
          return new DomNodeCollection([arg]);
        }
      };
    }

   // The MAIN event: checks for ready, runs all if so
    document.addEventListener('DOMContentLoaded', () => {
      docReady = true;
      docReadyCallbacks.forEach( func => func() );
    });

$k.extend = function(target, ...sources) {
  return Object.assign(target, ...sources);
};

$k.ajax = options => {
  const defaults = {
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b',
      dataType: 'JSON',
      data: null,
      success(data) {
        console.log("We have your weather!");
        console.log(JSON.parse(data.currentTarget.response));
      },
      error() {
        console.log('An error occured');
      }
  };
  options = $k.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url, true);
  xhr.onload = options.success;
  xhr.onerror = options.error;

  xhr.send(JSON.stringify(options.data));
};


callOrStoreCallback = func => {
  if (!docReady) {
    docReadyCallbacks.push(func);
  } else {
    func();
  }
};

$k(() => {
  const canvas = $k("canvas");
  const context = canvas.getContext("2d");
})





window.$k = $k;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {

  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  each(callback) {
  this.htmlElements.forEach(callback);
}

  html(newInner) {
    //if it exists or if its clear, then set it
    if (newInner || newInner === "") {
      this.htmlElements.forEach(el => {
        el.innerHTML = newInner;
      });
    } else {
      //just return attributes of first child
      return this.htmlElements[0].innerHTML;
    }
  }

  empty() {
    this.html("");
  }

  append(newEls) {
    //GTFO if empty
    if (this.htmlElements.length === 0) return;
    //make sure new things are converted into Domnodes
    if (typeof newEls === 'object' &&
      !(newEls instanceof DomNodeCollection)) {
        newEls = $k(newEls);
      }

    if (typeof newEls === "string") {
      this.each(node => node.innerHTML += newEls);
    } else {
      this.each(node => {
        newEls.each(childNode => {
          node.appendChild(childNode.cloneNode(true))
        });
      })
    }
  }

  attr(attribute, value) {
    if (value || value === "") {
      //setter
      this.each(el => {
        el.setAttribute(attribute, value);
      });
    } else {
      //getter
      return this.htmlElements[0].getAttribute(attribute);
    }
  }

  addClass(newClass) {
    this.each(element => element.classList.add(newClass));
  }

  removeClass(oldClass) {
    this.each(element => element.classList.remove(newClass));
  }

  toggleClass(classToToggle) {
    this.each(element => element.classList.toggle(classToToggle));
  }

  children() {
    let results = [];

    this.each(el => {
      const childrenOfEl = el.children;
      childnodes = results.concat(Array.from(childrenOfEl));
    });

    return new DOMNodeCollection(results);
  }

  parent() {
    let results = [];

    this.each(el => {
      el.visited ? results.push(el) : el.visited = true;
    });

    results.forEach(el => el.visited = false);

    return new DOMNodeCollection(results);
  }

  find(selector) {
    let results = [];
    this.each(el => {
      results = results.concat(Array.from(el.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(results);
  }

  remove() {
    this.each(el => el.parentElement.removeChild(el));
  }

  on(eventType, callback) {
    this.each(el => {
      el.addEventListener(eventType, callback);
      el.eventCallback = callback;
    });
  }

  off(eventType) {
    this.each(el => {
      el.removeEventListener(eventType, el.eventCallback);
    });
  }

}

module.exports = DOMNodeCollection;


/***/ }),
/* 2 */
/***/ (function(module, exports) {


// class Snake {
//
//   directions = ["U", "D", "L", "R"];
//   body = [];
//
//
//   constructor(canvas) {
//     this.canvas = canvas;
//     this.turning = false;
//     this.dir = "U";
//   }
//
//   eatFood() {
//
//   }
//
//   occupiedSpace(array) {
//
//   }
//
//   head() {
//
//   }
//
//   isValid() {
//
//   }
//
//   move() {
//     context.fillStyle = "white";
//     context.fillRect(200, 200, 10, 20);
//   }
//
//   turn(direction) {
//
//   }
//
//
// }


/***/ })
/******/ ]);
