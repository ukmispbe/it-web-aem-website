import React, { Component } from 'react';
import ReactSVG from 'react-svg';

import './../../styles/index.scss';

class TagCloud extends Component {
    constructor(props) {
        super(props);
    }

    handleRelatedSearch(keyword){
            console.log(keyword);
            window.location.href = `${this.props.searchPath}`;
    }

    render() {
         const mappedResults = this.props.keywords.map((keyword, i) => {

                    let boundItemClick = this.handleRelatedSearch.bind(this, keyword.filter);

                    return (<li class="cmp-tag-cloud__item" key={i}  onClick={boundItemClick}>{keyword.title}</li>);
                    });
        return (
            <ul class="cmp-tag-cloud__list">
                 {mappedResults}
            </ul>
        );
    }
}

export default TagCloud;








