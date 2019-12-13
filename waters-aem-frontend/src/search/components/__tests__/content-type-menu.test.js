import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import ContentTypeMenu from '../content-type-menu';

describe('Feature: ContentTypeMenu Component', () => {
    const props = {
        heading: '',
        items: [],
        onClick: jest.fn()
    };

    const propsOneItem = {
        ...props,
        items: [
            {
                count: 5,
                facetName: "applicationnote_facet",
                facetTranslation: "Application Note",
                facetValue: "Application Note",
                orderedFacets: []
            }
        ]
    };

    describe('Scenario: Rendering', () => {
        describe('When no content types are specified', () => {
            it('Then it should match snapshot', () => {
                const json = renderer.create(<ContentTypeMenu {...props} />);

                expect(json).toMatchSnapshot();
            });
        });

        describe('When content types are specified', () => {
            it('Then it should match snapshot', () => {
                const json = renderer.create(<ContentTypeMenu {...propsOneItem} />);
                
                expect(json).toMatchSnapshot();

            });
        });
    });

    describe('Scenario: User Interaction', () => {
        describe('When the content type is clicked', () => {
            it('Then is should call the click handler property', () => {
                const spyOnClick = spyOn(propsOneItem, 'onClick');
                const wrapper = shallow(<ContentTypeMenu {...propsOneItem} />);
                const contentType = wrapper.find('.content-type-menu-container__item');
                
                contentType.simulate('click');

                expect(spyOnClick).toHaveBeenCalled();

                spyOnClick.mockRestore();
            });
        });
    });
});