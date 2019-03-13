import React, { Component } from 'react';
import ReactSVG from 'react-svg';

class FilterSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearch: false,
            showSearchMin: 2, //Set proper default here
            initialItems: props.facet.facets,
            items: [],
        };
    }

    componentWillMount() {
        this.setState({ items: this.state.initialItems });
    }

    filterList(event) {
        const state = this.state;
        var updatedList = state.initialItems;
        updatedList = updatedList.filter(function(item) {
            return (
                item.facetValue
                    .toLowerCase()
                    .search(event.target.value.toLowerCase()) !== -1
            );
        });
        this.setState({ items: updatedList });
    }

    checkHandler(event) {
        event.currentTarget.nextElementSibling.click();
    }

    getFacetOptions() {
        const options = this.state.items;
        const option = options.map((item, index) => {
            let checked = false;
            if (this.props.selectedFacets[this.props.facet.name]) {
                for (
                    let i = 0;
                    i < this.props.selectedFacets[this.props.facet.name].length;
                    i++
                ) {
                    const f = this.props.selectedFacets[this.props.facet.name][
                        i
                    ];
                    if (f === item.value) checked = true;
                }
            }
            return (
                <li
                    className="cmp-search-filters__filter__item"
                    key={`${item.value}#_${index}`}
                >
                    <a 
                        href="javascript:void(0)"
                        className={"checkbox " + (checked ? 'checked' : '')}
                        onClick={this.checkHandler.bind(this)}
                    >
                        <ReactSVG
                            src={this.props.text.checkmarkIcon}
                        />
                    </a>
                    <input
                        type="checkbox"
                        name={`${this.props.name}:${item.value}`}
                        onChange={e =>
                            this.props.selectHandler(
                                item.value,
                                this.props.facet.name,
                                e
                            )
                        }
                        checked={checked}
                    />
                    <label htmlFor={`${this.props.name}:${item.value}`}>
                        {item.value}{' '}
                        <span className="cmp-search-filters__filter__item__count">
                            ({item.count})
                        </span>
                    </label>
                </li>
            );
        });

        return option;
    }

    showSearcbar() {
        const props = this.props;
        const options = props.facet.orderedFacets;
        let search = '';

        if (options.length > this.state.showSearchMin) {
            search = (
                <div className="cmp-search-filters__filter__search">
                    <ReactSVG
                        src={props.text.searchIcon}
                        className="searchIcon"
                    />
                    <input
                        type="input"
                        placeholder="Search"
                        onChange={this.filterList.bind(this)}
                    />
                </div>
            );
        }

        return search;
    }

    render() {
        const props = this.props;

        return (
            <li
                className={
                    props.item == props.selected && props.last != props.selected
                        ? 'cmp-search-filters__filter expanded'
                        : 'cmp-search-filters__filter'
                }
            >
                    <a
                        href="javascript:void(0);"
                        item={props.item}
                        onClick={e => props.handleInput(e, props.item)}
                    >
                        <ReactSVG
                            src={props.text.expandIcon}
                            className="expandIcon"
                        />
                        <ReactSVG
                            src={props.text.collapseIcon}
                            className="collapseIcon"
                        />
                        <ReactSVG
                            src={props.text.nextIcon}
                            className="mobileIcon"
                        />
                        {props.facet.category}
                    </a>

                {/* WIP Search  */}
                {/* {this.showSearcbar()} */}

                <ul>{this.getFacetOptions()}</ul>

                {/* <div className="cmp-search-filters__filter__year clearfix">
                    <div className="cmp-search-filters__filter__year__min">
                        <label htmlFor="year-min">Min</label>
                        <input
                            name="year-min"
                            type="input"
                            placeholder="2009"
                        />
                    </div>
                    <div className="cmp-search-filters__filter__year__max">
                        <label htmlFor="year-max">Max</label>
                        <input
                            name="year-max"
                            type="input"
                            placeholder="2019"
                        />
                    </div>
                </div> */}
            </li>
        );
    }
}

export default FilterSection;
