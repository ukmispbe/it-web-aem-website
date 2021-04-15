import inlineSVG from './inlineSVG';
import { buildViewCartURL } from '../utils/eCommerceFunctions';

export const addQuickOrderLink = () => {
    let headerQuickOrderJson = "";
    const headerQuickOrder = document.getElementById("header-quick-order-json");
    if (headerQuickOrder) {
        headerQuickOrderJson = JSON.parse(headerQuickOrder.innerHTML);
    }

    if (headerQuickOrderJson) {
        const li = document.createElement('li');
        li.classList.add('cmp-navigation__item');
        li.classList.add('cmp-navigation__item--level-0');
        li.classList.add('cmp-navigation__group-all-mobile');
        li.setAttribute('id', 'nav-header-quick-order-link');
        li.setAttribute('data-locator', 'mobile-quick-order-container');

        const liDiv = document.createElement('div');
        liDiv.classList.add('cmp-navigation__container');
        liDiv.setAttribute('data-locator', 'mobile-quick-order');

        const liDivAnchor = document.createElement('a');
        liDivAnchor.classList.add('cmp-navigation__item-link');
        liDivAnchor.setAttribute('href', buildViewCartURL(headerQuickOrderJson.multipleItemsLink));
        liDivAnchor.setAttribute('data-locator', 'quick-order-link');

        const liDivAnchorSpan = document.createElement('span');
        liDivAnchorSpan.classList.add('header-quick-order-headline-text');
        liDivAnchorSpan.innerText = headerQuickOrderJson.headlineText;
        liDivAnchorSpan.setAttribute('data-locator', 'header-label-quick-order');

        const liDivAnchorImg = document.createElement('img');
        liDivAnchorImg.classList.add('header-quick-order-img');
        liDivAnchorImg.classList.add('inline-svg');
        liDivAnchorImg.setAttribute('src', headerQuickOrderJson.addItemsIcon);
        liDivAnchorImg.setAttribute('data-src', headerQuickOrderJson.addItemsIcon);
        liDivAnchorSpan.setAttribute('data-locator', 'quick-order-link-icon');

        liDivAnchor.appendChild(liDivAnchorSpan);
        liDivAnchor.appendChild(liDivAnchorImg);
        liDiv.appendChild(liDivAnchor);
        li.appendChild(liDiv);

        const level2Links = document.querySelector('.cmp-navigation__group');
        if (level2Links && !document.querySelector('#nav-header-quick-order-link')) {
            level2Links.insertBefore(li, level2Links.children[0]);
            inlineSVG.init('img.inline-svg', 'svg-inlined');
        }
    }
}

export const removeQuickOrderLink = () => {
    const element = document.querySelector('#nav-header-quick-order-link');
    if (element) {
        element.remove();
    }
}
