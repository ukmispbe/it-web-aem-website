import React, { Component } from 'react';

class ShowSortFilter extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        document.body.classList.add('show-sort-filters');
        this.setState({ showSortFilters: true });
    }

    render() {
        const props = this.props;
        return (
            <a 
            href="javascript:void(0);"
            onClick={this.handleInput}
            class="btn-show-sort-filter"
            >
                Sort and Filter
            </a>
        );
    }

};

export default ShowSortFilter;
