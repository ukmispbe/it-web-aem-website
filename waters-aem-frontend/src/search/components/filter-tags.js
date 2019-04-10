import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';

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

        let showClearButton = false;

        if (Object.keys(props.selectedFacets)[0]) {
            const selectedFacets = Object.keys(props.selectedFacets).map(function(key) {
                return props.selectedFacets[key];
            });
            if (selectedFacets.length > 0) {
                for (var i = 0; i < selectedFacets.length; i++) {
                    if (selectedFacets[i].length > 0) {
                        showClearButton = true;
                    }
                }
            }
        }

    return (
        <div className="cmp-search-filters__tags clearfix">
            {showClearButton === true ? (
                <a
                    href="javascript:void(0);"
                    className="cmp-search-filters__tags__clear"
                    onClick={() => props.clearTag()}
                >
                    <ReactSVG src={props.text.closeIcon} />
                    <span>{props.text.clearAllFilters}</span>
                </a>
            ) : null}
            {props.selectedFacets && tags}
        </div>
    );
};

const ContentTypeTags = props => {
    const showTags = Object.entries(props.selected).length !== 0 ? true : false;

    if (!showTags) return <></>;

    return(<>
        <div className="cmp-search-filters__tags clearfix">
            <a href="javascript:void(0);"
                className="cmp-search-filters__tags__clear"
                onClick={props.remove}>
                <ReactSVG src={props.text.closeIcon} />
                <span>{props.text.clearAllFilters}</span>
            </a>

            <a href="javascript:void(0);"
                onClick={props.remove}>
                <ReactSVG src={props.text.closeIcon} />
                <span>{props.selected.value}</span>
            </a>
        </div>
    </>);
}

ContentTypeTags.proptTypes = {
    selected: PropTypes.object.isRequired,
    text: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired
}

ContentTypeTags.defaultProps = {
    selected: {}
}

export default FilterTags;
export { ContentTypeTags }
