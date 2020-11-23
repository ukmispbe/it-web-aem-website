import React from 'react';
import Dropdown from '../../utils/dropdown'

const getOptions = text => {
    let options = [{
        value: 0,
        label: text.all,
    },
    {
        value: 1,
        label: text.open,
    }];

    if (text.hasOwnProperty('closed')) {
        options.push({
            value: 2,
            label: text.closed,
        })
    }
    return options;
};

const FilterDropdown = props => {
    return (
        <div className="cmp-order-list-dropdownfilters">
            <Dropdown
                getOptions={getOptions}
                onChange={e => props.onChange(e)}
                isSearchable={false}
                text={props.dropdownfilters}
                defaultValue = {1}
            />
        </div>
    );
};

export default FilterDropdown;
