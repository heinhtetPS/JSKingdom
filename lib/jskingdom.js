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
/***/ (function(module, exports) {

// const DOMNodeCollection = require('./dom_node_collection.js');
//
const $l = function(arg) {
  switch(typeof(arg)){
    case "function":
      return registerDocReadyCallback(arg);
    case "string":
      //return all els as array with selector
      nodes_array = Array.from(document.querySelectorAll(arg));
      return nodes_array;
      //convert this later
    case "object":
      if(arg instanceof HTMLElement){
        return new DomNodeCollection([arg]);
      }
  // if (arg instanceof Function) {
  //   document.addEventListener("DOMContentLoaded", selectorReady);
  // } else {
  //   const domArray = Array.from(document.querySelectorAll(selectorReady));
  //   return new DOMNodeCollection(domArray);
  // }
};
}
//
// $l.extend = function(target, ...sources) {
//   return Object.assign(target, ...sources);
// };
//
// $l.ajax = function(options) {
//   const defaults = {
//       method: 'GET',
//       url: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b',
//       dataType: 'JSON',
//       data: null,
//       success(data) {
//         console.log("We have your weather!");
//         console.log(JSON.parse(data.currentTarget.response));
//       },
//       error() {
//         console.log('An error occured');
//       }
//   };
//   options = $l.extend(defaults, options);
//
//   const xhr = new XMLHttpRequest();
//   xhr.open(options.method, options.url);
//   xhr.onload = options.success;
//   xhr.onerror = options.error;
//
//   xhr.send(options.data);
// };
//
// // ajax({
// //   method: 'GET',
// //   url: 'dsafasdfasddf/fdsfasdf',
// //   dataType: 'JSON',
// //   data: null,
// //   success: (data) => {},
// //   failure: (error) => {}
// // })
//
window.$l = $l;


/***/ })
/******/ ]);