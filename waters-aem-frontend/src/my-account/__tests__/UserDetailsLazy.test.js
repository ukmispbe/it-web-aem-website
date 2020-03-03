import UserDetailsLazy from "../services/UserDetailsLazy";
import loginStatus from "../../scripts/loginStatus";
import { userDetailsJSON } from "../__mocks__/en_US/mock-services-json";
import SessionStore from "../../stores/sessionStore";

describe("Feature: UserDetailsLazy Service", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("Scenario: Expected responses", () => {
        describe("When user is not logged in", () => {
            it("Then is should return an empty response", async () => {
                loginStatus.state = jest.fn(() => false);

                const response = await UserDetailsLazy();

                expect(response).toEqual({});
            });
        });

        describe("When user is logged in and user details is in the browser session", () => {
            it("Then it should return user details from the browser session", async () => {
                loginStatus.state = jest.fn(() => true);

                const sessionStore = new SessionStore();

                sessionStore.getUserDetails = jest.fn(() => userDetailsJSON);

                const response = await UserDetailsLazy('', sessionStore);

                expect(response).toEqual(userDetailsJSON);
            });
        });

        describe("When user is logged in and user details is not in the browser session", () => {
            it("Then it should make a backend request to get user details and save in the browser session", async () => {
                const serviceMock = jest.fn(() => {
                    return {}
                });
                
                loginStatus.state = jest.fn(() => true);

                const sessionStore = new SessionStore();

                sessionStore.getUserDetails = jest.fn(() => null);
                sessionStore.setUserDetails = jest.fn();

                const response = await UserDetailsLazy('', sessionStore, serviceMock);

                expect(serviceMock).toHaveBeenCalled();
                expect(sessionStore.setUserDetails).toHaveBeenCalled();
            });
        });

        describe("When the backend response fails", () => {
            it("Then it should return an empty response and not save in the browser session", async () => {
                const serviceMock = jest.fn(() => {
                    return {
                        failed: true
                    }
                });
                
                loginStatus.state = jest.fn(() => true);

                const sessionStore = new SessionStore();

                sessionStore.getUserDetails = jest.fn(() => null);
                sessionStore.setUserDetails = jest.fn();

                const response = await UserDetailsLazy('', sessionStore, serviceMock);

                expect(response).toEqual({});
                expect(sessionStore.setUserDetails).not.toHaveBeenCalled();
            });
        });
    });
});