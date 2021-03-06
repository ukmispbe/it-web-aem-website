jest.mock('../../stores/sessionStore');

import React from 'react';
import { createBrowserHistory } from 'history';
import props from '../__mocks__/en_US/index';
import data from '../services/__mocks__/data';
import { SearchService, parameterDefaults } from '../services/index';
import SearchContainer from '../search.container';
import { shallow } from 'enzyme';

const history = createBrowserHistory();

const buildService = () => {
    return new SearchService(
        props.isocode,
        props.searchServicePath,
        parameterDefaults.page,
        parameterDefaults.rows,
        parameterDefaults.sort,
        undefined,
        () => jest.fn(() => {})
    );
}

const buildShallowWrapper = props => {
    const wrapper = shallow(<SearchContainer.WrappedComponent {...props} />);
    return wrapper;
};

describe('Feature: Search React Component', () => {
    const searchService = buildService();
    let getCategoriesSpy,
        getResultsByCategorySpy,
        getContentTypeSpy,
        getSubFacetSpy;

    beforeAll(() => {
        document.getElementById = jest.fn(() => {
            return {
                innerHTML: JSON.stringify(props.skuConfig)
            };
        });

        window.matchMedia = jest.fn(() => {
            return {
                matches: true
            }
        });

        window.scrollTo = jest.fn();

        getCategoriesSpy = jest.spyOn(searchService, 'getCategories').mockImplementation(() => data.categories);
        getResultsByCategorySpy = jest.spyOn(searchService, 'getResultsByCategory').mockImplementation(() => new Promise((resolve, reject) => resolve(data.shop.results)));
        getContentTypeSpy = jest.spyOn(searchService, 'getContentType');
        getSubFacetSpy = jest.spyOn(searchService, 'getSubFacet');
    });

    describe('Scenario: Fetching categories from the backend', () => {
        let wrapper;

        beforeAll(() => {
            const searchProps = {...props};

            searchProps.search = searchService;
            searchProps.history = history;

            wrapper = buildShallowWrapper(searchProps);
        });

        describe('When loading the component for the first time', () => {
            it('Then fetch categores only one time', () => {
                expect(getCategoriesSpy).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('Scenario: Performing a search when the component loads', () => {
        describe('When a category is not specified', () => {
            let wrapper;

            beforeAll(() => {
                const searchProps = {...props};

                searchProps.search = searchService;
                searchProps.history = history;

                wrapper = buildShallowWrapper(searchProps).instance();
            });

            it('Then find the category with the most results', () => {
                expect(wrapper.state.activeTabIndex).toBeDefined();
                expect(wrapper.state.activeTabIndex).not.toEqual(-1);
            });

            it('And execute the search by category', () => {
                expect(getResultsByCategorySpy).toHaveBeenCalled();
            });
        });

        describe('When category only is specified', () => {
            let wrapper;

            beforeAll(() => {
                history.push('http://localhost.com?category=Library');
                const searchProps = {...props};

                searchProps.search = searchService;
                searchProps.history = history;

                wrapper = buildShallowWrapper(searchProps).instance();
            });

            it('Then find the index of the category', () => {
                expect(wrapper.state.activeTabIndex).toBeDefined();
                expect(wrapper.state.activeTabIndex).not.toEqual(-1);
            });

            it('And execute the search by category', () => {
                expect(getResultsByCategorySpy).toHaveBeenCalled();
            });
        });

        describe('When content type is specified', () => {
            let wrapper;

            beforeAll(() => {
                history.push('http://localhost.com?category=Library&content_type=applicationnote');
                const searchProps = {...props};

                searchProps.search = searchService;
                searchProps.history = history;

                wrapper = buildShallowWrapper(searchProps).instance();
            });

            it('Then find the index of the category', () => {
                expect(wrapper.state.activeTabIndex).toBeDefined();
                expect(wrapper.state.activeTabIndex).not.toEqual(-1);
            });

            it('And execute the search by content type', () => {
                expect(getContentTypeSpy).toHaveBeenCalled();
            });
        });

        describe('When at least one sub facet is specified', () => {
            let wrapper;

            beforeAll(() => {
                history.push('http://localhost.com?category=Library&content_type=applicationnote&facet=market_facet:Chemical%2520Analysis');
                const searchProps = {...props};

                searchProps.search = searchService;
                searchProps.history = history;

                wrapper = buildShallowWrapper(searchProps).instance();
            });

            it('Then find the index of the category', () => {
                expect(wrapper.state.activeTabIndex).toBeDefined();
                expect(wrapper.state.activeTabIndex).not.toEqual(-1);
            });

            it('And execute the search by sub facet', () => {
                expect(getSubFacetSpy).toHaveBeenCalled();
            });
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });
});