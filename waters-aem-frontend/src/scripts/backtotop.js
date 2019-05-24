import scrollToY from './scrollTo';

var isInViewport = function(elem) {
    var distance = elem.getBoundingClientRect();

    return distance.top <= document.documentElement.clientHeight;
};

//var getOffset =  function(elem) {
//    var rect = elem.getBoundingClientRect();
//    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
//    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
//};

var resizeFilterSortContainer = function() {
    var filerSortContainerList = document.getElementsByClassName(
        'cmp-search__sort-filter__container'
    );
    var filerSortContainer = filerSortContainerList[0];
    var bannerList = document.getElementsByClassName('banner');
    var banner = bannerList[0];
    var bannerWidth = banner.clientWidth;
    //console.log('bannerWidth : ' + bannerWidth);
    var containerWidth = bannerWidth / 4.2;
    filerSortContainer.style.width = containerWidth + 'px';
};

var goTopBtn = document.querySelector('.cmp-back-to-top');
var originalTopPos = 0;
var gotBottomPosition = false;
var bottomPosition = 0;

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
    let isDesktop = window.matchMedia('(min-width: 1200px)').matches;
    const headerHeight = document.querySelector('.cmp-external-header')
        .offsetHeight;

    var filerSortContainerList = document.getElementsByClassName(
        'cmp-search__sort-filter__container'
    );
    var filerSortContainer = filerSortContainerList[0];

    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (isDesktop) {
        if (originalTopPos === 0) {
            originalTopPos =
                filerSortContainer.getBoundingClientRect().top + scrollTop;
        }
        resizeFilterSortContainer();

        if (scrolled > originalTopPos) {
            filerSortContainer.classList.add('sort-filter-container-sticky');
        } else {
            filerSortContainer.classList.remove('sort-filter-container-sticky');
        }
    }

    if (scrolled > coords * 2) {
        goTopBtn.classList.add('cmp-back-to-top-show');
    }

    if (scrolled < coords) {
        goTopBtn.classList.remove('cmp-back-to-top-show');
    }

    if (isInViewport(footer)) {
        if (gotBottomPosition === false) {
            bottomPosition = scrolled;
            gotBottomPosition = true;
            filerSortContainer.style.top =
                scrolled - (1 / 2) * coords + 74 + 'px';
        }

        goTopBtn.classList.add('cmp-back-to-top-affix');
        filerSortContainer.classList.add('sort-filter-container-affix');
    } else {
        goTopBtn.classList.remove('cmp-back-to-top-affix');
        filerSortContainer.classList.remove('sort-filter-container-affix');
        gotBottomPosition = false;
        bottomPosition = 0;
        filerSortContainer.style.top = '';
    }
}

window.addEventListener('scroll', trackScroll);
window.addEventListener('resize', resizeFilterSortContainer);
goTopBtn.addEventListener('click', () => {
    scrollToY(0, 1500, 'easeOutSine');
});
