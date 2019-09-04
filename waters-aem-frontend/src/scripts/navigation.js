import Fader from './fade-x';

const FadeNav = () => {
    const navFader = Fader('cmp-navigation__group', 0, 100);

    const nav = document.querySelector('.cmp-navigation__group');

    if (navFader && nav) {
        nav.addEventListener('scroll', navFader);
    }
};

document.addEventListener('DOMContentLoaded', FadeNav);