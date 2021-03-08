import React from 'react';
import ReactSVG from 'react-svg';

const NoResults = ({ searchText , query }) => {
    const renderNoResultsTitle = searchText.noResultsTitle.replace(/[{]query[}]/, "<span>&quot;" + query + "&quot;</span>");

    return <>
        <div className="cmp-search__no-results">
            <h1 dangerouslySetInnerHTML={{__html: renderNoResultsTitle}}/>
            <p>{searchText.noResultsDescription}<a href={window.location.href.split('?')[0]}>{searchText.noResultsSearchLinkText}</a>.</p>
        </div>
    </>;
};

export default NoResults;