import React from 'react';

const Sort = props => {
    return (
        <div className="cmp-search-sortby">
            <h2>Sort by</h2>
            <div className="cmp-search-sortby__select">
                <select
                    onChange={e => props.sortHandler(e)}
                    value={props.sortValue}
                >
                    <option value="1">Best Match</option>
                    <option value="2">Most Recent</option>
                </select>
            </div>
        </div>
    );
};

export default Sort;
