import sticky from './stickyService';
import LoginStatus from '../scripts/loginStatus';
import ScreenSizes from '../scripts/screenSizes';

const SKUDetatilsSticky = () => {
    const skuDetails = document.querySelector('.cmp-sku-details');
    if (skuDetails) { 
        const commerceState = skuDetails.dataset.commerce;
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
                    const commerceState = element.dataset.commerce;
                    const loggedIn = LoginStatus.state();
                    const isMobile = ScreenSizes.isMobile();

                    if (commerceState == 'PARTIAL_ENABLED') {
                        if (!loggedIn) {
                            if (isMobile) {
                                return false;
                            } else { 
                                return true;
                            }
                        } else { 
                            return true;
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