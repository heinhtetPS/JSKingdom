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
