import React from 'react';
import Dropdown from '../../utils/dropdown'

const getOptions = text => {
    return [
        {
            value: 1,
            label: text.last30days,
        },
        {
            value: 2,
            label: text.last6months,
        },
        {
            value: 3,
            label: text.last12months,
        },        
        {
            value: 4,
            label: text.showall,
        }
    ];
};

const TimePeriod = props => {
    return (
        <div className="cmp-search-sortby">
            <Dropdown
                getOptions={getOptions}
                // sortValue={1}
                onChange={e => props.timePeriodHandler(e)}
                isSearchable={false}
                text={props.timePeriod}
            />
        </div>
    );
};

export default TimePeriod;
