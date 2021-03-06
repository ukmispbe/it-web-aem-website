import 'whatwg-fetch';
import SessionStore from '../../stores/sessionStore';
import { getCategoryReferenceType, getSearchString } from '../../utils/userFunctions';
import { SEARCH_TYPES } from '../../constants';

const queryString = require('query-string');

const parameterValues = {
    undefined: 'undefined',
    sort: {
        mostRecent: 'most-recent',
        mostRelevant: 'most-relevant',
    },
};

const parameterDefaults = {
    page: 1,
    rows: 25,
    keyword: '*:*',
    category: '',
    content_type: '',
    sort: parameterValues.sort.mostRecent,
    selectedFacets: {},
    contentTypeSelected: {},
};

const getSearchData = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response;
};

class SearchService {
    constructor(
        isocode,
        path = 'https://stgservices.waters.com/api/waters/search',
        page = parameterDefaults.page,
        rows = parameterDefaults.rows,
        sort = parameterDefaults.sort,
        multiselect = true,
        throwError
    ) {
        this.path = path;
        this.options = {
            isocode,
            page,
            rows,
            sort,
            multiselect,
        };
        this.throwError = throwError;
        this.sessionStore = new SessionStore();
    }

    getSkuListData = ({
        skuList = [],
        fetchProductsUrl = '',
        page = parameterDefaults.page,
        sort = parameterDefaults.sort,
    }) => {
        const keyword = skuList.join(' ');
        const searchString = `${this.path}${
            fetchProductsUrl.startsWith('/')
                ? fetchProductsUrl
                : '/' + fetchProductsUrl
        }&isocode=${this.options.isocode}`;

        if (skuList.length) {
            return this.getResultsByCategory({ keyword, category: 'Shop' })
                .then((response) => response)
                .catch((err) => console.error(err));
        } else {
            return getSearchData(searchString)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    return response;
                })
                .catch((err) => console.error(err));
        }
    };


    getCategories = ({
        keyword = parameterDefaults.keyword,
        page = parameterDefaults.page,
        sort = parameterDefaults.sort,
    }) => {
        const paramString = this.getQueryParamString({ keyword, page, sort });
        const searchString = getSearchString(this.path, paramString);

        return getSearchData(searchString).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    this.throwError(response);
                }
            })
            .catch(err => console.log(err));
    };

    getResultsByCategory = ({
        keyword = parameterDefaults.keyword,
        facets = {},
        page = parameterDefaults.page,
        sort = parameterDefaults.sort,
        category = parameterDefaults.category,
    } = {}) => {
        const paramString = this.getQueryParamString({ keyword, page, sort });
        const searchString = getSearchString(
            this.path,
            paramString,
            {
                category,
            },
            SEARCH_TYPES.CATEGORY_ONLY,
        );

        return getSearchData(searchString).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    this.throwError(response);
                }
            })
            .catch(err => console.log(err));
    };

    getContentType = (
        contentTypeKey,
        contentTypeValue,
        {
            keyword = parameterDefaults.keyword,
            facets = {},
            page = parameterDefaults.page,
            sort = parameterDefaults.sort,
            category = parameterDefaults.category,
        } = {}
    ) => {
        const paramString = this.getQueryParamString({ keyword, page, sort });
        const searchString = getSearchString(
            this.path,
            paramString,
            {
                category,
                contentTypeKey,
                contentTypeValue,
            },
            SEARCH_TYPES.CONTENT_TYPE,
        );

        return getSearchData(searchString).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                this.throwError(response);
                return response;
            }
        });
    };

    getSubFacet = (
        contentTypeName,
        contentTypeValue,
        {
            keyword = parameterDefaults.keyword,
            facets = {},
            page = parameterDefaults.page,
            sort = parameterDefaults.sort,
            category = parameterDefaults.category,
        } = {}
    ) => {
        const paramString = this.getQueryParamString({ keyword, page, sort });
        const facetString = this.getQueryFacetString(facets);
        const searchString = getSearchString(
            this.path,
            paramString,
            {
                category,
                contentTypeName,
                contentTypeValue,
                facetString
            },
            SEARCH_TYPES.SUB_FACETS,
        );

        return getSearchData(searchString).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                this.throwError(response);
                return response;
            }
        });
    };

    getSuggestedKeywords = async (rows, term, category) => {
        let searchString = `${this.path}/v1/autocomplete?term=${term}&rows=${rows}&isocode=${this.options.isocode}${getCategoryReferenceType()}`;
        if (category) {
            searchString += `&category=${category}`;
        }
        const callService = window.fetch(searchString).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                this.throwError(response);
                return response.json();
            }
        });

        const response = await callService;

        return {
            suggestions: response.suggestions || [],
            facets: response.facets || [],
        };
    };

    getParamsFromString() {
        const str = window.location.search;
        const obj = queryString.parse(str);
        obj.selectedFacets = {};

        if (Array.isArray(obj.facet)) {
            for (let i = 0; i < obj.facet.length; i++) {
                const facetSplit = obj.facet[i].split(':');
                const decodedFacetValue = decodeURIComponent(facetSplit[1]);

                if (!obj.selectedFacets[facetSplit[0]]) {
                    obj.selectedFacets[facetSplit[0]] = [];
                }

                obj.selectedFacets[facetSplit[0]].push(decodedFacetValue);
            }
        } else {
            if (obj.facet) {
                const facetSplit = obj.facet.split(':');
                const decodedFacetValue = decodeURIComponent(facetSplit[1]);

                if (!obj.selectedFacets[facetSplit[0]]) {
                    obj.selectedFacets[facetSplit[0]] = [];
                }

                obj.selectedFacets[facetSplit[0]].push(decodedFacetValue);
            }
        }

        return obj;
    }

    getQueryParamString(
        {
            keyword = parameterDefaults.keyword,
            page = parameterDefaults.page,
            sort = parameterDefaults.sort,
            category = parameterDefaults.category,
            content_type = parameterDefaults.content_type,
        } = {},
        facets
    ) {
        const fullParams = Object.assign({}, this.options, {
            keyword,
            page,
            sort,
            category,
            content_type,
        });

        if (!fullParams.category) delete fullParams.category;

        if (!fullParams.content_type) delete fullParams.content_type;

        let paramString = queryString.stringify(fullParams);

        if (facets) {
            for (let i = 0; i <= Object.keys(facets).length; i++) {
                const key = Object.keys(facets)[i];
                const facet = facets[key];

                if (facet) {
                    for (let n = 0; n < facet.length; n++) {
                        const f = encodeURIComponent(facet[n]);
                        paramString =
                            paramString + `&facet=${key}:${encodeURI(f)}`;
                    }
                }
            }
        }

        return paramString;
    }

    getQueryFacetString(facets) {
        let facetString = '';

        for (let i = 0; i <= Object.keys(facets).length; i++) {
            const facetName = Object.keys(facets)[i];
            const category = facetName
                ? `${facetName}$${facetName.replace('_facet', '')}`
                : null;
            const facet = facets[facetName];

            if (facet && category) {
                if (i === 0) {
                    facetString = facetString + `&${category}:`;
                } else {
                    facetString = facetString + `&${category}:`;
                }

                for (let f = 0; f <= facet.length; f++) {
                    const filter = facet[f];

                    if (filter) {
                        facetString = filter
                            ? facetString +
                            `${
                                f > 0 ? encodeURIComponent('||') : ''
                            }${encodeURIComponent(encodeURIComponent(filter))}`
                            : facetString;
                    }
                }
            } else if (category) {
                facetString = facetString + `&${category}:`;
            }
        }

        return facetString;
    }

    createQueryObject(params) {
        const obj = {};

        obj['keyword'] = params.keyword ? params.keyword.replace("%","") : params.keyword;     
        obj['page'] = params.page || parameterDefaults.page;
        obj['facets'] = {};
        obj['sort'] = params.sort;

        if (params.category) obj['category'] = params.category;

        if (params.content_type) obj['content_type'] = params.content_type;

        if (params.facet) {
            const facets = params.facet;

            if (Array.isArray(facets)) {
                for (let n = 0; n <= facets.length; n++) {
                    const facet = facets[n];
                    if (facet) {
                        const splitName = facet.split(':');
                        if (Array.isArray(obj['facets'][splitName[0]])) {
                            obj['facets'][splitName[0]].push(decodeURIComponent(splitName[1]));
                        } else {
                            obj['facets'][splitName[0]] = [decodeURIComponent(splitName[1])];
                        }
                    }
                }
            } else if (facets) {
                const splitName = facets.split(':');
                obj['facets'][splitName[0]] = [decodeURIComponent(splitName[1])];
            }
        }

        return obj;
    }

    getUrlParameter = (sParam, sPageURL) => {
        const sURLVariables = sPageURL.split('&');

        for (let i = 0; i < sURLVariables.length; i++) {
            const sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined
                    ? true
                    : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    mapFacetGroupsToArray = facetParam => {
        if (Array.isArray(facetParam)) {
            const facetArray = facetParam.map(item => {
                const splitArray = item.split(':');
                return splitArray.length === 2 ? splitArray[0] : '';
            });

            return facetArray.filter(item => item !== '');
        } else if (facetParam) {
            const splitArray = facetParam.split(':');
            return splitArray.length === 2 ? [splitArray[0]] : [];
        }

        return [];
    }

    buildParameters = (searchObject = {}) => {
        const keyword = searchObject && searchObject.keyword ? searchObject.keyword : parameterDefaults.keyword;
        const sort =
            keyword === parameterDefaults.keyword
                ? parameterDefaults.sort
                : parameterValues.sort.mostRelevant;

        return { ...searchObject, keyword, sort };
    };

    stringifyParameters = parameters =>
        Object.keys(parameters).length !== 0
            ? Object.keys(parameters).reduce(
                (accumulator, currentValue) =>
                    `${accumulator ? accumulator + '&' : accumulator}${currentValue}=${encodeURIComponent(parameters[currentValue])}`,
                ''
            )
            : '';

    setUrlParameter = (searchObject, searchPath) => {
        const parameters = this.buildParameters(searchObject || {});
        const querystring = this.stringifyParameters(parameters);

        window.location.href = `${searchPath}?${querystring}`;
    };

    isDefaultKeyword = value => value === parameterDefaults.keyword;

    setStorageForPagePosition = () => {
        const scrolled =
            (window.pageYOffset || window.document.scrollTop) -
            (window.document.clientTop || 0);

        this.sessionStore.setPreviousPagePosition(scrolled);
        this.sessionStore.setFromSearchURL(window.location.href);
    }

    setStorageForTabHistory = tabHistory => {
        this.sessionStore.setSearchTabHistory(tabHistory);
    }

    setStorageForPagination = () => {
        const scrolled =
            (window.pageYOffset || window.document.scrollTop) -
            (window.document.clientTop || 0);
        
        this.sessionStore.setPreviousPaginationClick(scrolled);
    }

    getSessionStore = () => {
        const previousPagePosition = 
            this.sessionStore.getPreviousPagePositionEnabled()
            ? this.sessionStore.getPreviousPagePosition()
            : null;

        return {
            previousPagePosition,
            fromSearchURL: this.sessionStore.getFromSearchURL(),
            searchTabHistory: this.sessionStore.getSearchTabHistory(),
            previousPaginationClick: this.sessionStore.getPreviousPaginationClick()
        }
    }

    clearSessionStore = () => {
        this.sessionStore.removePreviousPagePosition();
        this.sessionStore.removePreviousPagePositionEnabled();
        this.sessionStore.removeFromSearchURL();
        this.sessionStore.removeSearchTabHistory();
        this.sessionStore.removePreviousPaginationClick();
    }

    scrollToPosition = position => {
        window.scrollTo(0, position);
        this.sessionStore.removePreviousPagePosition();
        this.sessionStore.removePreviousPagePositionEnabled();
    }

    scrollToTop = () => {
        window.scrollTo(0, 0);
        this.sessionStore.removePreviousPagePositionEnabled();
    }
}

const searchMapper = {
    mapFacetGroups: (subFacetsMap, facets) => {
        if (!subFacetsMap) { return; }

        const subFacets = subFacetsMap.filter(item => facets[item.facetName]);

        const mapping = subFacets.map(facet => {
            return {
                name: facet.facetName,
                category: facet.facetValue,
                translation: facet.facetTranslation,
                facets: facets[facet.facetName],
                isExpanded: false,
            }
        });

        return mapping;
    }
};

export { SearchService, parameterValues, parameterDefaults, searchMapper };