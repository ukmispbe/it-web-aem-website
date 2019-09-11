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
        stickyHeight: 92,  // setting to 92px to remove gap between anchor and sku-details sticky
    });
};

document.addEventListener('DOMContentLoaded', SKUDetatilsSticky);
