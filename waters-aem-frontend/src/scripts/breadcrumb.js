import Fader from './fade-x';

const FadeBreadcrumb = () => {
    const bcFader = Fader('cmp-breadcrumb__list', 0, 100, true);

    const bc = document.querySelector('.cmp-breadcrumb__list');

    console.log(bcFader);
    console.log(bc);

    if (bcFader && bc) {
        bc.addEventListener('scroll', bcFader);
    }
};

document.addEventListener('DOMContentLoaded', FadeBreadcrumb);