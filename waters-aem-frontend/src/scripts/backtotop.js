import scrollToY from './scrollTo';

var isInViewport = function(elem) {
    var distance = elem.getBoundingClientRect();

    return distance.top <= document.documentElement.clientHeight;
};

var goTopBtn = document.querySelector('.cmp-back-to-top');

window.requestAnimFrame = (function() {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
})();

function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;
    var footer = document.querySelector('.cmp-external-footer');

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

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', () => {
    scrollToY(0, 1500, 'easeOutSine');
});
