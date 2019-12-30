jest.mock('../../../scripts/fade-x');

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
                        translation: 'Tab Uno',
                        count: 1,
                        isActive: false
                    },
                    {
                        name: 'Tab2',
                        translation: 'Tab Dos',
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

    describe('Scenario: Fading Tabs', () => {
        describe('When tabs are rendered', () => {
            it('Then it should add an event listener for scrolling tabs horizontal', () => {
                const current = {
                    addEventListener: jest.fn()
                };

                const spyOnEventListener = spyOn(current, 'addEventListener');

                React.useRef = jest.fn(() => {
                    return {
                        current
                    };
                });

                const spyOnUserEffect = jest.spyOn(React, 'useEffect').mockImplementation(f => f());

                shallow(<CategoriesTabs {...props} />);

                expect(spyOnEventListener).toHaveBeenCalled();

                spyOnUserEffect.mockRestore();
            });
        }); 

        describe('When tabs are not rendered', () => {
            it('Then it should still render an empty list', () => {
                React.useRef = jest.fn(() => {
                    return null;
                });
                
                const spyOnUserEffect = jest.spyOn(React, 'useEffect').mockImplementation(f => f());
                const mockProps = {...props, items: []};
                const wrapper = shallow(<CategoriesTabs {...mockProps} />);
                
                expect(wrapper.exists()).toEqual(true);

                spyOnUserEffect.mockRestore();
            });
        }); 
    });
});