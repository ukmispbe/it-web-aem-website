import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';

const SubFacetTags = props => {
    const facets = props.facets ? props.facets : {};
    const defaultFacet = `${props.defaultFacet}_facet`;
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
        <>
            {props.selectedFacets && tags}
        </>
    );
};

const CategoryTags = props => {
    const showTags = Object.entries(props.selected).length !== 0 ? true : false;

    if (!showTags) return <></>;

    return(<>
        <>
            <a href="javascript:void(0);"
                className="cmp-search-filters__tags__clear"
                onClick={props.remove}>
                <ReactSVG src={props.text.closeIcon} />
                <span>{props.text.clearAllFilters}</span>
            </a>

            <a href="javascript:void(0);"
                onClick={props.remove}>
                <ReactSVG src={props.text.closeIcon} />
                <span>{`${props.text[props.categoryKey]}: ${props.selected.categoryFacetValue}`}</span>
            </a>
        </>
    </>);
}

SubFacetTags.propTypes = {
    filterMap: PropTypes.array.isRequired,
    defaultFacet: PropTypes.string.isRequired,
    removeTag: PropTypes.func.isRequired,
    selectedFacets: PropTypes.object.isRequired,
    text: PropTypes.object.isRequired,
}

CategoryTags.proptTypes = {
    categoryKey: PropTypes.string,
    selected: PropTypes.object.isRequired,
    text: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired
}

CategoryTags.defaultProps = {
    selected: {}
}

export { SubFacetTags, CategoryTags }