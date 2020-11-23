import './styles/index.scss';
import './index';

import cssVars from 'css-vars-ponyfill';
import inlineSVG from './scripts/inlineSVG';

const japanTheme = {
    '--font-weight-light': 'lighter',
    '--font-weight-regular': 'normal',
    '--font-weight-bold': 'bold'
};

const isJapanese = document.documentElement.lang == 'ja';

cssVars({
    variables: isJapanese ? japanTheme : Object.assign({}),
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
