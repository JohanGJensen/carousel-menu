# Carousel with Menu
small node package with tools to quickly turn a user defined object into a menu list and component set that can be
styled to work as carousel. This is a great usecase for anyone needing an interactive menu to select which carousel card will be active!

## Install
npm install --save carousel-menu

## Usage

```
const cm = require('carousel-menu');

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

const wList = document.getElementsByClassName('carousel-list-wrapper');
const wItem = document.getElementsByClassName('carousel-item-wrapper');

cm.setListAndItems(wList, wItem, items);
```

## Required
currently it is required to have an <ul> element with the class `carousel-list-wrapper` and a <div> element with the class `carousel-item-wrapper`.
these are going to be populated with list and item elements.

## Do note!
This package is besides generating elements only applying classes to those elements, meaning that the `.css` styling will have to be provided by the user.

## [Items]
The elements and list will be build from a shared config file such as <items> above.

# Methods

## setMenu(destination, items)
The setMenu method populates the <ul> element with the class `carousel-list-wrapper` with with <li class="carousel-list"> elements. It takes 2 parameters: the ul (wList) and the items

## setItems(destination, items)
The setItems method populates the <div> element with the class `carousel-item-wrapper` with with <div class="carousel-item"> elements. It takes 2 parameters: the ul (wItem) and the items

## setListAndItems(listDestination, itemDestination, items)
does both `setMenu` and `setItem` at once.