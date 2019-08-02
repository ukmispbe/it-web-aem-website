import screenSizes from './screenSizes';
import Sticky from './sticky';
import sticky from './stickyService';

const SortFilterSticky = () => {
    if (screenSizes.isMobile()) {
        sticky.add({
            element: document.querySelector('.btn-show-sort-filter'),
            priority: 1,
            modifier: 'btn-show-sort-filter--sticky',
            offset: {
                position: 'top',
                amount: 0,
            },
            fillHeight: 56,
            stickyHeight: 54,
        });
    }
};

document.addEventListener('DOMContentLoaded', SortFilterSticky);
