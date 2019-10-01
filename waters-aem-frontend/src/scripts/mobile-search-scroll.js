import screenSizes from './screenSizes';

const androidSuggestionFix = () => {
    if (screenSizes.isMobile()) {
        let windowHeight = document.documentElement.clientHeight;

        window.addEventListener('resize', () => {
            let newHeight = document.documentElement.clientHeight;

            let sortContainer = document.getElementsByClassName('cmp-search__sort-filter__container')[0];
            let openedFacet = sortContainer.getElementsByClassName('cmp-search-filters__filter expanded')[0];
            let searchField = openedFacet.getElementsByClassName('cmp-search-filters__filter__search')[0];

            if (windowHeight > newHeight) {
                sortContainer.scrollTo(0, (
                    sortContainer.scrollTop +
                    (searchField.getBoundingClientRect().top - sortContainer.getBoundingClientRect().top)
                ));
            } else if (newHeight > windowHeight) {
                windowHeight = newHeight;
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', androidSuggestionFix);

