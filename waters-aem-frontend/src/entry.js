// main JS and SCSS entry file

import './styles/index.scss';
import './scripts/stickyService';
import './scripts/backtotop';
import './scripts/anchor';
import './scripts/sticky-sort-filter';
import './scripts/sticky-sku-details';
import './scripts/sticky-sku-scroll';
import './scripts/mobile-search-scroll';
import './scripts/navigation-overlay';
import './scripts/navigation';
import './scripts/navigation-level2';
import './scripts/iframe';
import './scripts/backtosearch';
import './scripts/footer';
import './scripts/banner';
import './scripts/breadcrumb';
import './scripts/header';
import './scripts/collapsible';
import './scripts/skulist';
import './index';

import cssVars from 'css-vars-ponyfill';
import inlineSVG from './scripts/inlineSVG';

const japanTheme = {
    "--font-weight-light": "lighter",
    "--font-weight-regular": "normal",
    "--font-weight-bold": "bold"
};

const isJapanese = (document.documentElement.lang == "ja");

cssVars({
    variables: (isJapanese ? japanTheme : Object.assign({})),
    include: 'style,link[rel="stylesheet"]:not([href*="//"])'
});

inlineSVG.init('img.inline-svg', 'svg-inlined');

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
