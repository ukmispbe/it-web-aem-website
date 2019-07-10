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

function clearGradients() {
    rhsGradientFade[0].style.display = 'block';
    lhsGradientFade[0].style.display = 'block';
}

var mediaQueryListener = window.matchMedia('(max-width: 650px)');

function changeBreadcrumb(source) {
    var scrollOffset = 40;
    if (source === 'FromScroll') {
        scrollOffset = 10;
    }
    if (mediaQueryListener.matches) {
        clearGradients();
        var breadcrumbContainer = document.querySelector('.breadcrumb');
        var breadcrumbElement = document.querySelector('.cmp-breadcrumb');
        if (breadcrumbContainer.scrollLeft <= 0){
            lhsGradientFade[0].style.display = 'none';
        }

        if (breadcrumbElement.clientWidth - breadcrumbContainer.clientWidth == breadcrumbContainer.scrollLeft - (breadcrumbContainer.scrollWidth - breadcrumbElement.scrollWidth)){
            rhsGradientFade[0].style.display = 'none';
        }
    }
}

mediaQueryListener.addListener(changeBreadcrumb);

var breadcrumbDiv = document.querySelector('.breadcrumb');
var rhsGradientFade = document.getElementsByClassName('cmp-breadcrumb-gradient-right');
var lhsGradientFade = document.getElementsByClassName('cmp-breadcrumb-gradient-left');

if (breadcrumbDiv) {
    breadcrumbDiv.addEventListener('scroll', () =>
        changeBreadcrumb('FromScroll')
    );
    window.addEventListener('load', () => changeBreadcrumb('FromScroll'));
    window.addEventListener('resize', () => changeBreadcrumb('FromScroll'));
}
const link = checkForSessionLink();

if (link) {
    hideBreadcrumbShowBackToSearch(link);
}
