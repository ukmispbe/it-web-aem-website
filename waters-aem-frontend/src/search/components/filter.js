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
            isExpanded: false,
            facetGroups: this.mapFacetGroupsState(-1, this.getMappings())
        };
    }

    collapseAllFilters = () => {
        const facetGroups = this.mapFacetGroupsState(-1, this.getMappings());
        this.setState({facetGroups});
    }

    mapFacetGroupsState = (activeIndex, mappings) => {
        // defensive programming
        if (!mappings || !Array.isArray(mappings)) {
            return [];
        }

        if (activeIndex === -1) {
            return mappings;
        }

        const facetGroups = mappings.map((group, groupIndex) => {
            if (groupIndex === activeIndex) {
                // expand the group that was clicked
                return {... group, isExpanded: true};
            } else {
                // ensures all other groups are not expanded
                return {... group, isExpanded: false};
            }
        });

        return facetGroups;
    }

    setState_ActiveFacet = () => {
        if (this.props.facetGroupsSelectedOrder && this.props.facetGroupsSelectedOrder.length !== 0) {
            const lastFacetGroupSelectedName = this.props.facetGroupsSelectedOrder[this.props.facetGroupsSelectedOrder.length - 1];

            const mappings = this.getMappings();

            const lastFacetGroupSelectedIndex = mappings.findIndex(element => element.name === lastFacetGroupSelectedName);

            if (lastFacetGroupSelectedIndex !== -1) {
                const secondToLastFacetGroupsSelectectedName = 
                    this.props.facetGroupsSelectedOrder.length !== 1 
                        ? this.props.facetGroupsSelectedOrder[this.props.facetGroupsSelectedOrder.length - 2]
                        : '';
                
                const lastIndexState = 
                    secondToLastFacetGroupsSelectectedName !== ''
                    ? mappings.findIndex(element => element.name === secondToLastFacetGroupsSelectectedName)
                    : lastFacetGroupSelectedIndex;
                
                const facetGroups = this.mapFacetGroupsState(lastFacetGroupSelectedIndex, mappings);

                this.setState({ 
                    activeIndex: lastFacetGroupSelectedIndex, 
                    facetName: lastFacetGroupSelectedName, 
                    facetGroups, 
                    lastIndex: lastIndexState
                });
            }
        } else if (this.state.activeIndex !== -1) {
            const facetGroups = this.mapFacetGroupsState(this.state.activeIndex, this.getMappings());
            this.setState({facetGroups});
        }
    }

    componentDidMount() {
        this.setState_ActiveFacet();
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

            this.setState({activeIndex: -1, facetName: "", isExpanded: false, lastIndex: -1});
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
                // When the facets have changed it indicates that the facet groups were reordered
                // therefore, it will not have the same index in the array since the array has changed
               this.setState_ActiveFacet();
            }
        }

        if (!prevProps.collapseAllFilters && this.props.collapseAllFilters) {
            this.collapseAllFilters();
        }
    }

    filterHandler(facetName, index) {
        // defensive programming
        if (!this.state.facetGroups || this.state.facetGroups.length === 0) {
            return;
        }
        
        if (this.state.facetGroups[index].isExpanded) {
            const facetGroups = this.mapFacetGroupsState(-1, this.getMappings());
            this.setState({activeIndex: -1, facetGroups, lastIndex: -1});
            document.body.classList.remove('filter-active');
        } else {
            const lastIndex = this.state.activeIndex === -1 ? index : this.state.activeIndex;
            const facetGroups = this.mapFacetGroupsState(index, this.getMappings());
            this.setState({activeIndex: index, facetGroups, lastIndex});
            document.body.classList.add('filter-active');
        }
    }

    getMappings = () => {
        const facetName = `${this.props.contentType}_facet`;

        const facet = Array.isArray(this.props.filterMap.orderedFacets)
            ? this.props.filterMap.orderedFacets.find(item => item.facetName === facetName)
            : null;

        if (!facet) { return; }

        const orderedFacets = facet.orderedFacets.filter(item => this.props.facets[item.facetName]);

        const mapping = orderedFacets.map(facet => {
            return {
                name: facet.facetName,
                category: facet.facetValue,
                facets: this.props.facets[facet.facetName],
                isExpanded: false,
            }
        });

        return mapping;
    };

    getFilters() {
        if(this.props.showTagsOnly) return <></>;

        const props = this.props;
        const mappings = this.state.facetGroups;

        const filters = Array.isArray(mappings) ? mappings.map((item, index) => {
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
                    activeCategory={this.state.facetName}
                    isExpanded={item.isExpanded}
                />
            );
        }) : [];

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
    filterMap: PropTypes.object,
    selectHandler: PropTypes.func.isRequired,
    selectedFacets: PropTypes.object,
    text: PropTypes.object.isRequired,
    showTagsOnly: PropTypes.bool,
    facetGroupsSelectedOrder: PropTypes.array,
    collapseAllFilters: PropTypes.bool,
}

Filter.defaultProps = {
    facets: null,
    filterMap: {
        orderedFacets: []
    },
    showTagsOnly: false,
    facetGroupsSelectedOrder: [],
    collapseAllFilters: false,
}

export default Filter;
