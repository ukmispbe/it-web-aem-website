import React from 'react';
import ReactSVG from 'react-svg';

const FilterTags = props => {
    const tags = props.selectedFacets
        ? Object.keys(props.selectedFacets).map((facet, index) => {
              const f = props.selectedFacets[facet];
              const category = [];

              for (let i = 0; i < f.length; i++) {
                  const selected = f[i];
                  category.push(
                      <a
                          key={`facetTag-${i}`}
                          href="javascript:void(0);"
                          onClick={() => props.removeTag(selected)}
                      >
                          <ReactSVG src={props.text.closeIcon} />
                          <span>
                              {selected.category}: {selected.facet}
                          </span>
                      </a>
                  );
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
                    <span>Clear All</span>
                </a>
            ) : null}
            {props.selectedFacets && tags}
        </div>
    );
};

export default FilterTags;
