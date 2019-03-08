import React from 'react';
import ReactSVG from 'react-svg';

const FilterTags = props => {
    const facets = props.facets ? props.facets : {};
    const defaultFacetSplit = decodeURI(props.defaultFacet).split('%2F');
    const defaultFacet =
        defaultFacetSplit[defaultFacetSplit.length - 1] + '_facet';
    const mapping = [];

    for (let i = 0; i < props.filterMap.length; i++) {
        if (props.filterMap[i].categoryFacetName === defaultFacet) {
            const appLibrary = props.filterMap[i];
            const categories = appLibrary.orderedFacets;

            for (let c = 0; c < categories.length; c++) {
                const category = categories[c];

                if (facets[category.facetName]) {
                    mapping.push({
                        name: category.facetName,
                        category: category.facetValue,
                        facets: facets[category.facetName],
                    });
                }
            }
        }
    }
    const tags = props.selectedFacets
        ? Object.keys(props.selectedFacets).map((facet, index) => {
              const f = props.selectedFacets[facet];
              const category = [];

              for (let i = 0; i < f.length; i++) {
                  const selected = f[i];
                  for (let n = 0; n < mapping.length; n++) {
                      const cat = mapping[n];

                      if (cat.name === facet) {
                          category.push(
                              <a
                                  key={`facetTag-${i}`}
                                  href="javascript:void(0);"
                                  onClick={() =>
                                      props.removeTag({
                                          categoryId: cat.name,
                                          facet: selected,
                                      })
                                  }
                              >
                                  <ReactSVG src={props.text.closeIcon} />
                                  <span>
                                      {cat.category}: {selected}
                                  </span>
                              </a>
                          );
                      }
                  }
              }

              return category;
          })
        : null;
    return (
        <div className="cmp-search-filters__tags clearfix">
            {Object.keys(props.selectedFacets).length > 0 ? (
                <a
                    href="javascript:void(0);"
                    className="cmp-search-filters__tags__clear"
                    onClick={() => props.clearTag()}
                >
                    <ReactSVG src={props.text.closeIcon} />
                    <span>props.text.clearAllFilters</span>
                </a>
            ) : null}
            {props.selectedFacets && tags}
        </div>
    );
};

export default FilterTags;
