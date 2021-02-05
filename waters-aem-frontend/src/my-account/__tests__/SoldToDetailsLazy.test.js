import SoldToDetailsLazy from "../services/SoldToDetailsLazy";
import loginStatus from "../../scripts/loginStatus";
import { soldToDetailsJSON } from "../__mocks__/en_US/mock-services-json";
import SessionStore from "../../stores/sessionStore";

describe("Feature: SoldToDetailsLazy Service", () => {
    const url = '';
    const userId = '9ETRLcbBXOBS9iLEefW-Vw==';
    const salesOrg = 'US01';
    
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

        describe("When user is logged in and the filtered sold to details is in the browser session", () => {
            it("Then it should make a call for the addresses", async () => {
                const serviceMock = jest.fn(() => {
                    return soldToDetailsJSON;
                });
                let storedSTDetails = [{
                        customerNumber: "W8IfyyXIEaCpaXS9ZlRiwQ==",
                        name: "ASTRAZENECA PHARMACEUTICALS LP",
                        soldToFlag: 1,
                        salesOrg: "US01",
                    },
                    {
                        customerNumber: "u2stlNZcouqS9WE3ieAdEQ==",
                        soldToFlag: 0,
                    },
                    {
                        customerNumber: "Bz1afPbh5PESk5p3P6s9_A==",
                        soldToFlag: 0,
                    },
                    {
                        customerNumber: "D0hoqFIfcuxtbWPM5wE27Q==",
                        soldToFlag: 0,
                    },
                ];
                loginStatus.state = jest.fn(() => true);

                const sessionStore = new SessionStore();
                sessionStore.getSoldToDetails = jest.fn(() => storedSTDetails);
                sessionStore.setSoldToDetails = jest.fn();

                const response = await SoldToDetailsLazy(url, userId, salesOrg, sessionStore, serviceMock);

                expect(sessionStore.getSoldToDetails).toHaveBeenCalled();
                expect(response).toEqual(soldToDetailsJSON);
                expect(serviceMock).toHaveBeenCalled();
                expect(sessionStore.setSoldToDetails).toHaveBeenCalled();
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

                const response = await SoldToDetailsLazy(url, userId, salesOrg, sessionStore, serviceMock);

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

                const response = await SoldToDetailsLazy(url, userId, salesOrg, sessionStore, serviceMock);

                expect(response).toEqual([]);
                expect(sessionStore.setSoldToDetails).not.toHaveBeenCalled();
            });
        });
    });
});