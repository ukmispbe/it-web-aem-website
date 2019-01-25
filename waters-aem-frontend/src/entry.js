// main JS and SCSS entry file

import './styles/index.scss';
import './scripts/backtotop';
import './scripts/share';
import './scripts/anchor';

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
    const desc = document.querySelectorAll('.cmp-list__item-description-text');
    let num = 0;
    for (let i = 0; i <= desc.length; i++) {
        if (document.querySelectorAll('.cmp-list__item-description-text')[i]) {
            const eel = desc[i];
            if (eel) {
                while (eel.clientHeight > eel.parentElement.clientHeight) {
                    if (num >= 2000) break;
                    const text = eel.innerText;
                    eel.innerText = text.replace(/\W*\s(\S)*$/, '…');
                    num++;
                }
            }
        }
    }
}

addEllipses();
window.addEventListener('resize', addEllipses);
