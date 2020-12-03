jest.mock("../../../scripts/fade-x.js");

import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import RadioList from "../";

describe("Feature: RadioList Component", () => {
    const propsWithOutItems = {
        items: [],
        activeIndex: -1,
        onClick: jest.fn()
    };

    const propsWithItems = {
        ...propsWithOutItems,
        activeIndex: 0,
        items: [
            {
                count: 1525,
                name: "Library",
                translation: "Library"
            },
            {
                count: 8243,
                name: "Shop",
                translation: "Shop"
            }
        ]
    };
    
    beforeEach(() => {
        React.useEffect = jest.fn(f => f());
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("Scenario: Rendering RadioList", () => {
        describe("When no categories are provided", () => {
            it("Then it should match snapshot", () => {
                const json = renderer.create(<RadioList {...propsWithOutItems} />);
                
                expect(json).toMatchSnapshot();
            });
        });

        describe("When categories are provided", () => {
            it("Then it should match snapshot", () => {
                const json = renderer.create(<RadioList {...propsWithItems} />);
                
                expect(json).toMatchSnapshot();
            });
        });
    });

    describe("Scenario: User Interaction", () => {
        describe("When Radio Button is clicked", () => {
            it("Then it should call the click handler property", () => {
                const wrapper = shallow(<RadioList {...propsWithItems} />);

                wrapper.find("Radio").first().simulate("click");

                expect(propsWithItems.onClick).toHaveBeenCalled();
            });
        });
    });
});