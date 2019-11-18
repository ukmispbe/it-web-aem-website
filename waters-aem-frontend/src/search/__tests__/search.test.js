jest.mock('../../stores/sessionStore');

import React from 'react';
import { createBrowserHistory } from 'history';
import props from '../__mocks__/en_US/index';
import data from '../services/__mocks__/data';
import { SearchService, parameterDefaults } from '../services/index';
import Search from '../search';
import { shallow } from 'enzyme';

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

const buildWrapper = props => {
    const wrapper = shallow(<Search.WrappedComponent {...props} />);
    return wrapper;
};

describe('Feature: Search React Component', () => {
    const searchService = buildService();
    let getCategoriesSpy;

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

        getCategoriesSpy = jest.spyOn(searchService, 'getCategories').mockImplementation(() => data.categories);
    });

    describe('Scenario: Fetching categories from the backend', () => {
        let wrapper;

        beforeAll(() => {
            window.location.search = '';

            const searchProps = {...props};

            searchProps.search = searchService;
            searchProps.history = createBrowserHistory();

            wrapper = buildWrapper(searchProps);
        });

        describe('When loading the component for the first time', () => {
            it('Then fetch categores only one time', () => {
                expect(getCategoriesSpy).toHaveBeenCalledTimes(1);
            });
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });
});