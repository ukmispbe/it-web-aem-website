import React from 'react';
import PropTypes from 'prop-types';
import CategoryTab from './category-tab';
import Fader from '../../scripts/fade-x.js';

const CategoriesTabs = (props) => {
    const tabs = React.useRef();
    
    const FadeTabs = () => {
        const tabFader = Fader('cmp-search__categories-tabs', 0, 100);
        
        if (tabFader && tabs) {
            tabs.current.addEventListener('scroll', tabFader);
        }
    }

    React.useEffect(() => {
        FadeTabs();
    }, []);

    const createTab = (tab, index) => {
        return <CategoryTab
                    translation={tab.translation}
                    name={tab.name}
                    count={tab.count}
                    isActive={tab.isActive}
                    index={index}
                    onClick={props.onClick}
                    key={`CategoryTab-${index}`}
                />
    }

    const mapTabs = (tabs) => {
        let mappedTabs = [];

        tabs.forEach((tab) => {
            if (tab.count) {
                tab.isActive = mappedTabs.length === props.activeIndex;
                mappedTabs.push(tab);
            }
        });

        return mappedTabs.map((tab, index) => createTab(tab, index));
    }

    return (
        <div className="cmp-search__categories-tabs-container">
            <div ref={tabs} className="cmp-search__categories-tabs">
                {mapTabs(props.items)}
            </div>
        </div>
    );
}

CategoriesTabs.propTypes = {
    items: PropTypes.array.isRequired,
    activeIndex: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

CategoriesTabs.defaultProps = {
    items: [],
    activeIndex: -1,
    onClick: () => {}
};

export default CategoriesTabs;
