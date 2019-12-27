import React from 'react';
import { shallow } from 'enzyme';

import Link from '../link';

const keys = {
    linkCmp: '.cmp-linktile--link'
};

//Mocked Props
import DefaultProps from '../__mocks__/en_US/index';

const buildShallowWrapper = (Component, props, mockValues = undefined) => {
    if (Array.isArray(mockValues)) {
		setMockValues(mockValues);
	}
	const wrapper = shallow(<Component {...props} />);
	return wrapper;
};

describe('Feature: Link Tile Link Component', () => {
    describe('Scenario: Rendering Link', () => {
        describe('When text and url is present', () => {
            let wrapper;
            let linkComponents, linkComponent;

            beforeAll(() => {
                wrapper = buildShallowWrapper(
                    Link,
                    DefaultProps
                );

                linkComponents = wrapper.find(keys.linkCmp);
                linkComponent = linkComponents.first();
            });

            it('Then it should render the link component', () => {
                expect(linkComponents.length).toEqual(1);
            });

            it('Then it should have the proper text', () => {
                expect(linkComponent.text()).toEqual(DefaultProps.text);
            });

            it('Then it should have the proper link', () => {
                expect(linkComponent.props().href).toEqual(DefaultProps.url);
            });
        });
    });

    describe('Scenario: Improper Props', () => {
        describe('When text and/or url both are not present', () => {
            let wrapper;
            let linkComponents, linkComponent;
            let props = {};

            beforeAll(() => {
                wrapper = buildShallowWrapper(
                    Link,
                    props
                );

                linkComponents = wrapper.find(keys.linkCmp);
                linkComponent = linkComponents.first();
            });

            it('Then it should not render the link component (Both Missing)', () => {
                expect(linkComponents.length).toEqual(0);
            });


            props = { text: "Example" };
            it('Then it should not render the link component (No Url)', () => {
                expect(linkComponents.length).toEqual(0);
            });

            props = { url: "http://www.example.com/" };
            it('Then it should not render the link component (No Text)', () => {
                expect(linkComponents.length).toEqual(0);
            });
        });
    });
});