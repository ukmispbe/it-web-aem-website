import screenSizes from './screenSizes';
import Sticky from './sticky';

const SKUDetatilsSticky = () => {
    const stickyFunc = Sticky('cmp-sku-details', 'cmp-sku-details--sticky', 0, 0);

    if (stickyFunc) {
        window.addEventListener('scroll', stickyFunc);
    }
}

document.addEventListener('DOMContentLoaded', SKUDetatilsSticky);