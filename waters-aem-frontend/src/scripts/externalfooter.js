let regionSelector = document.querySelector('.cmp-footer__selector__language');
let regionSelectorOptions = document.querySelector('.cmp-footer__selector__language--options');

if (regionSelector) {
    let children = Array.prototype.slice.call(regionSelectorOptions.childNodes);
    let displayText = regionSelector.firstElementChild.innerText;
    let longestAnchor = displayText.length;

    if (children) {
        children.forEach( (e) => {
            if (e && e.tagName && e.tagName === 'A') {
                if (e.innerText && e.innerText.length > longestAnchor) {
                    longestAnchor = e.innerText.length;
                }
            }
        });


        if (longestAnchor > displayText.length) {
            let diff = longestAnchor - displayText.length;
            regionSelector.firstElementChild.innerText = displayText + ' '.repeat(diff*5);
        }
    }

    if (!regionSelector.classList.contains('one-link')) {
        regionSelector.addEventListener('click', () => {
            if (regionSelector.classList.contains('active')) {
                regionSelector.classList.remove('active');
            } else {
                regionSelector.classList.add('active');
            }
        });

        document.addEventListener("click", (evt) => {
            let targetElement = evt.target; // clicked element

            do {
                if (targetElement == regionSelector) {
                    return;
                }

                targetElement = targetElement.parentNode;
            } while (targetElement);

            regionSelector.classList.remove('active');
        });
    }
}