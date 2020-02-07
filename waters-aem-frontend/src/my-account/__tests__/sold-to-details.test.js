import SoldToDetails from '../services/SoldToDetails';
import { soldToDetailsJSON } from '../__mocks__/en_US/mock-services-json';
import loginStatus from "../../scripts/loginStatus";

describe('Feature: Sold To Details Service', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("Scenario: Response Verification", () => {
        describe("When the response is filled array", () => {
            it("Then it should return the sold to details", async () => {
                window.fetch = jest.fn(() => {
                    return {
                        status: 200,
                        json: async () => soldToDetailsJSON
                    }
                });

                const result = await SoldToDetails();

                expect(result).toEqual(soldToDetailsJSON);
            });
        });

        describe("When the response is an empty array", () => {
            it("Then it should return the empty array", async () => {
                window.fetch = jest.fn(() => {
                    return {
                        status: 200,
                        json: async () => []
                    }
                });

                loginStatus.state = jest.fn(() => true);

                const result = await SoldToDetails();

                expect(result).toEqual([]);
            });
        });

        describe("When the response is not an array", () => {
            it("Then it should return an empty array", async () => {
                window.fetch = jest.fn(() => {
                    return {
                        status: 200,
                        json: async () => {}
                    }
                });
    
                loginStatus.state = jest.fn(() => true);
    
                const result = await SoldToDetails();

                expect(Array.isArray(result)).toEqual(true);
            });
        });

        describe("When status is other than 200", () => {
            it("Then it should return a failed flag", async () => {
                const status = 403;

                window.fetch = jest.fn(() => {
                    return {
                        status
                    }
                });

                loginStatus.state = jest.fn(() => true);

                const result = await SoldToDetails();

                expect(result.failed).toEqual(true);
            });
        });
    });
});