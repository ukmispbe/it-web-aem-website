import React from 'react';

const ResultsCount = ({ current, rows, count, query }) => {
    const endResults = count > current * rows ? current * rows : count;
    const startResults = current * rows - rows + 1;
    return (
        <h2 className="cmp-search__resultsCount">
            Showing {startResults}-{endResults} of {count} results for{' '}
            <strong>"{query}"</strong>
        </h2>
    );
};

export default ResultsCount;
