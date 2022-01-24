// JQuery like Selektoren
export const $ = document.querySelector.bind(document)
export const $$ = document.querySelectorAll.bind(document)

// JQuery like Eventhandler
Node.prototype.on = function (name, fn) {
    this.addEventListener(name, fn)
    return this
}
NodeList.prototype.on = NodeList.prototype.on = function (name, fn) {
    this.forEach((elem) => elem.on(name, fn))
    return this
}

// Array-Methoden bereitstellen
NodeList.prototype.__proto__ = Array.prototype;
HTMLCollection.prototype.__proto__ = Array.prototype;


export const createElement = (elem, attributObj) => {
    let result = document.createElement(elem)
    for (let attr in attributObj) {
        result.setAttribute(attr, attributObj[attr]);
    }
    return result;
}

export const createElementWithText = (elem, attributes, text) => {
    let result = createElement(elem, attributes)
    result.appendChild(document.createTextNode(text));
    return result;
}

