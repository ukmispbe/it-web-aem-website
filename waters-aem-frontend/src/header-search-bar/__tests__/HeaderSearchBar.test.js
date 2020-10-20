import React from 'react';
import { shallow } from 'enzyme';
import HeaderSearchBar from '../HeaderSearchBar';
import props from '../HeaderSearchBar.mock';
import SearchBar from "../../search/components/searchbar";
import screenSizes from "../../scripts/screenSizes";

describe('<HeaderSearchBar />', () => {
    let enzymeWrapper;
    let searchBar;
    let spyIsMobile = jest.spyOn(screenSizes, 'isMobile').mockImplementation(() => {
                    return true;
                });
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            value: () => ({
                matches: true,
                addListener: () => { },
                removeListener: () => { }
            }),
            writable: true,
            enumerable: true,
            configurable: true
        });
    });
    it('should render without throwing an error', () => {
        enzymeWrapper = shallow(<HeaderSearchBar {...props} />);
        expect(enzymeWrapper).toMatchSnapshot();
    });
    it('should display search icon for mobile view', () => {
        enzymeWrapper = shallow(<HeaderSearchBar {...props} />);
        expect(enzymeWrapper.find('.mobile-search-icon')).toHaveLength(1);
        spyIsMobile.mockClear();
    });
    it('should display search icon for desktop view', () => {
        spyIsMobile = jest.spyOn(screenSizes, 'isMobile').mockImplementation(() => {
                    return false;
                });
        enzymeWrapper = shallow(<HeaderSearchBar {...props} />);
        expect(enzymeWrapper.find(SearchBar)).toHaveLength(1);
    });
});