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
};

document.addEventListener('DOMContentLoaded', SKUDetatilsSticky);
