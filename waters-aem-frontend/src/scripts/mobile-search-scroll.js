import screenSizes from './screenSizes';

const androidSuggestionFix = () => {
    const isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;

    if (screenSizes.isMobile() && isAndroid && document.getElementsByClassName('cmp-search__sort-filter__container').length) {
        let windowHeight = document.documentElement.clientHeight;

        window.addEventListener('resize', () => {
            let newHeight = document.documentElement.clientHeight;

            let sortContainer = document.getElementsByClassName('cmp-search__sort-filter__container')[0];
            if (sortContainer) {
                let openedFacet = sortContainer.getElementsByClassName('cmp-search-filters__filter expanded')[0];

                if (openedFacet) {
                    let searchField = openedFacet.getElementsByClassName('cmp-search-filters__filter__search')[0];

                    if (windowHeight > newHeight) {
                        if (searchField && document.activeElement === searchField) {
                            sortContainer.scrollTo(0, (
                                sortContainer.scrollTop +
                                (searchField.getBoundingClientRect().top - sortContainer.getBoundingClientRect().top)
                            ));
                        }
                    } else if (newHeight > windowHeight) {
                        windowHeight = newHeight;
                    }
                }
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', androidSuggestionFix);

