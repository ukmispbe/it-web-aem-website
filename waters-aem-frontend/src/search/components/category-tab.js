import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategoryTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isActive = this.props.isActive ? " active" : "";
        const tabCountDisplay = " (".concat(this.props.count, ")");
        return (
            <div className={"cmp-search__categories-tabs--tab".concat(isActive)}>
                <span className={"cmp-search__categories-tabs--tab-name"}>{this.props.name}</span><span className={"cmp-search__categories-tabs--tab-count"}>{tabCountDisplay}</span>
            </div>
        );
    }
}

CategoryTab.propTypes = {
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    isActive: PropTypes.bool
};

export default CategoryTab;