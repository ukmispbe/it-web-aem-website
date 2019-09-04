import scrollToY from './scrollTo';
import screenSizes from './screenSizes';
import Fader from './fade-x';
import sticky, { scrollListener } from './stickyService';

var anchorElement = document.querySelector('.cmp-anchor');
var anchorMenu = document.querySelector('.cmp-anchor__list-heading');
let ancFader = null;

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
                if (!anchorSticky.length) {
                    topDistance += 70;
                }

                if (hasSku.length === 0) {
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
   if (ancFader === null) {
      ancFader = Fader('cmp-anchor__list', 0, 75);

      var anchorElementId = document.getElementById('cmp-anchor');

      if (ancFader) {
         anchorElementId.addEventListener('scroll', ancFader);
      }
   }
}

function clearGradients() {
    let lhsGradient = document.querySelector('.cmp-anchor__list .fader-container--left');
    let rhsGradient = document.querySelector('.cmp-anchor__list .fader-container--right');
    
   if (lhsGradient !== null && rhsGradient !== null) {
      lhsGradient.style.display = 'none';
      rhsGradient.style.display = 'none';
   }
}

function clearOpenContainers() {
    // This closes any open containers as the user transitions to/from mobile/desktop views instead of just leaving them open
    if(document.getElementsByClassName('cmp-section-container__title open')){
        let listOfOpenTitleContainers = document.querySelectorAll('.cmp-section-container__title.open');
        let listOfOpenBodyContainers = document.querySelectorAll('.cmp-section-container__body.open');
        listOfOpenTitleContainers.forEach((record) => {
            record.classList.remove('open')
        })

        listOfOpenBodyContainers.forEach((record) => {
            record.classList.remove('open')
        })
    }
}

function resizeWindow(el) {
    var hasHorizontalScrollbar = el.scrollWidth > el.clientWidth;
    if (!hasHorizontalScrollbar) {
        clearGradients();
    }
}

function scrollWindow(el) {
   var hasHorizontalScrollbar = el.scrollWidth > el.clientWidth;
    if (!hasHorizontalScrollbar) {
        clearGradients();
    }
}

var anchorList = document.querySelector('.cmp-anchor__list');

if (anchorList) {
    const isMobile = screenSizes.isMobile();
    const sectionContainers = document.querySelectorAll(
        '.cmp-section-container--collapse'
    );

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

    anchorChange(anchorList); 

    window.addEventListener('scroll', () => scrollWindow(anchorList));
    window.addEventListener('load', () => resizeWindow(anchorList));
    window.addEventListener('resize', () => resizeWindow(anchorList));
    var mediaQueryListener = window.matchMedia('(max-width: 650px)');
    var switchToLargerMediaSizeListener = window.matchMedia('(min-width: 651px)'); //listener for if the view transitions larger

    function anchorChangeToMobile() {
        if (isMobile) {
            clearGradients();
        }
    }

    function anchorChangeToDesktop() {
        // defaults style to block, in case a user switches from mobile view to desktop view in case the anchor component has display:none
        document.getElementsByClassName('cmp-anchor')[0].style.display = "block"
        clearOpenContainers();
    }

    switchToLargerMediaSizeListener.addListener(anchorChangeToDesktop)
    mediaQueryListener.addListener(anchorChangeToMobile);
}
