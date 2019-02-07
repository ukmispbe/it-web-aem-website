import React from 'react';

const ResultsCount = ({ current, rows, count, query }) => {
    const endResults = current * rows;
    const startResults = current * rows - rows + 1;
    return (
        <h2 className="cmp-search__resultsCount">
            Showing {startResults}-{endResults} of {count} results for{' '}
            <strong>"{query}"</strong>
        </h2>
    );
};

export default ResultsCount;
