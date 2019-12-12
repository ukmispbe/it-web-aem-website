import React from 'react';
import PropTypes from 'prop-types';

const ContentTypeMenu = props => {
    const Items = 
        () =>
            props.items.map(item => {
                    return (
                        <div key={item.categoryFacetName} 
                            className="categories-type-menu-container__item"
                            onClick={() => props.onClick(item)}>
                            
                            <div>
                                <a href="javascript:void(0)"
                                    data-count={` (${item.count})`}>
                                    {item.facetTranslation}
                                </a>
                            </div>
                        </div>
                    );
                });
    
    return (
        <div className="content-type-menu-container">
            <div className="content-type-menu-container__heading">{props.heading}</div>
            <div className="content-type-menu-container__body">
                <Items />
            </div>
        </div>
    ); 
}

ContentTypeMenu.propTypes = {
    heading: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClick: PropTypes.func.isRequired
};

ContentTypeMenu.defaultProps = {
    heading: '',
    items: [],
    onClick: () => {}
};

export default ContentTypeMenu;