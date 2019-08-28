import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategoryTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isActive = this.props.isActive ? " active" : "";
        const tabDisplay = this.props.name.concat(" (", this.props.count, ")");
        return (
            <div className={"cmp-search__categories-tabs--tab".concat(isActive)}>
                {tabDisplay}
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