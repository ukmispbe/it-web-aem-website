import React from 'react';
import ReactSVG from 'react-svg';

const FilterTags = props => {
    return (
        <div class="cmp-search-filters__tags clearfix">
          <a href="javascript:void(0);" class="cmp-search-filters__tags__clear">Clear All</a>
          <a href="javascript:void(0);">CATEGORY 1: ITEM 1</a>
          <a href="javascript:void(0);">CATEGORY 3: ITEM 2</a>
        </div>
    );
};

export default FilterTags;
