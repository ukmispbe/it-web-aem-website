import searchResultsTranslationsJSON from './search-results-translations-json';
import searchResultsCategoriesJSON from './search-results-categories-json';
import commerceConfigs from './commerce-configs-json';

const props = {
    searchServicePath: 'https://dev-www.waters.com:8443/api/waters/search',
    searchLocale: 'en-US',
    isocode: 'en_US',
    searchText: searchResultsTranslationsJSON,
    filterMap: searchResultsCategoriesJSON,
    setErrorBoundaryToTrue: jest.fn(() => {}),
    skuConfig: commerceConfigs
};

export default props;