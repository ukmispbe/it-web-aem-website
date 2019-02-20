import React, { Component } from 'react';

class TagCloud extends Component {
    constructor(props) {
        super(props);
    }

    handleRelatedSearch(keyword){
        window.location.href = `${this.props.searchPath}?facet=${keyword}`;
    }

    render() {

        const mappedResults = this.props.keywords.map((keyword, i) => {
                    let boundItemClick = this.handleRelatedSearch.bind(this, keyword.filter);
                    return (<li class="cmp-tag-cloud__item" key={i}><a onClick={boundItemClick}>{keyword.title}</a></li>);
                    });
        return ([

            <h3>{this.props.tagCloudTitle}</h3>,
            <ul class="cmp-tag-cloud__list">
                 {mappedResults}
            </ul>
        ]);
    }
}

export default TagCloud;








