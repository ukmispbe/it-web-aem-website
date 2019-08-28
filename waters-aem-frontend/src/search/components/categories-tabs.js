import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CategoryTab from './category-tab';

class CategoriesTabs extends Component {
    constructor(props) {
        super(props);
    }

    createTab(tab) {
        return <CategoryTab
                    name={tab.name}
                    count={tab.count}
                    isActive={tab.isActive}
                />
    }

    mapTabs(tabs) {
        let mappedTabs = [];

        tabs.forEach((tab) => {
            if (tab.count) {
                tab.isActive = mappedTabs.length === this.props.activeIndex;
                mappedTabs.push(tab);
            }
        });

        return mappedTabs.map(this.createTab);
    }

    render() {
        const tabItems = this.props.items;
        const tabs = this.mapTabs(tabItems);
        return (
            <div className={"cmp-search__categories-tabs-container"}>
                <div className={"cmp-search__categories-tabs"}>
                    {tabs}
                </div>
            </div>
        );
    }
}

CategoriesTabs.propTypes = {
    items: PropTypes.array.isRequired,
    activeIndex: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default CategoriesTabs;