import SessionStore from '../stores/sessionStore';

const sessionStore = new SessionStore();

function removeFromSession() {
    sessionStore.removeFromSearchURL();
    sessionStore.setPreviousPagePositionEnabled();
}

function checkForSessionLink() {
    const getURL = sessionStore.getFromSearchURL();

    if (!getURL || (getURL.constructor === Object && Object.entries(getURL).length === 0)) {
        return false;
    }

    window.onbeforeunload = e => removeFromSession();

    return getURL;
}

function hideBreadcrumbShowBackToSearch(link) {
    const searchButton = document.querySelectorAll('.cmp-breadcrumb-search');

    for (let n = 0; n < searchButton.length; n++) {
        const button = searchButton[n];
        const action = button.querySelector('.cmp-breadcrumb-search__link');

        button.classList.remove('cmp-breadcrumb-search--disable');
        action.href = link;

        action.addEventListener('click', e => {
            removeFromSession();
        });
    }
}

var mediaQueryListener = window.matchMedia('(max-width: 650px)');

function changeBreadcrumb(source) {
    var scrollOffset = 40;
    if (source === 'FromScroll') {
        scrollOffset = 10;
    }
}

var breadcrumbDiv = document.querySelector('.breadcrumb');

if (breadcrumbDiv) {
    mediaQueryListener.addListener(changeBreadcrumb);

    breadcrumbDiv.addEventListener('scroll', () => changeBreadcrumb('FromScroll'));
    window.addEventListener('load', () => changeBreadcrumb('FromScroll'));
    window.addEventListener('resize', () => changeBreadcrumb('FromScroll'));
}
const link = checkForSessionLink();

if (link) {
    hideBreadcrumbShowBackToSearch(link);
}
