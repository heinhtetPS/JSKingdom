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
