import sticky from './stickyService';

const SKUDetatilsSticky = () => {
    sticky.add({
        element: document.querySelector('.cmp-sku-details'),
        priority: 1,
        modifier: 'cmp-sku-details--sticky',
        offset: {
            position: 'bottom',
            amount: 60,
        },
        fillHeight: 50,
        stickyHeight: 100,
    });

    const anchorSticky = document.querySelector('.cmp-anchor');
    const targetElement = document.querySelector('.cmp-sku-details');

    if (anchorSticky) {
        targetElement.addEventListener('Sticky-Stuck', function() {
            anchorSticky.setAttribute('data-overrideScroll', true);
        });

        targetElement.addEventListener('Sticky-Unstuck', function() {
            anchorSticky.setAttribute('data-overrideScroll', false);
        });
    }
};

document.addEventListener('DOMContentLoaded', SKUDetatilsSticky);
