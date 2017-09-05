const DOMNodeCollection = require('./dom_node_collection.js');

let docReady = false;
const docReadyCallbacks = [];

  const $k = function(arg) {
    switch(typeof(arg)){
      case "function":
        return callOrStoreCallback(arg);
      case "string":
        //return all els as array with selector
        nodes_array = Array.from(document.querySelectorAll(arg));
        return nodes_array;
        //convert this to DOMNodeCollection
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



window.$k = $k;