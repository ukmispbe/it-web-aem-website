import SoldToDetailsLazy from "../services/SoldToDetailsLazy";
import loginStatus from "../../scripts/loginStatus";
import { soldToDetailsJSON } from "../__mocks__/en_US/mock-services-json";
import SessionStore from "../../stores/sessionStore";

describe("Feature: UserDetailsLazy Service", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("Scenario: Expected responses", () => {
        describe("When user is not logged in", () => {
            it("Then is should return an empty response", async () => {
                loginStatus.state = jest.fn(() => false);

                const response = await SoldToDetailsLazy();

                expect(response).toEqual([]);
            });
        });

        describe("When user is logged in and sold to details is in the browser session", () => {
            it("Then it should return sold to details from the browser session", async () => {
                loginStatus.state = jest.fn(() => true);

                const sessionStore = new SessionStore();

                sessionStore.getSoldToDetails = jest.fn(() => soldToDetailsJSON);

                const response = await SoldToDetailsLazy('', sessionStore);

                expect(response).toEqual(soldToDetailsJSON);
            });
        });

        describe("When user is logged in and sold to details is not in the browser session", () => {
            it("Then it should make a backend request to get sold to details and save in the browser session", async () => {
                const serviceMock = jest.fn(() => {
                    return []
                });
                
                loginStatus.state = jest.fn(() => true);

                const sessionStore = new SessionStore();

                sessionStore.getSoldToDetails = jest.fn(() => null);
                sessionStore.setSoldToDetails = jest.fn();

                const response = await SoldToDetailsLazy('', sessionStore, serviceMock);

                expect(serviceMock).toHaveBeenCalled();
                expect(sessionStore.setSoldToDetails).toHaveBeenCalled();
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

                sessionStore.getSoldToDetails = jest.fn(() => null);
                sessionStore.setSoldToDetails = jest.fn();

                const response = await SoldToDetailsLazy('', sessionStore, serviceMock);

                expect(response).toEqual([]);
                expect(sessionStore.setSoldToDetails).not.toHaveBeenCalled();
            });
        });
    });
});