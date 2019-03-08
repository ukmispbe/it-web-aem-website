import React, { Component } from 'react';
import ReactSVG from 'react-svg';

class ShowSortFilter extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        document.body.classList.add('show-sort-filters');
        this.setState({ showSortFilters: true });
        this.props.setupFilters();
    }

    render() {
        const props = this.props;
        return (
            <div className="cmp-search-show-btn">
                <a
                    href="javascript:void(0);"
                    onClick={this.handleInput}
                    className="btn-show-sort-filter"
                >
                    <ReactSVG
                        src={props.text.filterIcon}
                        className="filterIcon"
                    />
                    Sort and Filter
                </a>
            </div>
        );
    }
}

export default ShowSortFilter;
