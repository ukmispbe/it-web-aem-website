import React from 'react';
import { shallow, mount } from 'enzyme';
import screenSizes from '../../../scripts/screenSizes';
import CategoryDropdown from '../category-dropdown';
import props from '../../__mocks__/en_US/'

describe('Feature: Category Dropdown Component', () => {
    const mockProps = {
        categoryOptions: [],
        categoryOnChange: jest.fn(),
        categoryIsSearchable: false,
        categoryPlaceholder: '',
        categoryDownIcon: props.searchText.downIcon,
        categoryValue: 0
    };

    Object.defineProperty(window, 'matchMedia', {
        value: () => ({
            matches: false,
            addListener: () => { },
            removeListener: () => { }
        }),
        writable: true,
        enumerable: true,
        configurable: true
    });

    describe('Scenario: Device Rendering', () => {
        describe('When viewing on desktop', () => {
            beforeAll(() => {
                screenSizes.isTabletAndUnder = jest.fn(() => false);
            });

            it('Then it should match snapshot', () => {
                const wrapper = shallow(<CategoryDropdown {...mockProps} />);

                expect(wrapper.children().length).toEqual(0);
            });
        });

        describe('When viewing on tablet/mobile And there are categories', () => {
            beforeAll(() => {
                screenSizes.isTabletAndUnder = jest.fn(() => true);
            });

            it('Then it should match snapshot', () => {
                const mockProps = {...mockProps, categoryOptions: [
                    {
                        name: 'Tab1',
                        translation: 'Tab Uno',
                        count: 1,
                        isActive: false
                    },
                    {
                        name: 'Tab2',
                        translation: 'Tab Dos',
                        count: 2,
                        isActive: false
                    },
                    {
                        name: 'Tab3',
                        translation: 'Tab Tres',
                        mobileTranslation: 'Tab Tres',
                        count: 3,
                        isActive: false
                    }
                ]};

                const spyWarning = jest.spyOn(console, 'warn').mockImplementation(() => {});
                const wrapper = mount(<CategoryDropdown {...mockProps} />);
                const divContainer = wrapper.find('.cmp-search-category-dropdown');
                
                expect(divContainer.children.length).not.toEqual(0);

                spyWarning.mockRestore();
            });
        });
    });
});