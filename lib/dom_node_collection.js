
class DOMNodeCollection {
  constructor(htmlelements) {
    this.elements = htmlelements;
  }

  html(string) {
    if(string === undefined) {
      return this.elements[0].innerHTML;
    } else {
      for(var i = 0; i < this.elements.length; i++) {
        this.elements[i].innerHTML = string;
      }
    }
  }
  
  empty() {
    this.html("");
  }
  
  append(arg){
    if (arg instanceof HTMLElement) {
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].innerHTML += arg.outerHTML;
      }  
    } else if (typeof arg === "string") {
        for (var j = 0; j < this.elements.length; j++) {
          this.elements[j].innerHTML += arg;
        }
    } else if (arg instanceof DOMNodeCollection ) {
      for (var i = 0; i < arg.elements.length; i++) {
        for (var j = 0; j < this.elements.length; j++) {
          this.elements[j].innerHTML += arg.elements[i];
        }
      }
    }
  }
  
  attr(attribute, value) {
    if (value === undefined) {
      return this.elements[0].getAttribute(attribute);
    } else {
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].setAttribute(attribute, value);
      }  
    }
  }
  
  addClass(value){
    for (var i = 0; i < this.elements.length; i++) {
      if (!this.elements[i].className) {
        this.elements[i].className = value;
      } else {
        this.elements[i].className += " " + value;
      }
    }
  }
  
  removeClass(value){
    for (var i = 0; i < this.elements.length; i++) {
      var array = this.elements[i].className.split(' ');
      array = array.filter(function(el) {
        return el !== value;
      })
      this.elements[i].className = array.join(' ');
    }
  }
  
  children() {
    var children = [];
    for (var i = 0; i < this.elements.length; i++) {
      var child = Array.from(this.elements[i].children);
      children = children.concat(child);
    }
    var result = new DOMNodeCollection(children);
    return result;
  }
}

module.exports = DOMNodeCollection;
