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
