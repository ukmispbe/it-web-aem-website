import 'whatwg-fetch';

const queryString = require('query-string');

const parameterValues = {
    sort: {
        mostRecent: 'most-recent',
        mostRelevant: 'most-relevant'
    }
}

const parameterDefaults = {
    isocode: 'en_US',
    page: 1,
    rows: 25,
    keyword: '*:*',
    content_type: '',
    sort: parameterValues.mostRecent
}

export class SearchService {
    constructor(
        {
            isocode = parameterDefaults.isocode,
            page = parameterDefaults.page,
            rows = parameterDefaults.rows,
            sort = parameterDefaults.sort,
            multiselect = true,
        } = {},
        defaultFacet,
        path = 'https://dev-www.waters.com:8443/api/waters/search'
    ) {
        this.path = path;
        this.options = {
            isocode,
            page,
            rows,
            sort,
            multiselect,
        };
        this.defaultFacet = defaultFacet;
    }

    initial = ({
        keyword = parameterDefaults.keyword,
        facets = {},
        page = parameterDefaults.page,       
        sort = parameterDefaults.sort,
    } = {}) => {
        const paramString = this.getQueryParamString({ keyword, page, sort });
        const searchString = `${this.path}/category_facet$library:Library?${paramString}`;

        return window.fetch(searchString).then(response => response.json());
    }

    contentType = (
        contentTypeKey,
        contentTypeValue,
        {
            keyword = parameterDefaults.keyword,
            facets = {},
            page = parameterDefaults.page,       
            sort = parameterDefaults.sort,
        } = {}
    ) => {
        const paramString = this.getQueryParamString({ keyword, page, sort });
        const searchString = `${this.path}/contenttype_facet$${contentTypeKey}:${contentTypeValue}?${paramString}`;

        return window.fetch(searchString).then(response => response.json());
    }

    subFacet = (
        contentTypeName,
        contentTypeValue,
        {
            keyword = parameterDefaults.keyword,
            facets = {},
            page = parameterDefaults.page,       
            sort = parameterDefaults.sort,
        } = {}
        ) => {
            const paramString = this.getQueryParamString({ keyword, page, sort });
            const facetString = this.getQueryFacetString(facets);
            const searchString = `${this.path}/contenttype_facet$${contentTypeName.replace('_facet', '')}:${contentTypeValue}${facetString}?${paramString}`;

            return window.fetch(searchString).then(response => response.json());
    }

    getSuggestedKeywords = async (rows, term) => {
        const searchString = `${this.path}/v1/autocomplete?rows=${rows}&term=${term}`;

        const response = await (await window.fetch(searchString)).json();

        return response.suggestions;
    }

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
            content_type = parameterDefaults.content_type
        } = {},
        facets
    ) {
        const fullParams = Object.assign({}, this.options, {
            keyword,
            page,
            sort,
            content_type
        });

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
            const category = (facetName) ? `${facetName}$${facetName.replace('_facet', '')}` : null;
            const facet = facets[facetName];

            if (facet && category) {
                if (i === 0) {
                    facetString =
                        facetString +
                        `&${category}:`;
                } else {
                    facetString = facetString + `&${category}:`;
                }

                for (let f = 0; f <= facet.length; f++) {
                    const filter = facet[f];

                    if (filter) {
                        facetString = filter
                            ? facetString +
                              `${f > 0 ? '||' : ''}${encodeURI(filter)}`
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

        obj['keyword'] = params.keyword;
        obj['page'] = params.page || parameterDefaults.page;
        obj['facets'] = {};
        obj['sort'] = params.sort;

        if(params.content_type) obj['content_type'] = params.content_type;

        if (params.facet) {
            const facets = params.facet;

            if (Array.isArray(facets)) {
                for (let n = 0; n <= facets.length; n++) {
                    const facet = facets[n];
                    if (facet) {
                        const splitName = facet.split(':');
                        if (Array.isArray(obj['facets'][splitName[0]])) {
                            obj['facets'][splitName[0]].push(splitName[1]);
                        } else {
                            obj['facets'][splitName[0]] = [splitName[1]];
                        }
                    }
                }
            } else if (facets) {
                const splitName = facets.split(':');
                obj['facets'][splitName[0]] = [splitName[1]];
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
    }

    buildParameters = (searchValue) => {
        const keyword = searchValue ? searchValue : parameterDefaults.keyword;
        const sort = keyword === parameterDefaults.keyword ? parameterDefaults.sort : parameterValues.sort.mostRelevant;

        return { keyword, sort };
    }

    stringifyParameters = (parameters) => (Object.keys(parameters).length !== 0)
            ? Object.keys(parameters).reduce((accumulator, currentValue) => 
                `${accumulator}=${parameters[accumulator]}&${currentValue}=${parameters[currentValue]}`)
            : '';

    setUrlParameter = (searchTerm, searchPath) => {
        const parameters = this.buildParameters(searchTerm);
        const querystring = this.stringifyParameters(parameters);

        window.location.href = `${searchPath}?${querystring}`;
    }

    isDefaultKeyword = value => value === parameterDefaults.keyword;
}
