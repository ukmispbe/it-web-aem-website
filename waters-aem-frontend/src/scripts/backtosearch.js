const SEARCH_URL = 'waters.fromSearchURL';

function removeFromSession() {
    window.sessionStorage.removeItem(SEARCH_URL);
}

function checkForSessionLink() {
    const s = window.sessionStorage;
    const getURL = s.getItem('waters.fromSearchURL');

    if (getURL) {
        window.onbeforeunload = e => {
            removeFromSession();
        };
        return JSON.parse(getURL);
    } else {
        return false;
    }
}

function hideBreadcrumbShowBackToSearch(link) {
    const breadcrumb = document.querySelectorAll('.cmp-breadcrumb');
    const searchButton = document.querySelectorAll('.cmp-breadcrumb-search');

    for (let i = 0; i < breadcrumb.length; i++) {
        const crumb = breadcrumb[i];

        crumb.classList.add('cmp-breadcrumb--disable');
    }

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
const link = checkForSessionLink();

if (link) {
    hideBreadcrumbShowBackToSearch(link);
}
