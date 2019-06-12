const isMobile = window.matchMedia('(max-width: 649px)').matches;

function createSticky(target, stick, element) {
    const sourcePosition = {
        [target]: element.getBoundingClientRect().top,
    };

    function handleSticky(targetClass, stickyClass) {
        const sourceClass = element;
        const headerHeight = document.querySelector('.cmp-external-header')
            .offsetHeight;

        if (sourceClass) {
            const sourceTop = sourceClass.getBoundingClientRect().top;

            if (!sourcePosition[targetClass]) {
                sourcePosition[targetClass] = sourceTop;
            }

            if (window.scrollY > sourcePosition[targetClass] - headerHeight) {
                sourceClass.classList.add(stickyClass);
            } else {
                sourceClass.classList.remove(stickyClass);
            }
        }
    }

    if (isMobile) {
        window.addEventListener('scroll', () => {
            handleSticky(target, stick);
        });
    }
}

function ready(fn) {
    if (
        document.attachEvent
            ? document.readyState === 'complete'
            : document.readyState !== 'loading'
    ) {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(() => {
    const filterBtnClass = 'btn-show-sort-filter';
    const filterBtnStickyClass = 'btn-show-sort-filter--sticky';
    const filterBtnElement = document.querySelector(`.${filterBtnClass}`);
    
    if (filterBtnElement) {
        createSticky(filterBtnClass, filterBtnStickyClass, filterBtnElement);
    }
});
