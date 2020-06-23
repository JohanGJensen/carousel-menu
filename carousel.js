// string class names - menu
// const lWrapper = 'carousel-list-wrapper';
const listCls = 'carousel-list';
// string class names - carousel
const wrapper = 'carousel-item-wrapper';
const selected = 'carousel-item-selected';
const itemCls = 'carousel-item';
const hovering = 'carousel-item-hover';

exports.setListAndItems = (listDest, itemDest, items) => {
    this.setMenu(listDest, items);
    this.setItems(itemDest, items);
};

// sets items into designated element
exports.setItems = (destEl, items) => {
    if (!Array.isArray(items)) return;

    // provide unique ID for each item, if none exist
    for (let i = 0; items.length > i; i++) {
        if (!items[i].hasOwnProperty('uid')) getUID(items[i]);
    }

    // if collection provided, get the first element
    if (destEl instanceof HTMLCollection) destEl = destEl.item(0);

    // if destination is not element, return...
    if (!(destEl instanceof HTMLElement)) return console.warn('Warning: please provide setItems with a valid destination element!');

    let selectedExists;

    // checks destination element if there already is a selected class on one of the elements
    destEl.childNodes.forEach((node) => {
        if (!node.className) return;

        if (node.className.includes(selected)) return selectedExists = true;

        return false;
    });

    items.forEach((item, idx) => {
        let el = document.createElement('div');
        let title;
        let p;
        let img;
        let textNode;

        if (!selectedExists && 0 >= idx) el.className += `${selected} `;

        el.className += itemCls;

        el.setAttribute('style', `background-color: ${item.bgColor};`);
        el.uid = item.uid;

        if (item.title) {
            title = document.createElement('h3');
            textNode = document.createTextNode(item.title);
            title.appendChild(textNode);
            el.appendChild(title);
        }

        if (item.paragraph) {
            p = document.createElement('p');
            textNode = document.createTextNode(item.paragraph);
            p.appendChild(textNode);
            el.appendChild(p);
        }

        if (item.image && item.image.src && item.image.alt) {
            img = document.createElement('img');
            img.setAttribute('src', item.image.src);
            img.setAttribute('alt', item.image.alt);
            if (item.image.width) img.setAttribute('style', `width: ${item.image.width};`);
            if (item.image.height) img.setAttribute('style', `height: ${item.image.height};`);
            el.appendChild(img);
        }

        destEl.appendChild(el);
    });

    setItemListeners(destEl);
};

// sets a designated amount of li elements into a designated element
exports.setMenu = (destEl, items) => {
    if (!Array.isArray(items)) return;

    // provide unique ID for each item, if none exist
    for (let i = 0; items.length > i; i++) {
        if (!items[i].hasOwnProperty('uid')) getUID(items[i]);
    }

    // if collection provided, get the first element
    if (destEl instanceof HTMLCollection) destEl = destEl.item(0);

    // if destination is not element, return...
    if (!(destEl instanceof HTMLElement)) return console.warn('Warning: please provide setMenu with a valid destination element!');

    items.forEach((item) => {
        const textTitle = document.createTextNode(item.title);
        const listEl = document.createElement('li');
        const titleEl = document.createElement('p');

        // adds title to list element
        titleEl.appendChild(textTitle);

        // adds title paragraph element to li element
        listEl.appendChild(titleEl);
        listEl.uid = item.uid;

        // adds class to list element
        listEl.className += listCls;

        // adds list element to destination element
        destEl.appendChild(listEl);
    });

    setListListeners(destEl);
};

// sets event listeners on each item in array
function setItemListeners(destEl) {
    if (!(destEl instanceof HTMLElement)) return;

    if (destEl.childNodes) destEl = destEl.childNodes;

    if (!(destEl instanceof NodeList)) return console.warn('Warning Element provided does not have a nodelist!');

    destEl.forEach(el => {
        if (!el.className || el.className.includes(itemCls)) {
            el.addEventListener('mouseenter', onEnter, false);
            el.addEventListener('mouseleave', onLeave, false);
            el.addEventListener('click', onClick, false);
        }
    });
};

// sets event listeners on each item in array
function setListListeners(destEl) {
    if (!(destEl instanceof HTMLElement)) return;

    if (destEl.childNodes) destEl = destEl.childNodes;

    if (!(destEl instanceof NodeList)) return console.warn('Warning Element provided does not have a nodelist!');

    destEl.forEach(el => {
        if (!el.className || el.className.includes(listCls)) {
            el.addEventListener('click', onClick, false);
        }
    });
};

function onEnter() {
    // add hovering class - potentially not needed
    this.classList.add(hovering);
};

function onLeave() {
    // remove hovering class - potentially not needed
    this.classList.remove(hovering);
};

function onClick() {
    // DOM elements
    const ELItemWrapper = document.getElementsByClassName(wrapper);
    const ELItemSelected = document.getElementsByClassName(selected);

    if (this.className.includes(listCls)) {
        const carouselChildren = ELItemWrapper[0].childNodes;
        const self = this;

        return carouselChildren.forEach((child) => {
            if (child.uid === self.uid) {
                ELItemSelected[0].classList.remove(selected);

                return child.classList.add(selected);
            }
        });
    }

    if (!this.className.includes(selected)) {
        ELItemSelected[0].classList.remove(selected);

        this.classList.add(selected);
    }
};

function getUID(item) {
    return item.uid = Math.floor(Math.random() * Date.now());
};