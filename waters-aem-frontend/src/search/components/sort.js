import React from 'react';
import Dropdown from '../../utils/dropdown';

const getOptions = text => {
    return [
        {
            value: 1,
            label: text.sortByBestMatch,
        },
        {
            value: 2,
            label: text.sortByMostRecent,
        },
    ];
};

const Sort = props => {
    return (
        <div className="cmp-search-sortby" data-locator="sortby-label">
            <h3>{props.text.sortByHeading}</h3>
            <Dropdown
                getOptions={getOptions}
                sortValue={props.sortValue}
                onChange={e => props.sortHandler(e)}
                isSearchable={false}
                text={props.text}
            />
        </div>
    );
};

export default Sort;
