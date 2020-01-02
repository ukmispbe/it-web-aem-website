import React from 'react';
import { shallow } from 'enzyme';
import SkuMessage from "../index";
import renderer from "react-test-renderer";

describe('Feature: SkuMessage React Component', () => {
    let props ={}, wrapper='';
    beforeEach(() => {
        props = {
            icon: "icon",
            link: "link",
            linkMessage: "linkmessage",
            message: "message"
        };
        wrapper = shallow(<SkuMessage {...props} />);
    });

    describe('Scenario: Rendering', () => {
        describe('When the component renders with props', () => {
            it('Then the snapshot should match', () => {
                const json = renderer.create(<SkuMessage {...props} />);
                expect(json).toMatchSnapshot();
            });
        });

        describe('When all of the props are provided', () => {
            beforeEach(() => {
                props = {
                    icon: "icon",
                    link: "link",
                    linkMessage: "linkmessage",
                    message: "message"
                };
                wrapper = shallow(<SkuMessage {...props} />);
            });
            it('Then it should populate the icon', () => {
                const svgSrc = wrapper.find('ReactSVG').prop("src");
                expect(svgSrc).toEqual(props.icon);
            });

            it('Then it should populate the href with the link', () => {
                const href = wrapper.find('a').prop("href");
                expect(href).toEqual(props.link);
            });

            it('Then it should populate the A tag text with the linkMessage text', () => {
                const aTag = wrapper.find('a');
                expect(aTag.text()).toEqual(props.linkMessage);
            });

            it('Then it should populate the notification description with the message text', () => {
                const descDiv = wrapper.find('div.cmp-notification-description');
                expect(descDiv.text()).toContain(props.message);
            });

            it('Then it should populate the notification distributor description with the message text', () => {
                const descDiv = wrapper.find('div.cmp-notification-distributor');
                expect(descDiv.text()).toContain(props.distMessage);
            });
        });

        describe('When none of the props are provided', () => {
            beforeEach(() => {
                props = {
                    icon: "",
                    link: "",
                    linkMessage: null,
                    message: ""
                };
                wrapper = shallow(<SkuMessage {...props} />);
                wrapper.debug();
            });
            it('Then it should not populate the icon', () => {
                const svgSrc = wrapper.find('ReactSVG').prop("src");
                expect(svgSrc).toEqual(props.icon);
            });

            it('Then it should not render the A tag (link & linkMessage)', () => {
                const aTag = wrapper.find('a');
                expect(aTag).toEqual({});
            });

            it('Then it should not populate the notification description text', () => {
                const descDiv = wrapper.find('div.cmp-notification-description');
                expect(descDiv.text()).toBe(props.message);
            });

            it('Then it should not populate the notification description text', () => {
                const descDiv = wrapper.find('div.cmp-notification-distributor');
                expect(descDiv.text()).toBe(props.distMessage);
            });
        });
    });
});