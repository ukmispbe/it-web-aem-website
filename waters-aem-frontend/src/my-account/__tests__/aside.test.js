import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from 'react-router-dom';
import Aside from "../aside";
import props from "../__mocks__/en_US/my-account-json";
import routes from "../routes";
import Ecommerce from "../../scripts/ecommerce";

describe("Feature: Aside Component for my account", () => {
    beforeAll(() => {
        console.warn = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("Scenario: Rendering", () => {
        describe("When no link is active", () => {
            it("Then it should match snapshot", () => {
                const json = renderer.create(<MemoryRouter><Aside {...props} /></MemoryRouter>);

                expect(json).toMatchSnapshot();
            });
        });

        describe("When profile link is active", () => {
            it("Then it should match snapshot", () => {
                const json = renderer.create(<MemoryRouter initialEntries={[routes.profile]}><Aside {...props} /></MemoryRouter>);

                expect(json).toMatchSnapshot();
            });
        });

        describe("When password link is active", () => {
            it("Then it should match snapshot", () => {
                const json = renderer.create(<MemoryRouter initialEntries={[routes.changePassword]}><Aside {...props} /></MemoryRouter>);

                expect(json).toMatchSnapshot();
            });
        });

        describe("When ecommerce is disabled", () => {
            it("Then it should match snapshot", () => {
                Ecommerce.isDisabledState = jest.fn(() => true);

                const json = renderer.create(<MemoryRouter initialEntries={[routes.profile]}><Aside {...props} /></MemoryRouter>);

                expect(json).toMatchSnapshot();
            });
        });
    });
});