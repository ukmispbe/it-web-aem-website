// main JS and SCSS entry file

import './styles/index.scss';

// JS Code below
var inlineSVG = require('inline-svg');

inlineSVG.init({
    svgSelector: 'img.inline-svg', // the class attached to all images that should be inlined
    initClass: 'svg-inlined', // class added to <html>
}, function () {

});

function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
        goTopBtn.classList.add('back-to-top-show');
    }

    if (scrolled < coords) {
        goTopBtn.classList.remove('back-to-top-show');
    }
}

function backToTop() {
    if (window.pageYOffset > 0) {
        window.scrollBy(0, -80);
        setTimeout(backToTop, 0);
    }
}

var goTopBtn = document.querySelector('.cmp-back-to-top');

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);