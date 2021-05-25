import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';

import resourceData from './services';

function Resource(props) {
    const {
        searchPath,
        searchBaseUrl,
        title,
        resourceQuery,
        searchResultQuery,
        viewAll,
        multipleIcon
    } = props;
    const [documents, setDocuments] = useState([]);
    const [totalDocuments, setTotalDocuments] = useState(0);

    useEffect(() => {
        resourceData(`${searchBaseUrl}/${resourceQuery}`)
            .then(({ documents: docs, numFound }) => {
                setDocuments(() => docs);
                setTotalDocuments(() => numFound);
            });
    }, []);

    function handleViewAll() {
        if (documents.length >= parseInt(totalDocuments, 10)) return null;
        return (
            <li className="cmp-resource-section__list__item">
                <a
                    href={`${searchPath}?${searchResultQuery}`}
                    className="cmp-resource-section__list__view-all"
                >
                    <ReactSVG src={multipleIcon} /><span>{viewAll}</span>
                </a>
            </li>
        )
    }

    function resourceItem(item, key) {
        return (
            <li className="cmp-resource-section__list__item" key={key}>
                <a href={item.url} data-locator="resource-item">{item.title}</a>
                <span className="cmp-resource-section__list__year">{item.yearpublished_facet}</span>
            </li>
        );
    }

    function getResources() {
        const resources = Array.isArray(documents) ? documents.map((item, index) => resourceItem(item, index)) : [];
        return <ul>{resources} {handleViewAll()}</ul>;
    }

    return (
        <div className="cmp-resource-section">
            {title && <h4>{title}</h4>}
            <div className="cmp-resource-section__list">
                {getResources()}
            </div>
        </div>
    );
}

Resource.propTypes = {
    searchPath: PropTypes.string.isRequired,
    searchBaseUrl: PropTypes.string.isRequired,
    title: PropTypes.string,
    resourceQuery: PropTypes.string.isRequired,
    searchResultQuery: PropTypes.string.isRequired,
    viewAll: PropTypes.string,
    multipleIcon: PropTypes.string
}

Resource.defaultProps = {
    title: '',
    viewAll: '',
    multipleIcon: '/content/dam/waters/en/brand-assets/icons/multiple.svg'
}

export default Resource;