import React, { Component } from 'react';

class ApplySortFilter extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        this.setState({ showSortFilters: true });
    }

    render() {
        const props = this.props;
        return (
            <div className="cmp-search-apply-btn">
                <a
                    href="javascript:void(0);"
                    onClick={this.handleInput}
                    className="btn-apply-sort-filter"
                >
                    Apply
                </a>
            </div>
        );
    }
}

export default ApplySortFilter;
