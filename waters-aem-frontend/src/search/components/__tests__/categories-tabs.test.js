import React from 'react';
import { shallow } from 'enzyme';
import CategoriesTabs from '../categories-tabs';

describe('Feature: CategoriesTabs React Component', () => {
    const props = {
        items: [],
        activeIndex: -1,
        onClick: () => {}
    };

    describe('Scenario: Rendering', () => {
        describe('When there are no categories', () => {
            it('Then it should not render any category tabs', () => {
                const wrapper = shallow(<CategoriesTabs {...props} />);
                const tabs = wrapper.find('CategoryTab');
                expect(tabs.length).toEqual(0);
            });
        });

        describe('When there are categories and all have search results', () => {
            it('Then it should render all category tabs', () => {
                props.items = [
                    {
                        name: 'Tab1',
                        count: 1,
                        isActive: false
                    },
                    {
                        name: 'Tab2',
                        count: 2,
                        isActive: false
                    }
                ];

                const wrapper = shallow(<CategoriesTabs {...props} />);
                const tabs = wrapper.find('CategoryTab');
                expect(tabs.length).toEqual(props.items.length);
            });
        });

        describe('When there are categories and not all have search results', () => {
            it('Then it should render only category tabs that have results', () => {
                props.items = [
                    {
                        name: 'Tab1',
                        count: 1,
                        isActive: false
                    },
                    {
                        name: 'Tab2',
                        count: 2,
                        isActive: false
                    },
                    {
                        name: 'Tab2',
                        count: 0,
                        isActive: false
                    }
                ];
                const expected = props.items.filter(item => item.count !== 0).length;

                const wrapper = shallow(<CategoriesTabs {...props} />);
                const tabs = wrapper.find('CategoryTab');
                expect(tabs.length).toEqual(expected);
            });
        });
    });
});