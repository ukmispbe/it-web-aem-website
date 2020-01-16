import sticky from './stickyService';
import SkuDetails from './sku-details';

const SkuDetailsSticky = () => {
    if (SkuDetails.okToConfigureSticky()) {
        sticky.add({
            element: SkuDetails.element(),
            priority: 1,
            modifier: 'cmp-sku-details--sticky',
            offset: {
                position: 'bottom',
                amount: 60,
            },
            conditions: (element) => {
                if (SkuDetails.preventSticky()) {
                    // do not show sticky on mobile for discontinued items
                    // because the sticky will show a blank space since users
                    // will not see the quantity and add to cart button
                    return false;
                }

                return SkuDetails.allowSticky();
            },
            fillHeight: 50,
            stickyHeight: 92,  // setting to 92px to remove gap between anchor and sku-details sticky
        });
    } 
};

document.addEventListener('DOMContentLoaded', SkuDetailsSticky);

export default SkuDetailsSticky;