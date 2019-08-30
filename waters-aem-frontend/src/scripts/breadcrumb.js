import Fader from './fade-x';

const FadeBreadcrumb = () => {
    const bcFader = Fader('cmp-breadcrumb__list', 0, 100, true);

    const bc = document.querySelector('.cmp-breadcrumb__list');

    if (bcFader && bc) {
        bc.addEventListener('scroll', bcFader);
    }
};

document.addEventListener('DOMContentLoaded', FadeBreadcrumb);
