const Sticky = (targetClassName, stickyClassName, topThreshold, topSticky) => {
    let isSticky = false;
    let scrollYSticky = -1;

    const targetElement = document.querySelector(`.${targetClassName}`);

    if (!targetElement) { return }

    return function() {
        if (!isSticky && targetElement.getBoundingClientRect().top < topThreshold) {
            isSticky = true;
            scrollYSticky = window.pageYOffset;
            targetElement.classList.add(stickyClassName);
            targetElement.style.top = `${topSticky}px`;
        } else if (isSticky && window.pageYOffset < scrollYSticky ) {
            isSticky = false;
            scrollYSticky = -1;
            targetElement.classList.remove(stickyClassName);
            targetElement.style.top = '';
        } 
    }
}

export default Sticky;