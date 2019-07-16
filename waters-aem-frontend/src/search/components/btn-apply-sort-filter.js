import React, { Component } from 'react';
import domElements from '../../scripts/domElements';
import screenSizes from '../../scripts/screenSizes';

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

    handleClick = () => {
        this.props.applyFilters();

        if (screenSizes.isMobile()) {
            // reposition the header back to its original top location after filters are applied
            const header = domElements.getHeader();
            header.style.top = '';
        }
    }

    render() {
        return <div className="cmp-search-apply-btn">
                <a
                    href="javascript:void(0);"
                    onClick={this.handleClick}
                    className="btn-apply-sort-filter">
                    {this.buttonCaption()}
                </a>
            </div>;
    }
}

export default ApplySortFilter;
