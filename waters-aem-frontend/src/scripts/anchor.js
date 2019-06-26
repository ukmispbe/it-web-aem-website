import scrollToY from './scrollTo';

var anchorElement = document.querySelector('.cmp-anchor');
var anchorMenu = document.querySelector('.cmp-anchor__list-heading');

// Setup click handler for Anchor Links to scroll in view
var anchorLinks = document.querySelectorAll('.cmp-anchor__link');
[].forEach.call(anchorLinks, (anchor) => {
    try {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            anchorElement.classList.add('cmp-anchor--sticky');
            setTimeout(() => {
                const href = e.target.getAttribute('href').replace(/#/gi, '');
                const block = document.getElementById(href);
                const blockTop = block.offsetTop;

                scrollToY(blockTop - 140, 1000, 'easeOutSine');

                anchorLinks.forEach(anchor => {
                    anchor.classList.remove('active');
                });

                anchor.classList.add('active');
                toggleMobileNav(true);
            }, 0);
        });
    } catch (e) {
        // ignore
    }
});

// Sticky Nav Component
var anchorSticky = (function () {
    var CSS_CLASS_ACTIVE = 'cmp-anchor--sticky';

    var Sticky = {
        element: null,
        position: 0,
        addEvents: function () {
            window.addEventListener('scroll', this.onScroll.bind(this));
        },
        init: function (element) {
            this.element = element;
            this.addEvents();
            this.position = element.offsetTop;
            this.onScroll();
            this.anchorDestinations = [];

            this.element.parentNode.style.height =
                this.element.clientHeight + 'px';

            for (let i = 0; i <= anchorLinks.length; i++) {
                const anchor = anchorLinks[i];

                if (anchor) {
                    anchor.classList.remove('active');
                    this.anchorDestinations.push({
                        id: anchor.getAttribute('href'),
                        anchor: anchor,
                    });
                }
            }

            this.getInViewElement();
        },
        aboveScroll: function () {
            return this.position - 73 < window.pageYOffset;
        },
        onScroll: function () {
            if (this.aboveScroll()) {
                this.setFixed();
                
            } else {
                this.setRelative();
            }
            this.getInViewElement();
        },
        setFixed: function () {
            this.element.parentNode.style.height =
                this.element.clientHeight + 'px';
            this.element.classList.add(CSS_CLASS_ACTIVE);
        },
        setRelative: function () {
            this.element.classList.remove(CSS_CLASS_ACTIVE);
            this.element.parentNode.style.height = 'auto';
        },
		brokeAt: 0,
        getInViewElement: function() {
            let multipleInView = [];
            if (this.anchorDestinations) {
                for (let n = 0; n <= this.anchorDestinations.length; n++) {
                    const id = this.anchorDestinations[n]
                        ? this.anchorDestinations[n].id.replace(/#/gi, '')
                        : undefined;
                    const link = this.anchorDestinations[n]
                        ? this.anchorDestinations[n].anchor
                        : undefined;

                    if (id && link) {
                        const element = document.getElementById(id);
                        const elementBoundaries = element.getBoundingClientRect();
                        const elementTop = elementBoundaries.top;
                        const elementBottom = elementBoundaries.bottom;
                        const docHeight = document.documentElement.clientHeight;
                        const halfwayUpPage = docHeight / 1.4;
                        const stillOnPage = docHeight / 1.55;

                        if (
                            (elementTop >= 75 &&
                                elementTop <= docHeight &&
                                elementTop <= halfwayUpPage) ||
                            (elementTop < 150 && elementBottom >= stillOnPage)
                        ) {
                            link.classList.add('active');
                            this.brokeAt = n;
                            multipleInView.push(n);
                        } else {
                            link.classList.remove('active');
                        }
                    }
                }

                if (multipleInView.length > 1) {
                    for (let i = 1; i < multipleInView.length; i++) {
                        const inView = multipleInView[i];

                        this.anchorDestinations[inView].anchor.classList.remove(
                            'active'
                        );
                    }
                }
            }
        },
    };

    return Sticky;
})();

//  Init Sticky
if (anchorElement) anchorSticky.init(anchorElement);

function toggleMobileNav(forceClose) {

    const heading = document.querySelector('.cmp-anchor--sticky');
    if (!forceClose && heading.classList.contains('closed')) {
        heading.classList.remove('closed');
        heading.classList.add('open');
    } else {
        heading.classList.add('closed');
        heading.classList.remove('open');
    }
}

function showScrollBars(el) {
    el.classList.add("show-scroll-bar");
}

function hideScrollBars(el) {
    el.classList.remove("show-scroll-bar");
}


function anchorChange(el) {

    var anchorRect = el.getBoundingClientRect();
    var anchorStartPosition = anchorRect.left;
    var listItems = document.querySelectorAll('.cmp-anchor__list-item');

    for (var i = 0; i < listItems.length; i++) {
        var rect = listItems[i].getBoundingClientRect();
        clearRHSGradients();

        if (rect.left - anchorStartPosition + rect.width > el.clientWidth + 5) {
            listItems[i].classList.add("rhs-gradient-fade");
            break;
        }
    }
}

function anchorChangeScroll(el) {

    var anchorRect = el.getBoundingClientRect();
    var anchorStartPosition = anchorRect.left;
    var listItems = document.querySelectorAll('.cmp-anchor__list-item');

    for (var i = 0; i < listItems.length; i++) {
        var rect = listItems[i].getBoundingClientRect();

        clearLHSGradients();

        if ((rect.left - anchorStartPosition + rect.width > 10) && (rect.left - anchorStartPosition < 80) && (el.scrollLeft > 2)) {

            listItems[i].classList.add("lhs-gradient-fade");
            break;
        }

    }

    for (i = 0; i < listItems.length; i++) {

        rect = listItems[i].getBoundingClientRect();
        clearRHSGradients();
        if (rect.left - anchorStartPosition + rect.width > el.clientWidth + 10 &&  (el.scrollLeft + el.clientWidth < el.scrollWidth - 2) ) {

            listItems[i].classList.add("rhs-gradient-fade");
            break;
        }
    }
}

function resizeWindow(el) {
    anchorChange(el);
    var hasHorizontalScrollbar = el.scrollWidth > el.clientWidth;
    if (!hasHorizontalScrollbar) {
        clearRHSGradients();
        clearLHSGradients();
    }
}

function scrollWindow(el) {
    anchorChangeScroll(el);
    var hasHorizontalScrollbar = el.scrollWidth > el.clientWidth;
    if (!hasHorizontalScrollbar) {
        clearRHSGradients();
        clearLHSGradients();
    }
}


function clearRHSGradients() {
    var listItems = document.querySelectorAll('.cmp-anchor__list-item');
    for (var j = 0; j < listItems.length; j++) {
        listItems[j].classList.remove("rhs-gradient-fade");
        listItems[j].classList.remove("rhs-gradient-fade-selected");
    }
}

function clearLHSGradients() {
    var listItems = document.querySelectorAll('.cmp-anchor__list-item');
    for (var j = 0; j < listItems.length; j++) {
        listItems[j].classList.remove("lhs-gradient-fade");
        listItems[j].classList.remove("lhs-gradient-fade-selected");
    }
}

window.addEventListener('scroll', anchorSticky);
if (anchorMenu) {
    anchorMenu.addEventListener('click', () => toggleMobileNav());
}



var anchorList = document.querySelector('.cmp-anchor__list');
if (anchorList){
    anchorList.addEventListener('mouseover', () => showScrollBars(anchorList));
    anchorList.addEventListener('mouseout', () => hideScrollBars(anchorList));
    anchorList.addEventListener('scroll', () => scrollWindow(anchorList));
    window.addEventListener('load', () => resizeWindow(anchorList));
    window.addEventListener('resize', () => resizeWindow(anchorList));
    var mediaQueryListener = window.matchMedia('(max-width: 650px)');
    function anchorChangeToMobile() {
        if (mediaQueryListener.matches) {
            clearGradients();
        }
    }
    mediaQueryListener.addListener(anchorChangeToMobile);
}

