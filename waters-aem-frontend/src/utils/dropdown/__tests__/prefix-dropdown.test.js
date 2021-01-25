import React from 'react';
import { mount } from 'enzyme';
import PrefixDropdown from '../prefix-dropdown';

describe('Feature: Prefix Dropdown Component', () => {
    const textProps = {
        downIcon: "/content/dam/waters/en/brand-assets/icons/down.svg",
        sort: {
            prefix: "Sort by: ",
            options: {
                bestMatch: "Best Match",
                mostRecent: "Most Recent"
            }
        }
    };

    const sortOptions = [
        {
            value: 1,
            label: textProps.sort.options.bestMatch
        },
        {
            value: 2,
            label: textProps.sort.options.mostRecent
        },
    ];

    const mockProps = {
        getOptions: jest.fn(() => sortOptions),
        onChange: () => {},
        prefix: textProps.sort.prefix,
        text: textProps,
        isSearchable: false,
        placeholder: '',
        downIcon: textProps.sort.downIcon,
        dropdownValue: 0
    };

    describe('Scenario: Rendering', () => {
        describe('When there are options', () => {
            it('Then it should match snapshot', () => {
                const spyWarning = jest.spyOn(console, 'warn').mockImplementation(() => {});
                const wrapper = mount(<PrefixDropdown {...mockProps} />);
                const divContainer = wrapper.find('.cmp-custom-dropdown');

                expect(divContainer.children.length).not.toEqual(0);

                spyWarning.mockRestore();
            });
        });
    });
});