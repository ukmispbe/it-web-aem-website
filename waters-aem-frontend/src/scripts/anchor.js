import scrollToY from './scrollTo';
import screenSizes from './screenSizes';
import sticky, { scrollListener } from './stickyService';

var anchorElement = document.querySelector('.cmp-anchor');
var anchorMenu = document.querySelector('.cmp-anchor__list-heading');

// Setup click handler for Anchor Links to scroll in view
var anchorLinks = document.querySelectorAll('.cmp-anchor__link');
[].forEach.call(anchorLinks, anchor => {
    try {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const anchorSticky = document.getElementsByClassName(
                'cmp-anchor--sticky'
            );
            const hasSku = document.getElementsByClassName(
                'cmp-sku-details--sticky'
            );

            setTimeout(() => {
                const href = e.target.getAttribute('href').replace(/#/gi, '');
                const block = document.getElementById(href);
                const blockTop = block.offsetTop;
                let topDistance = blockTop - 16;
                console.log('has sku on page: ', hasSku.length);
                if (!anchorSticky.length) {
                    console.log('hello');
                    topDistance += 70;
                }

                if (hasSku.length === 0) {
                    topDistance += 80;
                    if (anchorSticky.length) {
                        topDistance += 20;
                    }
                }

                scrollToY(topDistance, 1000, 'easeOutSine');

                anchorLinks.forEach(anchor => {
                    anchor.classList.remove('active');
                });

                anchor.classList.add('active');
                if (screenSizes.isMobile()) {
                    toggleMobileNav(true);
                }
            }, 0);
        });
    } catch (e) {
        // ignore
    }
});
let anchorDestinations = [];

const setAnchorDestinations = () => {
    for (let i = 0; i <= anchorLinks.length; i++) {
        const anchor = anchorLinks[i];

        if (anchor) {
            anchor.classList.remove('active');
            anchorDestinations.push({
                id: anchor.getAttribute('href'),
                anchor: anchor,
            });
        }
    }
};
let brokeAt = 0;

const anchorScrollSpy = () => {
    let multipleInView = [];
    if (anchorDestinations) {
        for (let n = 0; n <= anchorDestinations.length; n++) {
            const id = anchorDestinations[n]
                ? anchorDestinations[n].id.replace(/#/gi, '')
                : undefined;
            const link = anchorDestinations[n]
                ? anchorDestinations[n].anchor
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
                    brokeAt = n;
                    multipleInView.push(n);
                } else {
                    link.classList.remove('active');
                }
            }

            if (multipleInView.length > 1) {
                for (let i = 1; i < multipleInView.length; i++) {
                    const inView = multipleInView[i];

                    anchorDestinations[inView].anchor.classList.remove(
                        'active'
                    );
                }
            }
        }
    }
};

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
    el.classList.add('show-scroll-bar');
}

function hideScrollBars(el) {
    el.classList.remove('show-scroll-bar');
}

function anchorChange(el) {
    clearGradients();
    var anchorElementId = document.getElementById('cmp-anchor');
    if (anchorElementId.scrollLeft > 0) {
        lhsGradientFade[0].style.display = 'block';
    }

    if (
        Math.ceil(
            anchorElementId.scrollWidth -
                anchorElementId.getBoundingClientRect().width
        ) != Math.ceil(anchorElementId.scrollLeft)
    ) {
        rhsGradientFade[0].style.display = 'block';
    }
}

function clearGradients() {
    rhsGradientFade[0].style.display = 'none';
    lhsGradientFade[0].style.display = 'none';
}

function resizeWindow(el) {
    anchorChange(el);
    var hasHorizontalScrollbar = el.scrollWidth > el.clientWidth;
    if (!hasHorizontalScrollbar) {
        clearGradients();
    }
}

function scrollWindow(el) {
    anchorChange(el);
    var hasHorizontalScrollbar = el.scrollWidth > el.clientWidth;
    if (!hasHorizontalScrollbar) {
        clearGradients();
    }
}

var anchorList = document.querySelector('.cmp-anchor__list');
var rhsGradientFade = document.getElementsByClassName(
    'cmp-anchor-gradient-right'
);
var lhsGradientFade = document.getElementsByClassName(
    'cmp-anchor-gradient-left'
);

if (anchorList) {
    const isMobile = screenSizes.isMobile();
    const sectionContainers = document.querySelectorAll(
        '.cmp-section-container--collapse'
    );

    if (isMobile && sectionContainers.length) {
        anchorElement.style.display = 'none';
    } else {
        if (anchorElement) {
            setAnchorDestinations();

            scrollListener(anchorScrollSpy);
            sticky.add({
                element: anchorElement,
                priority: 2,
                modifier: 'cmp-anchor--sticky',
                offset: {
                    position: 'top',
                    amount: 13,
                },
                fillHeight: 52,
                stickyHeight: 53,
                stickyWith: document.querySelector('.cmp-sku-details')
                    ? 'cmp-sku-details--sticky'
                    : '',
            });
        }

        if (anchorMenu) {
            anchorMenu.addEventListener('click', () => toggleMobileNav());
        }

        anchorList.addEventListener('mouseover', () =>
            showScrollBars(anchorList)
        );

        anchorList.addEventListener('mouseout', () =>
            hideScrollBars(anchorList)
        );

        anchorList.addEventListener('scroll', () => scrollWindow(anchorList));
        window.addEventListener('load', () => resizeWindow(anchorList));
        window.addEventListener('resize', () => resizeWindow(anchorList));
        var mediaQueryListener = window.matchMedia('(max-width: 650px)');

        function anchorChangeToMobile() {
            if (isMobile) {
                clearGradients();
            }
        }

        mediaQueryListener.addListener(anchorChangeToMobile);
    }
}