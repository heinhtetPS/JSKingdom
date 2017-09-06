# JSKingDOM

Be the king of the DOM elements inside your HTML page and rule them with an iron fist.

JSKingDOM is a simple DOM interaction library inspired by Jquery that allows users to easily access and manipulate DOM elements. With JSKingDOM, Users will be able to:
- select and find single or multiple DOM elements
- change DOM attributes such as class or id
- Handle DOM events
- Send AJAX requests

### The power of $k

Legend says that he or she who wields the King's symbol of power will obtain the divine influence that can command the will of others. In our case, our sacred symbol is $k. $k showcases the core functionality of JSKingDOM by allowing users to select and command your DOM elements as you please.

- You can select HTML element types such as spans or divs by simply providing a string argument to the king's symbol ($k).
- You can also select particular classNames or IDs by providing those as arguments

## How it Works

```javascript
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
```

At its core, JSKingDOM works by converting regular html page elements like divs or lis into a custom object called "DOMNodeCollection". The code snippet above highlights where the $k gets its powers from. Once the element has entered this state, we are able to manipulate it using various methods I have written into the prototype of the DOMNodeCollection class.


## Functions & Methods

Below are some examples of how users can manipulate DOM elements once they have succumb to the power of $k:

Note that functions can be chained and used consequetively.

### each(callback)
Shorthand for running a ForEach loop that applies the callback to all included DOM elements.

### toggleClass(classToToggle)
Toggles a className on or off for the included DOM elements. Simple addClass and removeClass methods are also available.

### parent() and children()
Easily finds the parents or children of the provided DOM element.

### on(eventType, callback) or off(eventType)
Used to set or remove event Listeners from particular DOM elements.

### $k.ajax(options)
Sends an ajax request that fetches data asynchronously.

## Demo

To explore the functionality and efficacy of the King's symbol, a sandbox environment has been constructed, in which users can see and interact with concrete examples of the $k in use. Please check out this live demo and see for yourself.  
