import React from 'react';

const SortBy = () => {
    return (
        <div class="cmp-search-sortby">
            <h2>Sort by</h2>
            <div class="cmp-search-sortby__select">
                <select>
                    <option value="1">Best Match</option>
                    <option value="2">Most Recent</option>
                </select>
            </div>
        </div>
    );
};

export default SortBy;
