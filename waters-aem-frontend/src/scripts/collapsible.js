const sectionContainers = document.querySelectorAll(
    '.cmp-section-container--collapse'
);

const toggleBody = el => {
    const body = el.querySelector('.cmp-section-container__body');
    const title = el.querySelector('.cmp-section-container__title');
    const isOpen = body.classList.contains('open');

    if(window.matchMedia('(max-width: 650px)').matches){
        // We only need to open and close items if they are in mobile view. If the user is in desktop view we have no reason to append or remove classes
        if (isOpen) {
            title.classList.remove('open');
            body.classList.remove('open');
        } else {
            title.classList.add('open');
            body.classList.add('open');
        }
    }
};

if (sectionContainers.length > 0) {
    for (let i = 0; i < sectionContainers.length; i++) {
        const el = sectionContainers[i];

        const title = el.querySelector('.cmp-section-container__title');

        title.addEventListener('click', e => toggleBody(el));
    }
}
