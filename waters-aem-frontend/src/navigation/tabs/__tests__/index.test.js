jest.mock("../../../scripts/fade-x.js");

import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
import Fader from "../../../scripts/fade-x.js";
import Tabs from "../";

describe("Feature: Tabs Component", () => {
    const propsWithOutItems = {
        items: [],
        activeIndex: -1,
        onClick: jest.fn(),
        enableFading: false
    };

    const propsWithItems = {
        ...propsWithOutItems,
        activeIndex: 0,
        items: [
            {
                name: "Tab One"
            },
            {
                name: "Tab Two"
            }
        ]
    };
    
    beforeEach(() => {
        React.useEffect = jest.fn(f => f());
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("Scenario: Rendering Tabs", () => {
        describe("When no tabs are provided", () => {
            it("Then it should match snapshot", () => {
                const json = renderer.create(<Tabs {...propsWithOutItems} />);
                
                expect(json).toMatchSnapshot();
            });
        });

        describe("When tabs are provided", () => {
            it("Then it should match snapshot", () => {
                const json = renderer.create(<Tabs {...propsWithItems} />);
                
                expect(json).toMatchSnapshot();
            });
        });
    });

    describe("Scenario: Fading Tabs", () => {
        const tabsRef = {
            current: {
                addEventListener: jest.fn(),
                removeEventListener: jest.fn()
            }
        }

        beforeAll(() => {
            React.useRef = jest.fn(() => tabsRef);
        });

        describe("When fading is disabled", () => {
            it("Then it should not initialize fading", () => {
                shallow(<Tabs {...propsWithOutItems} />);

                expect(Fader).not.toHaveBeenCalled();
                expect(tabsRef.current.addEventListener).not.toHaveBeenCalled();
            });
        });

        describe("When fading is enabled but there are no items", () => {
            it("Then it should not initialize fading", () => {
                shallow(<Tabs {...propsWithItems} />);

                expect(Fader).not.toHaveBeenCalled();
                expect(tabsRef.current.addEventListener).not.toHaveBeenCalled();
            });
        });

        describe("When fading is enabled and there are items", () => {
            it("Then it should initialize fading", () => {
                const mockProps = {
                    ...propsWithItems,
                    enableFading: true
                };

                shallow(<Tabs {...mockProps} />);

                expect(Fader).toHaveBeenCalled();
                expect(tabsRef.current.addEventListener).toHaveBeenCalled();
            });
        });
    });

    describe("Scenario: User Interaction", () => {
        describe("When tab is clicked", () => {
            it("Then it should call the click handler property", () => {
                const wrapper = shallow(<Tabs {...propsWithItems} />);

                wrapper.find("Tab").first().simulate("click");

                expect(propsWithItems.onClick).toHaveBeenCalled();
            });
        });
    });
});