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

    buttonCaption = () => this.props.isPristine ? this.props.text.applyButton : this.props.text.showResultCount.replace(/[{]count[}]/, this.props.count);

    render() {
        return <div className="cmp-search-apply-btn">
                <a
                    href="javascript:void(0);"
                    onClick={e => this.props.applyFilters()}
                    className="btn-apply-sort-filter">
                    {this.buttonCaption()}
                </a>
            </div>;
    }
}

export default ApplySortFilter;
