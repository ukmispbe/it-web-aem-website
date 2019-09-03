import Fader from './fade-x';

const FadeTabs = () => {
    const tabFader = Fader('cmp-search__categories-tabs', 0, 100);

    const tabs = document.querySelector('.cmp-search__categories-tabs');

    if (tabFader && tabs) {
        tabs.addEventListener('scroll', tabFader);
    }
};

document.addEventListener('DOMContentLoaded', FadeTabs);