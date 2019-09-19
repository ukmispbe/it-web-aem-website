import screenSizes from './screenSizes.js';

const Fader = (targetClassName, offsetWidth=0, maxFadeWidth=Number.POSITIVE_INFINITY, forceMobile=false, wrap=false) => {
    const targetElement = document.querySelector(`.${targetClassName}`);

    if (!targetElement || (screenSizes.isMobile() && !forceMobile)) { return; }

    const fadeOffset = offsetWidth || 0;
    const maxWidth = maxFadeWidth || Number.POSITIVE_INFINITY;

    targetElement.classList.add('fader-fade');

    const lDiv = document.createElement('div');
    lDiv.classList.add('fader-container');

    const rDiv = lDiv.cloneNode();
    lDiv.classList.add('fader-container--left');
    rDiv.classList.add('fader-container--right');

    targetElement.prepend(lDiv);
    targetElement.appendChild(rDiv);

    if (wrap) {
        const wrapper = document.createElement('div');
        targetElement.parentNode.insertBefore(wrapper, targetElement);
        wrapper.appendChild(targetElement);
    }

    let scrollCheck = function () {
        if (targetElement.scrollLeft > 0) {
            targetElement.classList.add('fader-fade--left');
            let lWidth = fadeOffset+targetElement.scrollLeft/2;

            if (lWidth > maxWidth) {
                lDiv.style.width = maxWidth + offsetWidth + "px";
            } else if (targetElement.scrollLeft < 150-fadeOffset) {
                lDiv.style.width = lWidth + "px";
            } else {
                lDiv.style.width = fadeOffset+100+"px";
            }
        } else {
            targetElement.classList.remove('fader-fade--left');
        }

        if (targetElement.scrollLeft + targetElement.clientWidth < targetElement.scrollWidth) {
            targetElement.classList.add('fader-fade--right');
            const scrollPos = (targetElement.scrollWidth - (targetElement.scrollLeft + targetElement.clientWidth));
            let rWidth = (scrollPos)/2+fadeOffset;

            if (rWidth > maxWidth) {
                rDiv.style.width = maxWidth + offsetWidth + "px";
            } else if (scrollPos < 150) {
                rDiv.style.width = rWidth + "px";
            } else {
                rDiv.style.width = fadeOffset+100+"px";
            }
        } else {
            targetElement.classList.remove('fader-fade--right');
        }
    };

    scrollCheck();

    return scrollCheck;
};

export default Fader;
