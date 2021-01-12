import React from 'react';
import ReactSVG from 'react-svg';
import LinesEllipsis from 'react-lines-ellipsis';

const LitItem = ({ result, nextIcon, key, onItemClick }) => {
    const thumbnail = (
        <div className="cmp-search__results-thumbnail">
            <img src={result.thumbnail} alt={result.title} />
        </div>
    );

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
                    onClick={onItemClick}
                    className="cmp-search__results-item-link"
                >
                    <span className="cmp-search__results-item-title">
                        {result.title}
                    </span>
                </a>
                {result.description && (
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
                )}
                <div className="cmp-search__results-item-breadcrumb">
                    <div>{result.category_facet}</div>
                    <ReactSVG src={nextIcon} />
                    <div>{result.contenttype_facet}</div>
                </div>
            </div>
        </li>
    );
};

export default LitItem;
