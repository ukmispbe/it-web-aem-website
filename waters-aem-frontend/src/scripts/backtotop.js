import scrollToY from './scrollTo';
import { scrollListener } from './stickyService';

const isInViewport = function(elem) {
    const distance = elem.getBoundingClientRect();

    return distance.top <= window.innerHeight;
};

const goTopBtnFixed = document.querySelector('.cmp-back-to-top');
const goTopBtnRelative = document.querySelector('.cmp-back-to-top--relative');

function trackScroll() {
    const scrolled = window.pageYOffset;
    const coords = window.innerHeight;
    const footer = document.querySelector('.cmp-footer');
    const footerInViewport = isInViewport(footer);
    const showToGoTopBtn = scrolled > coords * 2;

    // the following conditions toggle the visibility of a fixed and relative "back-to-top" buttons
    // and the conditions will prevent the footer from flickering while the user is scrolling

    if (!footerInViewport && showToGoTopBtn && !goTopBtnFixed.classList.contains('cmp-back-to-top-show')) {
        // user has scrolled down enough to show the button
        // adding the style will transition the visibility of the button to show
        goTopBtnFixed.classList.add('cmp-back-to-top-show');
    } else if (!footerInViewport && !showToGoTopBtn) {
        // user has scrolled up enough to hide the button
        // removing the style will transition the visibility of the button to hide
        goTopBtnFixed.classList.remove('cmp-back-to-top-show');
    } else if (footerInViewport && goTopBtnFixed.style.display === "") {
        // user has scrolled down enough that the footer is visible
        // show the relative button and this will prevent the footer from flickering
        // set the display of the fixed button to "none" to immediately hide the button and avoid the CSS transition
        goTopBtnRelative.classList.add('cmp-back-to-top-show');
        goTopBtnFixed.style.display = "none";
    } else if (!footerInViewport && goTopBtnFixed.style.display === "none") {
        // user has scrolled up enough that the footer is no longer visible
        // set the display of the fixed button to "" to immediately show the button and avoid the CSS transition
        // hide the relative button and this will prevent the footer from flickering
        goTopBtnFixed.style.display = "";
        goTopBtnRelative.classList.remove('cmp-back-to-top-show');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    scrollListener(trackScroll);
});

goTopBtnFixed.addEventListener('click', e => {
    e.preventDefault();
    scrollToY(0, 1500, 'easeOutSine');
});

goTopBtnRelative.addEventListener('click', e => {
    e.preventDefault();
    scrollToY(0, 1500, 'easeOutSine');
});