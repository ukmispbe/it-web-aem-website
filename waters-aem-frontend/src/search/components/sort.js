import React from 'react';
import PrefixDropdown from '../../utils/dropdown/prefix-dropdown';

const getOptions = text => {
    return [
        {
            value: 1,
            label: text.options.bestMatch
        },
        {
            value: 2,
            label: text.options.mostRecent
        },
    ];
};

const Sort = props => {
    return (
        <div className="cmp-search-sortby" data-locator="sortby-label">
            <PrefixDropdown
                getOptions={getOptions}
                onChange={e => props.sortHandler(e)}
                text={props.text.sort}
                dropdownValue={props.sortValue}
                prefix={props.text.sort.prefix}
                isSearchable={false}
                defaultValue={1}
                downIcon={props.text.downIcon}
            />
        </div>
    );
};

export default Sort;
