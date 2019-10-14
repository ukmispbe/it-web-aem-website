import sticky from './stickyService';
import LoginStatus from '../scripts/loginStatus';
import CheckOutStatus from '../scripts/checkOutStatus';
import Ecommerce from '../scripts/ecommerce';
import SkuDetails from './sku-details';
import screenSizes from './screenSizes';

const SKUDetatilsSticky = () => {
    if (SkuDetails.exists()) { 
        if (Ecommerce.currentState() != Ecommerce.disabled) { 
            sticky.add({
                element: SkuDetails.element,
                priority: 1,
                modifier: 'cmp-sku-details--sticky',
                offset: {
                    position: 'bottom',
                    amount: 60,
                },
                conditions: (element) => {
                    if (screenSizes.isMobile() && SkuDetails.discontinued()) {
                        // do not show sticky on mobile for discontinued items
                        // because the sticky will show a blank space since users
                        // will not see the quantity and add to cart button
                        return false;
                    }

                    if (Ecommerce.isPartialState()) {
                        return LoginStatus.state() && CheckOutStatus.state();
                    } else { 
                        return true;
                    }
                },
                fillHeight: 50,
                stickyHeight: 92,  // setting to 92px to remove gap between anchor and sku-details sticky
            });
        }
    }   
};


document.addEventListener('DOMContentLoaded', SKUDetatilsSticky);