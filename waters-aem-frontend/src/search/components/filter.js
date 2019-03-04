import React, { Component } from 'react';
import ReactSVG from 'react-svg';

import FilterTags from './filter-tags';
import FilterSection from './filter-section';



class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: -1,
            lastIndex: -1
        };
    }

    componentWillMount() {

    }

    componentWillReceiveProps() {

    }

    filterHandler(e, index) {
        const state = this.state;
        const lastIndex = this.state.activeIndex;

        this.setState(Object.assign({}, state, {
            activeIndex: index,
            lastIndex: lastIndex
        }));

        //For when same filter is clicked
        if (this.state.lastIndex != -1 && this.state.lastIndex == this.state.activeIndex) {
            this.setState(Object.assign({}, state, {
                activeIndex: index,
                lastIndex: -1
            }));
        }

        //Toggle class for tablet and mobile view styles
        if (!((index == state.activeIndex) && (state.lastIndex != state.activeIndex))) {
            document.body.classList.add('filter-active');
        } else {
            document.body.classList.remove('filter-active');
        }

    }

    getFilters() {
        const current = this;
        const props = this.props;
        const state = current.state;

        //TODO: use a proper object here
        // replace categories with props.facets when implementation is ready
        const categories = [{
            "categoryFacetName": "applicationslibrary_facet1",
            "categoryFacetValue": "Applications Library 1",
            "orderedFacets": [{
                "facetName": "instrumenttype_facet1",
                "facetValue": "Instrument Type"
            }, {
                "facetName": "technique_facet1",
                "facetValue": "Technique"
            }, {
                "facetName": "separationmode_facet1",
                "facetValue": "Separation Mode"
            }]
        },{
            "categoryFacetName": "applicationslibrary_facet2",
            "categoryFacetValue": "Applications Library 2",
            "orderedFacets": [{
                "facetName": "instrumenttype_facet2",
                "facetValue": "Instrument Type"
            }, {
                "facetName": "technique_facet2",
                "facetValue": "Technique"
            }, {
                "facetName": "separationmode_facet2",
                "facetValue": "Separation Mode"
            }]
        },{
            "categoryFacetName": "applicationslibrary_facet3",
            "categoryFacetValue": "Applications Library 3",
            "orderedFacets": [{
                "facetName": "instrumenttype_facet3",
                "facetValue": "Instrument Type"
            }, {
                "facetName": "technique_facet3",
                "facetValue": "Technique"
            }, {
                "facetName": "separationmode_facet3",
                "facetValue": "Separation Mode"
            }]
        }];

        const filters = categories.map((item, index) =>
                            <FilterSection
                                key={`${item.categoryFacetName}#_${index}`}
                                last={state.lastIndex}
                                selected={state.activeIndex}
                                item={index}
                                handleInput={current.filterHandler.bind(current)}
                                text={props.text}
                                facet={item}
                            />
                        );
        return <ul>{ filters }</ul>;
    }

    render() {
        const props = this.props;
        return (
            <div id="js-search-filters" className="cmp-search-filters">
                <h3>Filter by</h3>

                <FilterTags
                    text={props.text}
                />

                {this.getFilters()}
                
            </div>
        );
    }
};

export default Filter;
