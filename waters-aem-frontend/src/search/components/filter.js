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
        //TODO: use a proper object here
        const categories = [{name:'Category 1'}, {name:'Category 2'}, {name:'Category 3'}];

        const current = this;
        const props = this.props;
        const state = current.state;
        const filters = categories.map((item, index) =>
                            <FilterSection
                                last={state.lastIndex}
                                selected={state.activeIndex}
                                item={index}
                                handleInput={current.filterHandler.bind(current)}
                                text={props.text}
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
