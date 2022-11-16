
import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {showModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => showModal('.modal',modalTimerId), 50000);

    tabs('.tabheader__item','.tabcontent', '.tabheader__items','tabheader__item_active');
    modal("[data-modal]",'.modal', modalTimerId);
    timer('.timer','2022-12-20');
    cards();
    calc();
    forms('form',modalTimerId);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        slide: '.offer__slide',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        currentCounter: '#current'
    });
});




