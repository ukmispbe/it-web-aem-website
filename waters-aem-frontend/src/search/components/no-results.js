import React from 'react';
import ReactSVG from 'react-svg';

const NoResults = ({ searchText }) => {
    return (
        <div className="cmp-search__no-results">
            <ReactSVG src={searchText.noResultsIcon} />
            <h2>{searchText.noResultsTitle}</h2>
            <p>{searchText.noResultsDescription}</p>
        </div>
    );
};

export default NoResults;
