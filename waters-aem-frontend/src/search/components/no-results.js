import React from 'react';
import ReactSVG from 'react-svg';

const NoResults = ({ searchText , query }) => {
    const forQuery = (
        <span>
            for &quot;<strong>{query}</strong>&quot;
        </span>
    );
    return <>
            <h2 className="cmp-search__resultsCount noresults">
                Showing 0 results{' '} {forQuery}
            </h2>,
            <div className="cmp-search__no-results">
                <ReactSVG className="icon" src={searchText.noResultsIcon} />
                <h2>{searchText.noResultsTitle}</h2>
                <p>{searchText.noResultsDescription}<a href={window.location.href.split('?')[0]}>{searchText.noResultsSearchLinkText}</a></p>
            </div>
        </>;
};

export default NoResults;
