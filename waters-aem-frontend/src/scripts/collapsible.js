const sectionContainers = document.querySelectorAll(
    '.cmp-section-container--collapse'
);

const toggleBody = el => {
    const body = el.querySelector('.cmp-section-container__body');
    const title = el.querySelector('.cmp-section-container__title');
    const isOpen = body.classList.contains('open');

    if (isOpen) {
        title.classList.remove('open');
        body.classList.remove('open');
    } else {
        title.classList.add('open');
        body.classList.add('open');
    }
};

if (sectionContainers.length > 0) {
    sectionContainers.forEach((el, i) => {
        const title = el.querySelector('.cmp-section-container__title');

        title.addEventListener('click', e => toggleBody(el));
    });
}
