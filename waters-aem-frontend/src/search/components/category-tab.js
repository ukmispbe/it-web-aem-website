import React from 'react';
import PropTypes from 'prop-types';
import ScreenSizes from '../../scripts/screenSizes';

const CategoryTab = (props) => {
    const view = () => { 
        const isActive = props.isActive ? " active" : "";
        return (
            <div className={"cmp-search__categories-tabs--tab".concat(isActive)} onClick={e => props.onClick(props.index)}>
                <span className={"cmp-search__categories-tabs--tab-name"}>{props.translation}</span>
            </div>
        );
    }

    return (
        <>
            {!ScreenSizes.isTabletAndUnder() ? view() : null}
        </>
    );
}

CategoryTab.propTypes = {
    translation: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

CategoryTab.defaultProps = {
    translation: '',
    name: '',
    count: 0,
    isActive: false,
    onClick: () => {},
    index: -1
};

export default CategoryTab;