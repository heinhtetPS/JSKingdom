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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

const $l = function(selectorReady) {
  if (selectorReady instanceof Function) {
    document.addEventListener("DOMContentLoaded", selectorReady);
  } else {
    const domArray = Array.from(document.querySelectorAll(selectorReady));
    return new DOMNodeCollection(domArray);
  }
};

$l.extend = function(target, ...sources) {
  return Object.assign(target, ...sources);
};

$l.ajax = function(options) {
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
  options = $l.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url);
  xhr.onload = options.success;
  xhr.onerror = options.error;

  xhr.send(options.data);
};

// ajax({
//   method: 'GET',
//   url: 'dsafasdfasddf/fdsfasdf',
//   dataType: 'JSON',
//   data: null,
//   success: (data) => {},
//   failure: (error) => {}
// })

window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {

  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  html(newInner) {
    if (newInner || newInner === "") {
      this.htmlElements.forEach(el => {
        el.innerHTML = newInner;
      });
    } else {
      return this.htmlElements[0].innerHTML;
    }
  }

  empty() {
    this.html("");
  }

  append(newEls) {
    //get the currentHTML of whatever append is being called on
    let currentHTML = this.html();
    //iterate through the new stuff and add each thing to the old html
    newEls.forEach( el => {
      currentHTML += el;
    });
    //now set the html with added stuff included
    this.html(currentHTML);
  }

  attr(attribute, value) {
    if (value || value === "") {
      //setter
      this.htmlElements.forEach(el => {
        el.setAttribute(attribute, value);
      });
    } else {
      //getter
      return this.htmlElements[0].getAttribute(attribute);
    }
  }

  addClass(newClass) {
    let replacement = (this.htmlElements[0].className += ` ${newClass}`).trim();
    this.attr('class', replacement);
  }

  removeClass(oldClass) {
    const replacement = this.htmlElements[0].className.replace(oldClass, "").trim();
    this.attr('class', replacement);
  }

  children() {
    let final = [];

    this.htmlElements.forEach(el => {
      final = final.concat(el.children);
    });

    return new DOMNodeCollection(final);
  }

  parent() {
    let final = [];

    this.htmlElements.forEach(el => {
      final = final.concat(el.parentElement);
    });

    return new DOMNodeCollection(final);
  }

  find(selector) {
    let final = [];
    this.htmlElements.forEach(el => {
      final = final.concat(Array.from(el.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(final);
  }

  remove() {
    this.htmlElements.forEach(el => {
      el.remove();
    });
  }

  on(eventType, callback) {
    this.htmlElements.forEach(el => {
      el.addEventListener(eventType, callback);
      el.eventCallback = callback;
    });
  }



  off(eventType) {
    this.htmlElements.forEach(el => {
      el.removeEventListener(eventType, el.eventCallback);
    });
  }



}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);