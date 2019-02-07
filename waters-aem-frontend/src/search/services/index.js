import 'whatwg-fetch';

const queryString = require('query-string');

// new searchService({}, 'category_facet:waters%253Acategory%252Fapplicationslibrary');

export class SearchService {
    constructor(
        {
            isocode = 'en_US',
            page = 1,
            rows = 25,
            sort = 'most recent',
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

    call({ keyword = '*:*', facets = {}, page = 1 } = {}) {
        const paramString = this.getQueryParamString({ keyword, page });
        const facetString = this.getQueryFacetString(facets);

        const searchString = `${this.path}/${facetString}?${paramString}`;
        console.log(searchString);

        return window.fetch(searchString).then(response => response.json());
    }

    getQueryParamString({ keyword = '*:*', page = 1 } = {}, facets) {
        const fullParams = Object.assign({}, this.options, {
            keyword,
            page,
        });

        let paramString = queryString.stringify(fullParams);

        if (facets) {
            for (let i = 0; i <= Object.keys(facets).length; i++) {
                const key = Object.keys(facets)[i];
                const facet = facets[key];

                if (facet) {
                    paramString = paramString + `&facet=${key}:${facet}`;
                }
            }
        }

        return paramString;
    }

    getQueryFacetString(facets) {
        let facetString = '';

        for (let i = 0; i <= Object.keys(facets).length; i++) {
            const category = Object.keys(facets)[i];
            const facet = facets[category];

            if (facet) {
                if (this.defaultFacet && i === 0) {
                    facetString =
                        facetString + `${this.defaultFacet}&${category}:`;
                } else if (!this.defaultFacet && i === 0) {
                    facetString = facetString + `${category}:`;
                } else {
                    facetString = facetString + `&${category}:`;
                }

                for (let f = 0; f <= facet.length; f++) {
                    const filter = facet[f];
                    facetString = filter
                        ? facetString + `${f > 0 ? '||' : ''}${filter}`
                        : facetString;
                }
            }
        }

        return facetString;
    }

    createQueryObject(params) {
        const obj = {};

        obj['keyword'] = params.keyword;
        obj['page'] = params.page || 1;
        obj['facets'] = {};

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