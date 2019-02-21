import React from 'react';

const Sort = props => {
    return (
        <div className="cmp-search-sortby">
            <h3>{props.text.sortByHeading}</h3>
            <div className="cmp-search-sortby__select">
                <select
                    onChange={e => props.sortHandler(e)}
                    value={props.sortValue}
                >
                    <option value="1">{props.text.sortByBestMatch}</option>
                    <option value="2">{props.text.sortByMostRecent}</option>
                </select>
            </div>
        </div>
    );
};

export default Sort;
