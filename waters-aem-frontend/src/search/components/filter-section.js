import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import validator from 'validator';
import PropTypes from 'prop-types';

class FilterSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: props.facet.facets,
            searchValue: '',
        };

        this.searchRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        /*
            This will check if the facets have been modified
            due to other facets being checked off.  If so,
            set state using the updated facets props.
        */

        const prevFacets = JSON.stringify(prevProps.facet.facets);
        const currFacets = JSON.stringify(this.props.facet.facets);

        if (!validator.equals(prevFacets, currFacets)) {
            this.setStateForItems(this.props.facet.facets);

            /*
                Since the facets prop has changed check to see
                if there is a search value so it can be
                applied on the updated facets props
            */

            if (
                this.searchRef.current &&
                !this.isEmpty(this.state.searchValue)
            ) {
                this.handleSearchChange(
                    this.state.searchValue,
                    this.props.minCharSearch,
                    this.props.facet.facets
                );
            }
        }
    }

    setStateForItems = items => this.setState({ items });
    setStateForSearchValue = searchValue => this.setState({ searchValue });

    isEmpty = value => validator.isEmpty(value, { ignore_whitespace: false });

    lengthLessThan = (value, lengthComparison) =>
        value.length < lengthComparison;

    valueStartsWith = (value, valueComparison) =>
        value.toLowerCase().startsWith(valueComparison.toLowerCase());

    filterList = (value, minCharSearch, items) =>
        this.isEmpty(value) || this.lengthLessThan(value, minCharSearch)
            ? items
            : items.filter(item => this.valueStartsWith(item.value, value));

    handleSearchChange = (value, minCharSearch, items) => {
        this.setStateForSearchValue(value);
        this.setStateForItems(this.filterList(value, minCharSearch, items));
    };

    handleClearClick = (minCharSearch, items) => {
        this.setStateForSearchValue('');
        this.setStateForItems(this.filterList('', minCharSearch, items));
    };

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
                        className={'checkbox ' + (checked ? 'checked' : '')}
                        onClick={this.checkHandler.bind(this)}
                    >
                        <ReactSVG src={this.props.text.checkmarkIcon} />
                    </a>
                    <input
                        type="checkbox"
                        name={`${this.props.name}:${item.value}`}
                        onChange={e =>
                            this.props.selectHandler(
                                item.value,
                                this.props.facet.name,
                                e,
                                this.props.selected
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

    getFacetSearch = (items, minItemSearch) => {
        if (items.length >= minItemSearch) {
            return (
                <div className="cmp-search-filters__filter__search">
                    {!this.state.searchValue.length ? (
                        <ReactSVG
                            src={this.props.text.searchIcon}
                            className="searchIcon"
                        />
                    ) : (
                        <ReactSVG
                            src={this.props.text.closeIcon}
                            className="closeIcon"
                            onClick={() =>
                                this.handleClearClick(
                                    this.props.minCharSearch,
                                    this.props.facet.facets
                                )
                            }
                        />
                    )}
                    <input
                        type="input"
                        placeholder="Search"
                        onChange={e =>
                            this.handleSearchChange(
                                e.target.value,
                                this.props.minCharSearch,
                                this.props.facet.facets
                            )
                        }
                        value={this.state.searchValue}
                        ref={this.searchRef}
                    />
                </div>
            );
        }
    };

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
                    className="filter-toggle"
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

                <div className="facet-container">
                    {this.getFacetSearch(
                        this.props.facet.facets,
                        this.props.minItemSearch
                    )}
                    <ul>{this.getFacetOptions()}</ul>
                </div>
            </li>
        );
    }
}

FilterSection.propTypes = {
    facet: PropTypes.object.isRequired,
    handleInput: PropTypes.func.isRequired,
    item: PropTypes.number.isRequired,
    last: PropTypes.number.isRequired,
    minCharSearch: PropTypes.number.isRequired,
    minItemSearch: PropTypes.number.isRequired,
    selectHandler: PropTypes.func.isRequired,
    selected: PropTypes.number.isRequired,
    selectedFacets: PropTypes.object,
    text: PropTypes.object.isRequired,
};

export default FilterSection;
