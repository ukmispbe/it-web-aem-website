const Sticky = (targetClassName, stickyClassName, topThreshold, topSticky, onStickyCallback = null, onNonStickyCallback = null) => {
    let isSticky = false;
    let scrollYSticky = -1;

    const targetElement = document.querySelector(`.${targetClassName}`);

    if (!targetElement) { return }

    return function() {
        if (!isSticky && targetElement.getBoundingClientRect().top < topThreshold) {
            isSticky = true;
            scrollYSticky = window.scrollY;
            targetElement.classList.add(stickyClassName);
            targetElement.style.top = `${topSticky}px`;

            if (onStickyCallback) {
                onStickyCallback();
            }
        } else if (isSticky && window.scrollY < scrollYSticky ) {
            isSticky = false;
            scrollYSticky = -1;
            targetElement.classList.remove(stickyClassName);
            targetElement.style.top = '';

            if (onNonStickyCallback) {
                onNonStickyCallback()
            }
        } 
    }
}

export default Sticky;