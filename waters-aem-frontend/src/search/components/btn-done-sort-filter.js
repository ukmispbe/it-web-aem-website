import React, { Component } from 'react';

class DoneSortFilter extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        document.body.classList.remove('filter-active');

        //TODO: add functionality to remove expanded class from current selected filter
    }

    render() {
        const props = this.props;
        return (
            <div className="cmp-search-done-btn">
                <a
                    href="javascript:void(0);"
                    onClick={this.handleInput}
                    className="btn-done-sort-filter"
                >
                    {props.text.doneButton}
                </a>
            </div>
        );
    }
}

export default DoneSortFilter;
