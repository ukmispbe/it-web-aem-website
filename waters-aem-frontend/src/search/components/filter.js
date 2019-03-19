import React, { Component } from 'react';
import ReactSVG from 'react-svg';

import FilterTags from './filter-tags';
import FilterSection from './filter-section';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: -1,
            lastIndex: -1,
        };
    }

    filterHandler(e, index) {
        const state = this.state;
        const lastIndex = this.state.activeIndex;

        this.setState(
            Object.assign({}, state, {
                activeIndex: index,
                lastIndex: lastIndex,
            })
        );

        //For when same filter is clicked
        if (
            this.state.lastIndex != -1 &&
            this.state.lastIndex == this.state.activeIndex
        ) {
            this.setState(
                Object.assign({}, state, {
                    activeIndex: index,
                    lastIndex: -1,
                })
            );
        }

        //Toggle class for tablet and mobile view styles
        if (
            !(
                index == state.activeIndex &&
                state.lastIndex != state.activeIndex
            )
        ) {
            document.body.classList.add('filter-active');
        } else {
            document.body.classList.remove('filter-active');
        }
    }

    getFilters() {
        const current = this;
        const props = this.props;
        const state = current.state;
        const facets = props.facets;
        const defaultFacetSplit = decodeURI(props.defaultFacet).split('%2F');
        const defaultFacet =
            defaultFacetSplit[defaultFacetSplit.length - 1] + '_facet';
        const mapping = [];

        for (let i = 0; i < props.filterMap.length; i++) {
            if (props.filterMap[i].categoryFacetName === defaultFacet) {
                const appLibrary = props.filterMap[i];
                const categories = appLibrary.orderedFacets;

                for (let c = 0; c < categories.length; c++) {
                    const category = categories[c];

                    if (facets[category.facetName]) {
                        mapping.push({
                            name: category.facetName,
                            category: category.facetValue,
                            facets: facets[category.facetName],
                        });
                    }
                }
            }
        }

        const filters = mapping.map((item, index) => {
            return (
                <FilterSection
                    key={`${item.category}#_${index}`}
                    last={state.lastIndex}
                    selected={state.activeIndex}
                    item={index}
                    handleInput={current.filterHandler.bind(current)}
                    text={props.text}
                    facet={item}
                    selectHandler={props.selectHandler}
                    selectedFacets={props.selectedFacets}
                />
            );
        });

        return <ul>{filters}</ul>;
    }

    render() {
        const props = this.props;
        return (
            <div id="js-search-filters" className="cmp-search-filters">
                <h3>{props.text.filterByHeading}</h3>

                {props.filterTags}

                {props.facets && this.getFilters()}
            </div>
        );
    }
}

export default Filter;
