import domElements from './domElements';
import { replaceTextWith } from '../utils/textTransform';
import parseQueryParams from '../utils/parse-query-params';

const scriptElement = document.getElementById('country-list-json');
const countries = scriptElement && scriptElement.innerHTML.trim() ? JSON.parse(scriptElement.innerHTML) : [];

if (Array.isArray(countries) && countries.length === 0) {
    const regionSelector = document.querySelector('.cmp-footer__selector__region');

    if(regionSelector) {
        regionSelector.classList.add('one-country');
    }
}

const languageSelector = document.querySelector('.cmp-footer__selector__language');
const languageSelectorOptions = document.querySelector('.cmp-footer__selector__language--options');

if (languageSelector) {
    const children = languageSelectorOptions && Array.prototype.slice.call(languageSelectorOptions.childNodes);
    const displayText = languageSelector.firstElementChild.innerText;
    let longestAnchor = displayText.length;

    if (children) {
        children.forEach( (e) => {
            if (e && e.tagName && e.tagName === 'A') {
                if (e.innerText && e.innerText.length > longestAnchor) {
                    longestAnchor = e.innerText.length;
                }
            }
        });


        if (longestAnchor > displayText.length) {
            const diff = longestAnchor - displayText.length;
            const spacer = " ";
            languageSelector.firstElementChild.innerText = displayText + spacer.repeat(diff*5);
        }
    }

    if (!languageSelector.classList.contains('one-link')) {
        languageSelector.addEventListener('click', () => {
            if (languageSelector.classList.contains('active')) {
                languageSelector.classList.remove('active');
            } else {
                languageSelector.classList.add('active');
            }
        });

        document.addEventListener("click", (evt) => {
            let targetElement = evt.target; // clicked element

            do {
                if (targetElement == languageSelector) {
                    return;
                }

                targetElement = targetElement.parentNode;
            } while (targetElement);

            languageSelector.classList.remove('active');
        });
    }
}

document.addEventListener('mopinion_will_show', e => {
    domElements.noScroll(true);
});

document.addEventListener('mopinion_will_hide', e => {
    domElements.noScroll(false);
});

const replaceTextOnEmailConfirmation = () => {
    const element = document.getElementById('check-your-email-confirmation-text');
    const userEmail = parseQueryParams(window.location.search)['email'] || '';
    replaceTextWith(element, { email: userEmail })
} 

replaceTextOnEmailConfirmation();
