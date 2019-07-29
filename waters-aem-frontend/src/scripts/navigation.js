import Fader from './fade-x';

const FadeNav = () => {
    const navFader = Fader('cmp-navigation__group');

    const nav = document.querySelector('.cmp-navigation__group');

    if (navFader) {
        nav.addEventListener('scroll', navFader);
    }
};

document.addEventListener('DOMContentLoaded', FadeNav);