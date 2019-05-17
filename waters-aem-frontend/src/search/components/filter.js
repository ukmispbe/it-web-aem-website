import React, { Component } from 'react';
import FilterSection from './filter-section';
import validator from 'validator';
import PropTypes from 'prop-types';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: -1,
            lastIndex: -1,
            facetName: '',
        };
    }

    componentDidUpdate(prevProps) {
        /*
            Check if content type was removed and there is an expanded filter.
            If so, reset state so all filters are collapsed.
        */
        if(prevProps.contentType && !this.props.contentType && this.state.activeIndex !== -1) {
            const classNameFilterActive = 'filter-active';

            if(Array.from(document.body.classList).find(item => item === classNameFilterActive)) {
                document.body.classList.remove(classNameFilterActive);
            }

            this.setState({activeIndex: -1, facetName: "", lastIndex: -1});
            return;
        }


        /*
            This will validate the selected facet group.
            If the facet groups have been modified due to other facets being checked off,
            then this will recaludate the active index because it may have changed.
        */
        if (this.state.activeIndex !== -1) {
            const prevFacets = JSON.stringify(prevProps.facets);
            const currFacets = JSON.stringify(this.props.facets);

            if (!validator.equals(prevFacets, currFacets)) {
                /*
                    Since the facets prop has changed check to see
                    if the active index has changed
                */

                // get mappings because they have been reordered
                const mappings = this.getMappings();

                const indexOfSelectedFacet = mappings.findIndex(
                    element => element.name === this.state.facetName
                );

                if (indexOfSelectedFacet !== -1) {
                    this.setState({ activeIndex: indexOfSelectedFacet });
                }
            }
        }
    }

    filterHandler(facetName, index) {
        const state = this.state;
        const lastIndex = this.state.activeIndex;

        this.setState(
            Object.assign({}, state, {
                activeIndex: index,
                lastIndex: lastIndex,
                facetName,
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
                    facetName,
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

    getMappings = () => {
        const defaultFacet = this.props.contentType + '_facet';
        const mapping = [];

        for (let i = 0; i < this.props.filterMap.length; i++) {
            if (this.props.filterMap[i].categoryFacetName === defaultFacet) {
                const categories = this.props.filterMap[i].orderedFacets;

                for (let c = 0; c < categories.length; c++) {
                    const category = categories[c];

                    if (this.props.facets[category.facetName]) {
                        mapping.push({
                            name: category.facetName,
                            category: category.facetValue,
                            facets: this.props.facets[category.facetName],
                        });
                    }
                }
            }
        }

        return mapping;
    };

    getFilters() {
        if(this.props.showTagsOnly) return <></>;

        const props = this.props;
        const mappings = this.getMappings();

        const filters = mappings.map((item, index) => {
            return (
                <FilterSection
                    key={`${item.category}#_${index}`}
                    last={this.state.lastIndex}
                    selected={this.state.activeIndex}
                    item={index}
                    handleInput={e => this.filterHandler(item.name, index)}
                    text={props.text}
                    facet={item}
                    selectHandler={props.selectHandler}
                    selectedFacets={props.selectedFacets}
                    minItemSearch={21}
                    minCharSearch={2}
                />
            );
        });

        return <ul>{filters}</ul>;
    }

    render() {
        return <div id="js-search-filters" className="cmp-search-filters">
                {this.props.facets && this.getFilters()}
            </div>;
    }
}

Filter.propTypes = {
    contentType: PropTypes.string,
    defaultFacet: PropTypes.string,
    facets: PropTypes.any,
    filterMap: PropTypes.array,
    selectHandler: PropTypes.func.isRequired,
    selectedFacets: PropTypes.object,
    text: PropTypes.object.isRequired,
    showTagsOnly: PropTypes.bool
}

Filter.defaultProps = {
    facets: null,
    filterMap: [],
    showTagsOnly: false
}

export default Filter;
