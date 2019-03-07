import React from 'react';

const ResultsCount = ({ current, rows, count, query, noQuery }) => {
    const endResults = count > current * rows ? current * rows : count;
    const startResults = current * rows - rows + 1;
    const maxLength = 120;
    const thisQuery = (query && query.toString().length > maxLength) ? query.substring(0,maxLength) + '...' : query;
    const forQuery = (
        <span>
            for{' '}
            <strong>
                <q className="query">{thisQuery}</q>
            </strong>
        </span>
    );

    return (
        <h2 className="cmp-search__resultsCount">
            Showing {startResults}-{endResults} of {count} results{' '}
            {noQuery || query === '*:*' ? null : forQuery}
        </h2>
    );
};

export default ResultsCount;
