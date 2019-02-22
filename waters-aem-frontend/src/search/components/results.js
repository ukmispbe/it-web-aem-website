import React from 'react';

const monthNameFormatter = (date, locale = 'en-us') => {
    return date.toLocaleString(locale, { month: 'long' });
};

const Result = ({ result, locale }) => {
    const thumbnail = (
        <div className="cmp-search__results-thumbnail">
            <img src={result.thumbnail} alt={result.title} />
        </div>
    );
    console.log('LOCALE:', locale);
    const date = new Date(result.yearpublished);
    const monthName = monthNameFormatter(date, locale);
    const formattedDate = monthName + ' ' + date.getFullYear();
    return (
        <li className="cmp-search__results-item" key={result.literaturecode}>
            {result.thumbnail && thumbnail}
            <div
                className={`cmp-search__results-body ${
                    result.thumbnail ? 'cmp-search__results-body--image' : ''
                }`}
            >
                <a href={result.url} className="cmp-search__results-item-link">
                    <span class="cmp-search__results-item-title">
                        {result.title}
                    </span>
                </a>
                <div className="cmp-search__results-item-description">
                    <div className="cmp-search__results-item-description-text">
                        {result.description}
                    </div>
                </div>
                {result.yearpublished && (
                    <span className="cmp-search__results-item-date">
                        {formattedDate}
                    </span>
                )}
            </div>
        </li>
    );
};

const Results = ({ results, locale }) => {
    const mappedResults = results.map((result, i) => {
        return <Result result={result} locale={locale} key={i} />;
    });

    return (
        <div className="cmp-search__results-container">
            <ul className="cmp-search__results">{mappedResults}</ul>
        </div>
    );
};

export default Results;
