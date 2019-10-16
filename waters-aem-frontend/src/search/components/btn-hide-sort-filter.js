import React, { Component } from 'react';
import ReactSVG from 'react-svg';

class HideSortFilter extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    render() {
        const props = this.props;
        return (
            <div className="cmp-search-hide-btn clearfix">
                <a
                    href="javascript:void(0);"
                    onClick={props.onClick}
                    className="btn-hide-sort-filter"
                >
                    <ReactSVG src={props.text.closeIcon} />
                    {props.text.sortAndFilterButton}
                </a>
            </div>
        );
    }
}

export default HideSortFilter;
