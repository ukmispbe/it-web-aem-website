import React from 'react';
import ReactSVG from 'react-svg';

import FilterTags from './filter-tags';

const Filter = props => {
    return (
        <div id="js-search-filters" class="cmp-search-filters">
            <h3>Filter by</h3>

            <FilterTags />

            <ul>

                <li class="cmp-search-filters__filter expanded">
                    <h3>
                        <a href="javascript:void(0);">
                        CATEGORY 1
                        </a>
                    </h3>
                    <ul>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY1_ITEM-NAME1" /><label for="CATEGORY1_ITEM-NAME1">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY1_ITEM-NAME2" /><label for="CATEGORY1_ITEM-NAME2">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY1_ITEM-NAME3" /><label for="CATEGORY1_ITEM-NAME3">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY1_ITEM-NAME4" /><label for="CATEGORY1_ITEM-NAME4">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY1_ITEM-NAME5" /><label for="CATEGORY1_ITEM-NAME5">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY1_ITEM-NAME6" /><label for="CATEGORY1_ITEM-NAME6">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY1_ITEM-NAME7" /><label for="CATEGORY1_ITEM-NAME7">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY1_ITEM-NAME8" /><label for="CATEGORY1_ITEM-NAME8">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY1_ITEM-NAME9" /><label for="CATEGORY1_ITEM-NAME9">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY1_ITEM-NAME10" /><label for="CATEGORY1_ITEM-NAME10">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                    </ul>
                </li>


                <li class="cmp-search-filters__filter expanded">
                    <h3><a href="javascript:void(0);">CATEGORY 2</a></h3>
                    <div class="cmp-search-filters__filter__search">
                        <input type="input" placeholder="Search" />
                    </div>
                    <ul>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY2_ITEM-NAME1" /><label for="CATEGORY2_ITEM-NAME1">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY2_ITEM-NAME2" /><label for="CATEGORY2_ITEM-NAME2">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY2_ITEM-NAME3" /><label for="CATEGORY2_ITEM-NAME3">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY2_ITEM-NAME4" /><label for="CATEGORY2_ITEM-NAME4">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY2_ITEM-NAME5" /><label for="CATEGORY2_ITEM-NAME5">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                    </ul>
                </li>


                <li class="cmp-search-filters__filter">
                    <h3><a href="javascript:void(0);">CATEGORY 3</a></h3>
                    <ul>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY3_ITEM-NAME1" /><label for="CATEGORY3_ITEM-NAME1">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY3_ITEM-NAME2" /><label for="CATEGORY3_ITEM-NAME2">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY3_ITEM-NAME3" /><label for="CATEGORY3_ITEM-NAME3">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY3_ITEM-NAME4" /><label for="CATEGORY3_ITEM-NAME4">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY3_ITEM-NAME5" /><label for="CATEGORY3_ITEM-NAME5">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                    </ul>
                </li>


                <li class="cmp-search-filters__filter">
                    <h3><a href="javascript:void(0);">CATEGORY 4</a></h3>
                    <ul>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY4_ITEM-NAME1" /><label for="CATEGORY4_ITEM-NAME1">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY4_ITEM-NAME2" /><label for="CATEGORY4_ITEM-NAME2">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY4_ITEM-NAME3" /><label for="CATEGORY4_ITEM-NAME3">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY4_ITEM-NAME4" /><label for="CATEGORY4_ITEM-NAME4">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                        <li class="cmp-search-filters__filter__item">
                            <input type="checkbox" name="CATEGORY4_ITEM-NAME5" /><label for="CATEGORY4_ITEM-NAME5">ITEM NAME <span class="cmp-search-filters__filter__item__count">(COUNT)</span></label>
                        </li>
                    </ul>
                </li>


                <li class="cmp-search-filters__filter expanded">
                    <h3><a href="javascript:void(0);">YEAR PUBLISHED</a></h3>
                    <div class="cmp-search-filters__filter__year clearfix">
                        <div class="cmp-search-filters__filter__year__min">
                            <label for="year-min">Min</label>
                            <input name="year-min" type="input" placeholder="2009" />
                        </div>
                        <div class="cmp-search-filters__filter__year__max">
                            <label for="year-max">Max</label>
                            <input name="year-max" type="input" placeholder="2019" />
                        </div>
                    </div>
                </li>

            </ul>
        </div>
    );
};

export default Filter;
