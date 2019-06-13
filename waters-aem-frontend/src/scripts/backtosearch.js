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

function clearRHSGradients() {
    var listItems = document.querySelectorAll('.cmp-breadcrumb__item');
    for (var i = 0; i < listItems.length; i++) {
        listItems[i].classList.remove("rhs-gradient-fade");
    }
}

var mediaQueryListener = window.matchMedia('(max-width: 650px)');

function changeBreadcrumb(source) {
    var scrollOffset = 40;
    if (source === 'FromScroll') {
        scrollOffset = 10;
    }
    if (mediaQueryListener.matches) {
        clearRHSGradients();

        var breadcrumbContainer = document.querySelector('.breadcrumb');

        var breadcrumbContainerWidth = breadcrumbContainer ? breadcrumbContainer.clientWidth : 0;

        var listItems = document.querySelectorAll('.cmp-breadcrumb__item');
        for (var i = 0; i < listItems.length; i++) {
            var rect = listItems[i].getBoundingClientRect();
            var rhsItem = rect.left + rect.width;
            if (breadcrumbContainerWidth < rhsItem + scrollOffset) {
                if (breadcrumbContainer.clientWidth + breadcrumbContainer.scrollLeft < breadcrumbContainer.scrollWidth - 3) {
                    listItems[i].classList.add("rhs-gradient-fade");
                }
                break;
            }

        }
    }
}

mediaQueryListener.addListener(changeBreadcrumb);

var breadcrumbDiv = document.querySelector('.breadcrumb');
if (breadcrumbDiv) {
    breadcrumbDiv.addEventListener('scroll', () => changeBreadcrumb('FromScroll'));
}

const link = checkForSessionLink();

if (link) {
    hideBreadcrumbShowBackToSearch(link);
}


