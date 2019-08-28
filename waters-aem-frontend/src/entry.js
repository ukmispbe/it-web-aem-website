// main JS and SCSS entry file

import './styles/index.scss';
import './scripts/stickyService';
import './scripts/backtotop';
import './scripts/share';
import './scripts/anchor';
import './scripts/tabs';
import './scripts/sticky-sort-filter';
import './scripts/sticky-sku-details';
import './scripts/sticky-sku-scroll';
import './scripts/navigation-overlay';
import './scripts/navigation';
import './scripts/navigation-level2';
import './scripts/iframe';
import './scripts/backtosearch';
import './scripts/footer';
import './scripts/banner';
import './scripts/header';
import './scripts/collapsible';
import './index';

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
    // console.log(e);
}

function addEllipses() {
    const desc = document.querySelectorAll('.cmp-list__item-description-text');
    let num = 0;
    if (desc) {
        for (let i = 0; i <= desc.length; i++) {
            if (
                document.querySelectorAll('.cmp-list__item-description-text')[i]
            ) {
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
}

function checkIfFirefox() {
    const firefox = window.navigator.userAgent.search('Firefox');

    if (firefox > -1) {
        const body = document.body;

        body.classList.add('column-table-support-false');
    }
}

checkIfFirefox();

addEllipses();
window.addEventListener('resize', addEllipses);
