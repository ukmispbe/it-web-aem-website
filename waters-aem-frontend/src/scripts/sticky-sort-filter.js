import screenSizes from './screenSizes';
import Sticky from './sticky';

const SortFilterSticky = () => {
    // make sort filter sticky on mobile only
    if (screenSizes.isMobile()) {
        const stickyFunc = Sticky('btn-show-sort-filter', 'btn-show-sort-filter--sticky', 0, 0);

        if (stickyFunc) {
            // target element was found so proceed with binding the event listener
            const sortFilterStickyEventListener = function() {
                // need to recheck screen size in case user rotates device
                if (screenSizes.isMobile()) { 
                    // execute the sticky function
                    stickyFunc();
                 }
            }

            window.addEventListener('scroll', sortFilterStickyEventListener);
        }
    }
}

document.addEventListener('DOMContentLoaded', SortFilterSticky);