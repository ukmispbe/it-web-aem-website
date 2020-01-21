import React from "react";
import ModalPortal from "../modal-portal";
import { mount } from "enzyme";

describe("Feature: ModalPortal Component", () => {
    document.body.innerHTML = "<div id='modal-root'></div>";

    beforeAll(() => {
        jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    describe("Scenario: Rendering", () => {
        describe("When it does not have any child components", () => {
            it("Then it should contain a Portal component", () => {
                const wrapper =  mount(<ModalPortal />);

                const portal = wrapper.find('Portal');

                expect(portal.exists()).toEqual(true);
            });
        });

        describe("When it does have a child component", () => {
            it("Then it should contain a Portal component", () => {
                const wrapper =  mount(<ModalPortal><div></div></ModalPortal>);

                const portal = wrapper.find('Portal');

                expect(portal.exists()).toEqual(true);
            });
        });
    });
});