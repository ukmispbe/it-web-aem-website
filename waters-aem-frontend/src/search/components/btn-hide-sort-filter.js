import React, { Component } from 'react';
import ReactSVG from 'react-svg';

class HideSortFilter extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        document.body.classList.remove('show-sort-filters');
        document.body.classList.remove('filter-active');
        this.setState({ showSortFilters: true });
    }

    render() {
        const props = this.props;
        return (
            <div className="cmp-search-hide-btn clearfix">
                <a
                    href="javascript:void(0);"
                    onClick={this.handleInput}
                    className="btn-hide-sort-filter"
                >
                    <ReactSVG src={props.text.closeIcon} />
                </a>
            </div>
        );
    }
}

export default HideSortFilter;
