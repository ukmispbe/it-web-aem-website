import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import domElements from '../../scripts/domElements';
import screenSizes from '../../scripts/screenSizes';

class ShowSortFilter extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleInput = this.handleInput.bind(this);
        this.sortFilterBtnRef = React.createRef();
    }

    handleInput(e) {
        const showFilterClass = 'show-sort-filters';
        const header = domElements.getHeader();
        const sortFilterModal = domElements.getSortFilterhModal();

        if (document.body.classList.contains(showFilterClass)) {
            document.body.classList.remove(showFilterClass);
            document.body.classList.remove('filter-active');
            this.setState({ showSortFilters: true });

            this.props.resetToSavedState();
            this.props.collapseFilters();
            
            header.style.display = '';
            sortFilterModal.style.top = '';
        } else {
            document.body.classList.add(showFilterClass);
            this.setState({ showSortFilters: true });
            this.props.setupFilters();

            domElements.noScroll(true);

            if (screenSizes.isMobile()) {
                // hide header so the sort filter is fixed at the top of the page
                header.style.display = 'none';

                // shift the sort filter modal to the bottom of the sort filter button
                const sortFilterButtonBottom = this.sortFilterBtnRef.current.getBoundingClientRect().bottom;
                sortFilterModal.style.top = `${sortFilterButtonBottom - 1}px`;
            }
        }
    }

    render() {
        const props = this.props;
        return (
            <div className="cmp-search-show-btn">
                <a
                    ref={this.sortFilterBtnRef}
                    href="javascript:void(0);"
                    onClick={this.handleInput}
                    className="btn-show-sort-filter"
                >
                    <ReactSVG
                        src={props.text.filterIcon}
                        className="filterIcon"
                    />
                    <ReactSVG 
                        src={props.text.closeIcon}
                        className="closeIcon"
                    />
                    {props.text.sortAndFilterButton}
                </a>
            </div>
        );
    }
}

export default ShowSortFilter;
