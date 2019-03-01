import React from 'react';
import ReactSVG from 'react-svg';

const FilterTags = props => {

    //TODO: add functionality for tags
    return (
        <div className="cmp-search-filters__tags clearfix">
          <a href="javascript:void(0);" className="cmp-search-filters__tags__clear">
          	<ReactSVG src={props.text.closeIcon} />
          	<span>Clear All</span>
          </a>
          <a href="javascript:void(0);">
          	<ReactSVG src={props.text.closeIcon} />
          	<span>CATEGORY 1: ITEM 1</span>
          </a>
          <a href="javascript:void(0);">
			<ReactSVG src={props.text.closeIcon} />
          	<span>CATEGORY 3: ITEM 2</span>
          </a>
        </div>
    );
};

export default FilterTags;
