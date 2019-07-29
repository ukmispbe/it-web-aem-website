const Fader = (targetClassName) => {
    const targetElement = document.querySelector(`.${targetClassName}`);

    if (!targetElement) { return; }

    targetElement.classList.add('fader-fade');

    const lDiv = document.createElement('div');
    lDiv.classList.add('fader-container');

    const rDiv = lDiv.cloneNode();
    lDiv.classList.add('fader-container--left');
    rDiv.classList.add('fader-container--right');

    targetElement.prepend(lDiv);
    targetElement.appendChild(rDiv);

    return function () {
        if (targetElement.scrollLeft > 0) {
            targetElement.classList.add('fader-fade--left');
            if (targetElement.scrollLeft < 100) {
                lDiv.style.width = 50+targetElement.scrollLeft + "px";
            } else {
                lDiv.style.width = "150px";
            }
        } else {
            targetElement.classList.remove('fader-fade--left');
        }

        if (targetElement.scrollLeft + targetElement.clientWidth < targetElement.scrollWidth) {
            targetElement.classList.add('fader-fade--right');
            if (targetElement.scrollWidth - (targetElement.scrollLeft + targetElement.clientWidth) < 150) {
                rDiv.style.width = (targetElement.scrollWidth - (targetElement.scrollLeft + targetElement.clientWidth)) + "px";
            } else {
                rDiv.style.width = "150px";
            }
        } else {
            targetElement.classList.remove('fader-fade--right');
        }
    };
};

export default Fader;