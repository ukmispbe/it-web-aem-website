import React from 'react';

const Result = ({ result }) => {
    return (
        <li className="cmp-search__results-item" key={result.literaturecode}>
            <a href={result.url} className="cmp-search__results-item-link">
                {result.title}
            </a>
            <p className="cmp-search__results-item-description">
                {result.description}
            </p>
        </li>
    );
};

const Results = ({ results }) => {
    const mappedResults = results.map((result, i) => {
        return <Result result={result} key={i} />;
    });

    return (
        <div className="cmp-search__results-container">
            <ul className="cmp-search__results">{mappedResults}</ul>
        </div>
    );
};

export default Results;
