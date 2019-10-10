import scrollToElement from './scrollToElement';
import screenSizes from './screenSizes';
import Fader from './fade-x';
import sticky, { scrollListener } from './stickyService';
import SkuDetails from './sku-details';

var anchorElement = document.querySelector('.cmp-anchor');
var anchorMenu = document.querySelector('.cmp-anchor__list-heading');
let ancFader = null;

const skuDetailsExists = SkuDetails.exists();
const skuDiscontinued = SkuDetails.discontinued();

// Setup click handler for Anchor Links to scroll in view
var anchorLinks = document.querySelectorAll('.cmp-anchor__link');
[].forEach.call(anchorLinks, anchor => {
    try {
        anchor.addEventListener('click', e => {
            e.preventDefault();

            setTimeout(() => {
                const href = e.target.getAttribute('href').replace(/#/gi, '');
                const anchorClickOffset = !skuDetailsExists || (screenSizes.isMobile() && skuDiscontinued) ? 52 : 143;

                scrollToElement(href, 1000, 'easeOutSine', true, anchorClickOffset);
                
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

const activeClassName = "active";

const setAnchorState = (index, isActive) => {
    if (isActive) {
        anchorDestinations.forEach(item => item.anchor.classList.remove(activeClassName));
        anchorDestinations[index].anchor.classList.add(activeClassName);
    } else {
        anchorDestinations[index].anchor.classList.remove(activeClassName);
    }
}

const atBottomOfPage = () => (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight;

const anchorScrollSpy = () => {
    if (!anchorElement || !anchorDestinations) { return; }
    
    const anchorElementBottom = anchorElement.getBoundingClientRect().bottom;
    const docHeight = document.documentElement.clientHeight;

    anchorDestinations.forEach((item, index) => {
        const id = item.id.replace(/#/gi, '');
        const elementBoundaries = document.getElementById(id).getBoundingClientRect();
        const elementTop = elementBoundaries.top;
        const elementBottom = elementBoundaries.bottom;
        const isBottomAboveContainer = elementBottom < anchorElementBottom;

        if (index === 0)  {
            const thresholdMarker = docHeight / 1.4;
            const isAboveThresholdMarker = elementTop <= thresholdMarker;
            const isBetweenContainerAndThresholdMarker = !isBottomAboveContainer && isAboveThresholdMarker;

            setAnchorState(index, isBetweenContainerAndThresholdMarker);
        } else if (index === anchorDestinations.length - 1) {
            const thresholdMarker = docHeight * .34;
            const isAboveThresholdMarker = elementTop <= thresholdMarker;
            const isBetweenContainerAndThresholdMarker = !isBottomAboveContainer && isAboveThresholdMarker;

            if (atBottomOfPage() && isBetweenContainerAndThresholdMarker) {
                setAnchorState(index, true);
            } else {
                const isActive = !isBottomAboveContainer && elementTop <= anchorElementBottom;

                setAnchorState(index, isActive);
            }
        } else {
            const isActive = !isBottomAboveContainer && elementTop <= anchorElementBottom;

            setAnchorState(index, isActive);
        }
    });
}

function anchorHide() {
    if (document.getElementsByClassName('cmp-section-container--collapse').length > 0){
        document.getElementsByClassName('anchor')[0].style.display = 'none'
    } else {
        document.getElementsByClassName('anchor')[0].style.display = 'block'
    }
}

function toggleMobileNav(forceClose) {
    const heading = document.querySelector('.cmp-anchor--sticky');
    if (!forceClose && heading && heading.classList.contains('closed')) {
        heading.classList.remove('closed');
        heading.classList.add('open');
    } else if (heading) {
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
      ancFader = Fader('cmp-anchor__list', 0, 75, false, true);

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
    if(screenSizes.isMobile()){
        anchorHide();
    }

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

    function anchorChangeToMobile(e) {
        if (e.matches) {
            anchorHide();
            clearGradients();
        } else {
            clearOpenContainers();
            document.getElementsByClassName('anchor')[0].style.display = "block"
        }
    }

    mediaQueryListener.addListener(anchorChangeToMobile);
}