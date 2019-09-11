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

    if(
        window.matchMedia('(max-width: 650px)').matches && 
        (document.getElementsByClassName('cmp-section-container__title open').length != 0) //if there are any open containers while in mobile view, hide the cmp-anchor dropdown
    ){
        document.getElementsByClassName('cmp-anchor')[0].style.display = "none"
    } else {
        document.getElementsByClassName('cmp-anchor')[0].style.display = "block"
    }
};

if (sectionContainers.length > 0) {
    for (let i = 0; i < sectionContainers.length; i++) {
        const el = sectionContainers[i];

        const title = el.querySelector('.cmp-section-container__title');

        title.addEventListener('click', e => toggleBody(el));
    }
}
