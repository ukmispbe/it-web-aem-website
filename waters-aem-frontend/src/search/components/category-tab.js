import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScreenSizes from '../../scripts/screenSizes';

class CategoryTab extends Component {
    constructor(props) {
        super(props);
    }

    view = () => { 
        const isActive = this.props.isActive ? " active" : "";
        const tabCountDisplay = " (".concat(this.props.count, ")");
        return (
            <div className={"cmp-search__categories-tabs--tab".concat(isActive)}>
                <span className={"cmp-search__categories-tabs--tab-name"}>{this.props.name}</span><span className={"cmp-search__categories-tabs--tab-count"}>{tabCountDisplay}</span>
            </div>
        );
    }

    render() {
        return (
            <>
                {!ScreenSizes.isTabletAndUnder() ? this.view() : null}
            </>
        );
    }
}

CategoryTab.propTypes = {
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    isActive: PropTypes.bool
};

export default CategoryTab;