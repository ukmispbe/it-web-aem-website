import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SessionStore from '../../stores/sessionStore';

class TagCloud extends Component {
    constructor(props) {
        super(props);

        this.sessionStore = new SessionStore();
    }

    handleRelatedSearch(keyword){
        const filter = keyword.split(':');
        const filterCategory = filter[0];
        const filterValue = encodeURI(encodeURIComponent(filter[1]));
        this.sessionStore.removePreviousPagePosition();
        window.location.href = `${this.props.searchPath}?category=${this.props.category}&content_type=${this.props.contentType}&facet=${filterCategory}:${filterValue}`;
    }

    render() {

        const mappedResults = this.props.keywords.map((keyword, i) => {
                    let boundItemClick = this.handleRelatedSearch.bind(this, keyword.filter);
                    return (<li className="cmp-tag-cloud__item" key={i}><a onClick={boundItemClick}>{keyword.title}</a></li>);
                    });
        return ([

            <h3>{this.props.tagCloudTitle}</h3>,
            <ul className="cmp-tag-cloud__list">
                 {mappedResults}
            </ul>
        ]);
    }
}

TagCloud.propTypes = {
    category: PropTypes.string,
    contentType: PropTypes.string,
    keywords: PropTypes.array,
    searchPath: PropTypes.string,
    tagCloudTitle: PropTypes.string
}

export default TagCloud;








