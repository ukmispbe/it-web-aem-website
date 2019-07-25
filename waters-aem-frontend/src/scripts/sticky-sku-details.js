import screenSizes from './screenSizes';
import Sticky from './sticky';

const SKUDetatilsSticky = () => {
    const stickyFunc = Sticky(
        'cmp-sku-details',
        'cmp-sku-details--sticky',
        0,
        0
    );

    if (stickyFunc) {
        window.addEventListener('scroll', stickyFunc);

        const anchorSticky = document.querySelector('.cmp-anchor');
        const targetElement = document.querySelector('.cmp-sku-details');

        if (anchorSticky) {
            anchorSticky.classList.add('cmp-anchor--sticky-sku');

            targetElement.addEventListener('Sticky-Stuck', function () {
               anchorSticky.setAttribute('data-overrideScroll', true);
            });

            targetElement.addEventListener('Sticky-Unstuck', function () {
               anchorSticky.setAttribute('data-overrideScroll', false);
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', SKUDetatilsSticky);
