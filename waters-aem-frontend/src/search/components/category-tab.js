import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScreenSizes from '../../scripts/screenSizes';

class CategoryTab extends Component {
    constructor(props) {
        super(props);
    }

    view = () => { 
        const isActive = this.props.isActive ? " active" : "";
        return (
            <div className={"cmp-search__categories-tabs--tab".concat(isActive)} onClick={e => this.props.onClick(this.props.index)}>
                <span className={"cmp-search__categories-tabs--tab-name"}>{this.props.name}</span>
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
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

export default CategoryTab;