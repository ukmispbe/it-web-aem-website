import React, { Component } from 'react';
import ReactSVG from 'react-svg';

class FilterSection extends Component {
    constructor(props) {
        super(props);
    }

    //TODO: add functionality filter

    render() {
        const props = this.props;
        return (
            <li className={ (props.item == props.selected) && (props.last != props.selected) ? 'cmp-search-filters__filter expanded': 'cmp-search-filters__filter'}>

                <h3>
                    <a 
                        href="javascript:void(0);"
                        item={props.item}
                        onClick={e => props.handleInput(e, props.item)}
                    >
                        CATEGORY NAME
                    </a>
                </h3>

                <div className="cmp-search-filters__filter__search">
                    <input type="input" placeholder="Search" />
                </div>

                <ul>
                    <li className="cmp-search-filters__filter__item">
                        <input type="checkbox" name="CATEGORY2_ITEM-NAME1" /><label htmlFor="CATEGORY2_ITEM-NAME1">ITEM NAME <span className="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                    </li>
                    <li className="cmp-search-filters__filter__item">
                        <input type="checkbox" name="CATEGORY2_ITEM-NAME2" /><label htmlFor="CATEGORY2_ITEM-NAME2">ITEM NAME <span className="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                    </li>
                    <li className="cmp-search-filters__filter__item">
                        <input type="checkbox" name="CATEGORY2_ITEM-NAME3" /><label htmlFor="CATEGORY2_ITEM-NAME3">ITEM NAME <span className="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                    </li>
                    <li className="cmp-search-filters__filter__item">
                        <input type="checkbox" name="CATEGORY2_ITEM-NAME4" /><label htmlFor="CATEGORY2_ITEM-NAME4">ITEM NAME <span className="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                    </li>
                    <li className="cmp-search-filters__filter__item">
                        <input type="checkbox" name="CATEGORY2_ITEM-NAME5" /><label htmlFor="CATEGORY2_ITEM-NAME5">ITEM NAME <span className="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                    </li>
                </ul>

                <div className="cmp-search-filters__filter__year clearfix">
                    <div className="cmp-search-filters__filter__year__min">
                        <label htmlFor="year-min">Min</label>
                        <input name="year-min" type="input" placeholder="2009" />
                    </div>
                    <div className="cmp-search-filters__filter__year__max">
                        <label htmlFor="year-max">Max</label>
                        <input name="year-max" type="input" placeholder="2019" />
                    </div>
                </div>


            </li>
        );
    }
};

export default FilterSection;
