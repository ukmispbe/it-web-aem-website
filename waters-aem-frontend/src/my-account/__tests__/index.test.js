import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import MyAccountRouter from "../";
import props from "../__mocks__/en_US/my-account-json";
import routes from "../routes";
import personalDetailsTile from "../__mocks__/en_US/personal-details-tile";
import addressConfig from "../__mocks__/en_US/addressConfig";
import shipping from "../__mocks__/en_US/shipping";
import billing from "../__mocks__/en_US/billing";
import changepassword from "../__mocks__/en_US/changepassword";

const buildRouter = initialEntries => <MemoryRouter initialEntries={initialEntries}><MyAccountRouter {...props} /></MemoryRouter>

describe("Feature: MyAccountRouter", () => {

    beforeAll(() => {
        console.error = jest.fn();
        console.warn = jest.fn();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    document.body.innerHTML = `
        <script id="json-config--cmp-detail-tiles--personal">
        ${JSON.stringify(personalDetailsTile)}
        </script>
        
        <script id="json-config--cmp-detail-tiles--billing">
        ${JSON.stringify(billing)}
        </script>

        <script id="json-config--cmp-detail-tiles--shipping">
        ${JSON.stringify(shipping)}
        </script>

        <script id="json-config--cmp-detail-tiles--address">
        ${JSON.stringify(addressConfig)}
        </script>

        <script id="json-config--cmp-detail-tiles--changePassword">
        ${JSON.stringify(changepassword)}
        </script>
    `;

    describe("Scenario: Routing", () => {
        describe("When the path matches the my account route", () => {
            it("Then it should render the my account component", () => {
                const wrapper = mount(buildRouter([routes.myAccount]));
                const myAccountElement = wrapper.find(".cmp-my-account-wrapper");

                expect(myAccountElement.exists()).toEqual(true);
            });
        });

        describe("When the path matches the profile route", () => {
            it("Then it should render the Aside and MyProfile components", () => {
                const wrapper = mount(buildRouter([routes.profile]));
                const aside = wrapper.find("Aside");
                const myProfile = wrapper.find("MyProfile");

                expect(aside.exists()).toEqual(true);
                expect(myProfile.exists()).toEqual(true);
            });
        });

        describe("When the path matches the change password route", () => {
            it("Then it should render the Aside and ChangePassword components", () => {
                const wrapper = mount(buildRouter([routes.changePassword]));
                const aside = wrapper.find("Aside");
                const changePassword = wrapper.find("ChangePassword");

                expect(aside.exists()).toEqual(true);
                expect(changePassword.exists()).toEqual(true);
            });
        });
    });
});