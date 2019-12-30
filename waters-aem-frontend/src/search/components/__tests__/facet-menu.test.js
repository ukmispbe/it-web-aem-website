import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import FacetMenu from '../facet-menu';

describe('Feature: FacetMenu Component', () => {
    const props = {
        heading: 'Filter By',
        selectedValue: 'Application Note',
        previousIcon: 'PATH',
        filterTags: <></>,
        onClear: jest.fn()
    };

    describe('Scenario: Rendering', () => {
        describe('When content type has been specified', () => {
            it('Then it should match snapshot', () => {
                const json = renderer.create(<FacetMenu {...props} />);

                expect(json).toMatchSnapshot();
            });
        });
    });

    describe('Scenario: User Interaction', () => {
        describe('When the heading is clicked', () => {
            it('Then it should call the clear handler property', () => {
                const spyOnClear = spyOn(props, 'onClear');
                const wrapper = shallow(<FacetMenu {...props} />);
                const heading = wrapper.find('a');

                heading.simulate('click');
                
                expect(spyOnClear).toHaveBeenCalled();

                spyOnClear.mockRestore();
            });
        });
    });
});