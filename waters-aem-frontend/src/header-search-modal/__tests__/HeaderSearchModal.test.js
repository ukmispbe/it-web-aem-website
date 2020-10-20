import React from 'react';
import { shallow } from 'enzyme';
import HeaderSearchModal from '../HeaderSearchModal';
import props from '../HeaderSearchModal.mock';

describe('<HeaderSearchModal />', () => {
    let enzymeWrapper;
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
        enzymeWrapper = shallow(<HeaderSearchModal {...props} />);
        expect(enzymeWrapper).toMatchSnapshot();
    });
    it('should display header search modal when showSearchModal is called', () => {
        enzymeWrapper = shallow(<HeaderSearchModal {...props} />);
        const componentInstance = enzymeWrapper.instance();
        componentInstance.showSearchModal();
        expect(enzymeWrapper.state('mobileSearchOpen')).toBe(true);
        expect(enzymeWrapper.find('.mobile-header-search-bar')).toHaveLength(1);
    });
    it('should hide header search modal when close icon is clicked', () => {
        enzymeWrapper = shallow(<HeaderSearchModal {...props} />);
        const componentInstance = enzymeWrapper.instance();
        componentInstance.showSearchModal();
        expect(enzymeWrapper.state('mobileSearchOpen')).toBe(true);
        enzymeWrapper.find('.mobile-clear-icon').simulate('click');
        expect(enzymeWrapper.state('mobileSearchOpen')).toBe(false);
        expect(enzymeWrapper.find('.mobile-header-search-bar')).toHaveLength(0);
    });
});