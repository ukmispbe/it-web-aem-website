import 'whatwg-fetch';

const queryString = require('query-string');

export class SearchService {
    constructor(
        {
            isocode = 'en_US',
            page = 1,
            rows = 25,
            sort = 'most-recent',
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
        keyword = '*:*',
        facets = {},
        page = 1,       
        sort = 'most-recent',
    } = {}) => {
        const paramString = this.getQueryParamString({ keyword, page, sort });
        const searchString = `${this.path}/category_facet$library:Library?${paramString}`;

        return window.fetch(searchString).then(response => response.json());
    }

    contentType = (
        contentTypeKey,
        contentTypeValue,
        {
            keyword = '*:*',
            facets = {},
            page = 1,       
            sort = 'most-recent',
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
            keyword = '*:*',
            facets = {},
            page = 1,       
            sort = 'most-recent',
        } = {}
        ) => {
            const paramString = this.getQueryParamString({ keyword, page, sort });
            const facetString = this.getQueryFacetString(facets);
            const searchString = `${this.path}/contenttype_facet$${contentTypeName.replace('_facet', '')}:${contentTypeValue}${facetString}?${paramString}`;

            return window.fetch(searchString).then(response => response.json());
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
        { keyword = '*:*', page = 1, sort = 'most-recent', content_type = '' } = {},
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
        obj['page'] = params.page || 1;
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
}
