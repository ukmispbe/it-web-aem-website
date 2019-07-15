import screenSizes from './screenSizes';
import Sticky from './sticky';
import domElements from './domElements';

const SortFilterSticky = () => {
    // make sort filter sticky on mobile only
    if (screenSizes.isMobile()) {
        const headerElement = domElements.getHeader();
        const topTreshold = headerElement ? headerElement.getBoundingClientRect().bottom : 0;
        const topSticky = topTreshold === 0 ? 0 : topTreshold - 1;
        const stickyFunc = Sticky('btn-show-sort-filter', 'btn-show-sort-filter--sticky', topTreshold, topSticky);

        if (stickyFunc) {
            // target element was found so proceed with binding the event listener
            const sortFilterStickyEventListener = function() {
                // need to recheck screen size in case user rotates device
                if (!screenSizes.isMobile()) { return }

                // execute the sticky function
                stickyFunc();
            }

            window.addEventListener('scroll', sortFilterStickyEventListener);
        }
    }
}

document.addEventListener('DOMContentLoaded', SortFilterSticky);