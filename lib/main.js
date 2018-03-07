const DOMNodeCollection = require("./dom_node_collection.js");

let docReady = false;
const docReadyCallbacks = [];

  const $k = (arg) => {
    switch(typeof(arg)){
      case "function":
        return callOrStoreCallback(arg);
      case "string":
        return getNodesFromDom(arg);
      case "object":
        if(arg instanceof HTMLElement){
          return new DOMNodeCollection([arg]);
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

$k.ajax = (options) => {
  const xhr = new XMLHttpRequest();
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

getNodesFromDom = (selector) => {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DOMNodeCollection(nodesArray);
};


window.$k = $k;

//Below here are the demos of the special effects that use the tools above

//swapping colors on boxes
$k( () => {
  $k('.third-box').on('click', () => {
    $k('.first-box').toggleClass('swap');
    $k('.second-box').toggleClass('swap');
    $k('.third-box').toggleClass('swap');
  });
});

  //Generate new li elements
  $k( () => {
    $k('.adder').on('click', () => {
      $k('.link-list').append('<li>A new HTMLElement is generated!</li>');
    });
  })

  //make crazy colors animate on the background
  $k( () => {
    $k('.colors').on('click', () => {
      $k('.page-container').toggleClass('crazy');
    });
  })

  //AJAX call that gets the weather
  $k( () => {
    $k('.weather').on('click', () => {
      $k.ajax({
        type: 'GET',
        url: "http://api.openweathermap.org/data/2.5/weather?id=5128581&appid=bcb83c4b54aee8418983c2aff3073b3b",
        success(data) {
          buildWeather(JSON.parse(data.target.response));
        },
        error() {
          console.error("An error has occured.")
        }
      })
    });
  })

  const buildWeather = (data) => {
  let theDate = new Date();
  let y = theDate.getFullYear();
  let m = theDate.getMonth() + 1;
  let d = theDate.getDate();
  let dateElement = '<p>Today: ' + m + "/" + d + "/" + y + '</p>'

  let forecastElement = '<p>Forecast: ' + data.weather[0].main + ', ' + data.weather[0].description

  let minElement = '<p>Temp(Min): ' + data.main.temp_min
  let maxElement = '<p>Temp(Max): ' + data.main.temp_max

  let icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`

  $k('.weather-results').append('<h2>Weather in NYC</h2>')
  $k('.weather-results').append(dateElement)
  $k('.weather-results').append(forecastElement)
  $k('.weather-results').append(minElement)
  $k('.weather-results').append(maxElement)
  $k('.weather-icon').attr('src', icon)
}

module.exports = effects.js
