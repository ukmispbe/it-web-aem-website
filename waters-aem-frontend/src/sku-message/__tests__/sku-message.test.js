import React from 'react';
import { shallow } from 'enzyme';
import SkuMessage from "../index";
import renderer from "react-test-renderer";

describe('Feature: SkuMessage React Component', () => {
    const props = {
        icon: "icon",
        message: "message",
        link: "link",
        linkMessage: "linkmessage"
    };

    describe('Scenario: Rendering', () => {
        describe('When the component renders with props', () => {
            it('Then the snapshot should match', () => {
                const json = renderer.create(<SkuMessage {...props} />);

                expect(json).toMatchSnapshot();
            });
        });

        describe('When there are categories and all have search results', () => {
            it('Then it should render all category tabs', () => {
                const wrapper = shallow(<SkuMessage {...props} />);
                const URL = wrapper.find('href');
                expect(URL.text()).toEqual(props.link);
            });
        });

        describe('When there are categories and not all have search results', () => {
            it('Then it should render only category tabs that have results', () => {
                props.icon = "";
                const wrapper = shallow(<SkuMessage {...props} />);
                const URL = wrapper.find('icon');
                expect(URL.text()).toEqual(props.link);
            });
        });
    });
});