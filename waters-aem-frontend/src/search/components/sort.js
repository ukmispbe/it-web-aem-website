import React from 'react';
import ReactSVG from 'react-svg';
import Select from 'react-select';

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

const customStyles = {
    indicatorSeparator: () => ({
        display: 'none',
    }),
    option: (provided, state) => ({
        ...provided,
    }),
    control: provided => ({
        ...provided,
        // main container
    }),
};

const Sort = props => {
    return (
        <div className="cmp-search-sortby">
            <h3>{props.text.sortByHeading}</h3>
            <div className="cmp-search-sortby__select">
                <ReactSVG src={props.text.downIcon} />
                <select
                    onChange={e => props.sortHandler(e)}
                    value={props.sortValue}
                >
                    <option value="1">{props.text.sortByBestMatch}</option>
                    <option value="2">{props.text.sortByMostRecent}</option>
                </select>
            </div>
            Hello
            <Select
                defaultValue={getOptions(props.text)[1]}
                options={getOptions(props.text)}
                value={props.sortValue.value}
                onChange={e => props.sortHandler(e)}
                isSearchable={false}
                styles={customStyles}
                placeholder={''}
            />
        </div>
    );
};

export default Sort;
