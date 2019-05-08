import React from 'react';
import ReactSVG from 'react-svg';
import LinesEllipsis from 'react-lines-ellipsis';

const monthNameFormatter = (date, locale = 'en-us') => {
    return date.toLocaleString(locale, { month: 'long' });
};

const Result = ({ result, locale, nextIcon }) => {
    const thumbnail = (
        <div className="cmp-search__results-thumbnail">
            <img src={result.thumbnail} alt={result.title} />
        </div>
    );

    const setStorageProperties = () => {
        const scrolled =
            (window.pageYOffset || window.document.scrollTop) -
            (window.document.clientTop || 0);

        window.sessionStorage.setItem('waters.previousPagePosition', scrolled);
        window.sessionStorage.setItem(
            'waters.fromSearchURL',
            JSON.stringify(window.location.href)
        );
    };

    return (
        <li className="cmp-search__results-item" key={result.literaturecode}>
            {result.thumbnail && thumbnail}
            <div
                className={`cmp-search__results-body ${
                    result.thumbnail ? 'cmp-search__results-body--image' : ''
                }`}
            >
                <a
                    href={result.url}
                    onClick={e => setStorageProperties()}
                    className="cmp-search__results-item-link"
                >
                    <span className="cmp-search__results-item-title">
                        {result.title}
                    </span>
                </a>
                <div className="cmp-search__results-item-description">
                    <div className="cmp-search__results-item-description-text">
                        <LinesEllipsis
                            text={result.description}
                            maxLine="3"
                            ellipsis="…"
                            trimRight
                            basedOn="words"
                            clamped="true"
                        />
                    </div>
                </div>
                <div className="cmp-search__results-item-breadcrumb">
                    <div>{result.category_facet}</div>
                    <ReactSVG src={nextIcon} />
                    <div>{result.contenttype_facet}</div>
                </div>
            </div>
        </li>
    );
};

const Results = ({ results, locale, nextIcon }) => {
    const mappedResults = results.map((result, i) => {
        return <Result result={result} locale={locale} nextIcon={nextIcon} key={i} />;
    });

    return (
        <div className="cmp-search__results-container">
            <ul className="cmp-search__results">{mappedResults}</ul>
        </div>
    );
};

export default Results;
