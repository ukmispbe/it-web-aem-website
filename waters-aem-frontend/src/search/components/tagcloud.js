import React, { Component } from 'react';

class TagCloud extends Component {
    constructor(props) {
        super(props);
    }

    handleRelatedSearch(keyword){
        const filter = keyword.split(':');
        const filterCategory = filter[0]
        const filterValue = encodeURI(encodeURIComponent(filter[1]));
        window.location.href = `${this.props.searchPath}?facet=${filterCategory}:${filterValue}`;
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

export default TagCloud;








