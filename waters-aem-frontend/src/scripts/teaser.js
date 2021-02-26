/* 
* Due to teaser.html is not similar to custom four component (Features, Tiles, Notification, & External list),
* some functionalities, I had to do with help of javascript.
*/

// ForEach function only works on Array in IE, not on NodeList. So adding a function to fix the issue
function convertNodeListToArray(list) {
    return Array.prototype.slice.call(list);
}

function renderSvgFromImg(selector) {
    const elements = document.querySelectorAll(selector);
    convertNodeListToArray(elements).forEach(item => {
        if (item.src && item.src.includes('.svg')) {
            item.classList.add('inline-svg');
        }
    });
}

function updateExternalLink(selector) {
    const elements = document.querySelectorAll(selector);
    convertNodeListToArray(elements).forEach(item => {
        const hasExternal = item.getAttribute('href') && !item.getAttribute('href').includes('www.waters.com') && !item.getAttribute('href').startsWith("/");
        if (hasExternal) {
            item.classList.add('external-link');
            item.setAttribute('target', '_blank');
            item.setAttribute('rel', 'noopener noreferrer nofollow');
        }
    });
}

function removeLinkFromTitle(section) {
    const titleElem = document.querySelectorAll(`${section} .cmp-teaser__title`);
    convertNodeListToArray(titleElem).forEach(item => {
        if (item && item.querySelector('.cmp-teaser__title-link') !== null) {
            const link = item.querySelector('.cmp-teaser__title-link');
            const text = link.innerText;
            link.remove();
            item.innerText = text;
        }
    });
}

renderSvgFromImg('.cmp-teaser__image img');
removeLinkFromTitle('.cmp-feature');
removeLinkFromTitle('.cmp-external-list');
removeLinkFromTitle('.cmp-notification');
updateExternalLink('.cmp-teaser__action-container a');