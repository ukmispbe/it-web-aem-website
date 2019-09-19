import sticky from './stickyService';
import LoginStatus from '../scripts/loginStatus';
import CheckOutStatus from '../scripts/checkOutStatus';

const SKUDetatilsSticky = () => {
    const skuDetails = document.querySelector('.cmp-sku-details');

    if (skuDetails) { 
        const footer = document.querySelector('#footer');
        const commerceState = footer.dataset.commerce;

        if (commerceState != 'DISABLED') { 
            sticky.add({
                element: skuDetails,
                priority: 1,
                modifier: 'cmp-sku-details--sticky',
                offset: {
                    position: 'bottom',
                    amount: 60,
                },
                conditions: (element) => { 
                    const footer = document.querySelector('#footer');
                    const commerceState = footer.dataset.commerce;

                    if (commerceState == 'PARTIAL_ENABLED') {
                        if (LoginStatus.state() && CheckOutStatus.state()) {
                            return true;
                        } else { 
                            return false;
                        }
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