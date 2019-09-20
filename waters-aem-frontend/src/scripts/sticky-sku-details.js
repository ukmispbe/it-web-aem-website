import sticky from './stickyService';
import LoginStatus from '../scripts/loginStatus';
import CheckOutStatus from '../scripts/checkOutStatus';
import Ecommerce from '../scripts/ecommerce';

const SKUDetatilsSticky = () => {
    const skuDetails = document.querySelector('.cmp-sku-details');

    if (skuDetails) { 
        if (Ecommerce.currentState() != Ecommerce.disabled) { 
            sticky.add({
                element: skuDetails,
                priority: 1,
                modifier: 'cmp-sku-details--sticky',
                offset: {
                    position: 'bottom',
                    amount: 60,
                },
                conditions: (element) => {
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