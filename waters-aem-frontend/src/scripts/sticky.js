import { throttle } from 'throttle-debounce';

const Sticky = (targetClassName, stickyClassName, topThreshold, topSticky) => {
    const targetElement = document.querySelector(`.${targetClassName}`);

    if (!targetElement) { return }

    // this is the scroll Y position when the element becomes sticky
    const scrollYSticky = Math.abs(Math.abs(targetElement.getBoundingClientRect().top) - window.pageYOffset);
    let isSticky = false;
    
    let stickEvent = new Event('Sticky-Stuck');
    let unstickEvent = new Event('Sticky-Unstuck');

    return function() {
        if (!isSticky && targetElement.getBoundingClientRect().top <= topThreshold) {
            isSticky = true;
            targetElement.classList.add(stickyClassName);
            targetElement.style.top = `${topSticky}px`;
            targetElement.dispatchEvent(stickEvent);
        } else if (isSticky && window.pageYOffset < scrollYSticky ) {
            isSticky = false;
            targetElement.classList.remove(stickyClassName);
            targetElement.style.top = '';
            targetElement.dispatchEvent(unstickEvent);
        } 
    }
}

export default Sticky;
