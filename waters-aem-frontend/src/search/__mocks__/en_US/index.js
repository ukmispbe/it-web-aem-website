import searchResultsTranslationsJSON from './search-results-translations-json';
import searchResultsCategoriesJSON from './search-results-categories-json';
import commerceConfigs from './commerce-configs-json';
import facets from './facets';

const props = {
    searchServicePath: 'https://dev-www.waters.com:8443/api/waters/search',
    searchLocale: 'en-US',
    isocode: 'en_US',
    searchText: searchResultsTranslationsJSON,
    filterMap: searchResultsCategoriesJSON,
    setErrorBoundaryToTrue: jest.fn(() => {}),
    skuConfig: commerceConfigs,
    searchDefaults: { rows: 25 },
    resetToDefault: false
};

export default props;
export { facets };