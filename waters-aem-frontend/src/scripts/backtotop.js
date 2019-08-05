import scrollToY from './scrollTo';
import { scrollListener } from './stickyService';

var isInViewport = function(elem) {
    var distance = elem.getBoundingClientRect();

    return distance.top <= document.documentElement.clientHeight;
};

var goTopBtn = document.querySelector('.cmp-back-to-top');

function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;
    var footer = document.querySelector('.cmp-footer');

    if (scrolled > coords * 2) {
        goTopBtn.classList.add('cmp-back-to-top-show');
    }

    if (scrolled < coords) {
        goTopBtn.classList.remove('cmp-back-to-top-show');
    }

    if (isInViewport(footer)) {
        goTopBtn.classList.add('cmp-back-to-top-affix');
    } else {
        goTopBtn.classList.remove('cmp-back-to-top-affix');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    scrollListener(trackScroll);
});

goTopBtn.addEventListener('click', () => {
    scrollToY(0, 1500, 'easeOutSine');
});
