// main JS and SCSS entry file

import './styles/index.scss';
import './scripts/backtotop';
import './scripts/share';
import './scripts/anchor';
import $ from 'jquery';

var inlineSVG = require('inline-svg');

try {
    inlineSVG.init(
        {
            svgSelector: 'img.inline-svg', // the class attached to all images that should be inlined
            initClass: 'svg-inlined', // class added to <html>
        },
        function() {}
    );
} catch (e) {
    console.log(e);
}

function addEllipses() {
    var desc = $('.cmp-list__item-description-text');

    $(desc).each(function(index, el) {
        while (
            $(el).outerHeight() >
            $(el)
                .parent()
                .height()
        ) {
            $(el).text(function(index, text) {
                return text.replace(/\W*\s(\S)*$/, '...');
            });
        }
    });
}

addEllipses();
window.addEventListener('resize', addEllipses);
