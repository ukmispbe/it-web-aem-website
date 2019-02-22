import React from 'react';

const ResultsCount = ({ current, rows, count, query, noQuery }) => {
    const endResults = count > current * rows ? current * rows : count;
    const startResults = current * rows - rows + 1;
    const forQuery = (
        <span>
            for <strong><q className="query">{query}</q></strong>
        </span>
    );

    return (
        <h2 className="cmp-search__resultsCount">
            Showing {startResults}-{endResults} of {count} results{' '}
            {noQuery ? null : forQuery}
        </h2>
    );
};

export default ResultsCount;
