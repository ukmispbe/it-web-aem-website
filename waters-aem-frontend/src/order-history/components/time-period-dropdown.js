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
        <div className="cmp-order-list-timeperiod" data-locator="cmp-order-list-timeperiod">
            <Dropdown
                getOptions={getOptions}
                onChange={e => props.onChange(e)}
                isSearchable={false}
                text={props.timePeriod}
                defaultValue = {1}
            />
        </div>
    );
};

export default TimePeriod;
