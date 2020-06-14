// exports.exports = () => {
//     function test(text) {
//         console.log(text);
//     };
// };

const items = [
    {
        title: 'Hello Mother!',
        paragraph: '',
        bgColor: 'red',
    },
    {
        title: 'Hello Father!',
        paragraph: '',
        bgColor: 'green',
    },
    {
        title: 'Hello Brother!',
        paragraph: '',
        bgColor: '#f3a353',
    },
    {
        title: 'Hello Sister!',
        paragraph: '',
        bgColor: '#f3f3d3',
    },
    {
        title: 'Hello Friend!',
        paragraph: '',
        bgColor: '#f3f3f3',
    },
];

// string class names - menu
const lWrapper = 'carousel-list-wrapper';
const listCls = 'carousel-list';
// string class names - carousel
const wrapper = 'carousel-item-wrapper';
const selected = 'carousel-item-selected';
const itemCls = 'carousel-item';
const hovering = 'carousel-item-hover';

// DOM elements
const ELItemWrapper = document.getElementsByClassName(wrapper);
const ELItemSelected = document.getElementsByClassName(selected);
const ELitem = document.getElementsByClassName(itemCls);

const ELlistWrapper = document.getElementsByClassName(lWrapper);

// sets items into designated element
function setItems(destEl, items) {
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

        if (!selectedExists && 0 >= idx) el.className += `${selected} `;

        el.className += itemCls;

        el.setAttribute('style', `background-color: ${item.bgColor};`);
        el.uid = item.uid;

        destEl.appendChild(el);
    });

    setItemListeners(destEl);
};

setItems(ELItemWrapper, items);
// setItems(ELItemWrapper, items);

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

// sets a designated amount of li elements into a designated element
function setMenu(destEl, items) {
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

setMenu(ELlistWrapper, items);

function onEnter() {
    // add hovering class - potentially not needed
    console.log('entering!');
    this.classList.add(hovering);
};

function onLeave() {
    // remove hovering class - potentially not needed
    console.log('leaving!');
    this.classList.remove(hovering);
};

function onClick() {
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
}
