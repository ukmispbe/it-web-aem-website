import React from "react";
import renderer from "react-test-renderer";
import { createBrowserHistory } from 'history';
import { HashRouter } from 'react-router-dom';
import Aside from "../aside";
import props from "../__mocks__/en_US/my-account-json";

const history = createBrowserHistory();

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
                history.push("http://localhost.com/my-account.html");

                const mockProps = {
                    ...props,
                    history
                };

                const json = renderer.create(<HashRouter><Aside {...mockProps} /></HashRouter>);

                expect(json).toMatchSnapshot();
            });
        });

        describe("When profile link is active", () => {
            it("Then it should match snapshot", () => {
                history.push("http://localhost.com/my-account.html#profile");

                const mockProps = {
                    ...props,
                    history
                };

                const json = renderer.create(<HashRouter><Aside {...mockProps} /></HashRouter>);

                expect(json).toMatchSnapshot();
            });
        });

        describe("When password link is active", () => {
            it("Then it should match snapshot", () => {
                history.push("http://localhost.com/my-account.html#changepassword");

                const mockProps = {
                    ...props,
                    history
                };

                const json = renderer.create(<HashRouter><Aside {...mockProps} /></HashRouter>);

                expect(json).toMatchSnapshot();
            });
        });

        describe("When orders link is active", () => {
            it("Then it should match snapshot", () => {
                history.push("http://localhost.com/my-account.html#orderhistory");

                const mockProps = {
                    ...props,
                    history
                };

                const json = renderer.create(<HashRouter><Aside {...mockProps} /></HashRouter>);

                expect(json).toMatchSnapshot();
            });
        });
    });
});