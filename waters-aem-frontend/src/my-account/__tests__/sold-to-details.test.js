import SoldToDetails from '../services/SoldToDetails';
import { soldToDetailsJSON } from '../../__mocks__/en_US/services/mock-services-json'
import loginStatus from "../../scripts/loginStatus";

describe('Feature: Sold To Details Service', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("Scenario: Response Verification", () => {
        describe("When the response status is 200", () => {
            it("Then it should return the sold to details", async () => {
                window.fetch = jest.fn(() => {
                    return {
                        status: 200,
                        json: async () => soldToDetailsJSON
                    }
                });

                const result = await SoldToDetails();

                expect(result).toEqual(soldToDetailsJSON.customers);
            });
        });

        describe("When the response is empty", () => {
            it("Then it should return the empty array", async () => {
                window.fetch = jest.fn(() => {
                    return {
                        status: 200,
                        json: async () => {}
                    }
                });

                loginStatus.state = jest.fn(() => true);

                const result = await SoldToDetails();

                expect(result).toEqual([]);
            });
        });

        describe("When the response contains no Customers", () => {
            it("Then it should return an empty array", async () => {
                let customers = {"customers": []};
                window.fetch = jest.fn(() => {
                    return {
                        status: 200,
                        json: async () => customers
                    }
                });

                loginStatus.state = jest.fn(() => true);

                const result = await SoldToDetails();

                expect(Array.isArray(result)).toEqual(true);
            });
        });

        describe("When status is other than 200", () => {
            it("Then it should return a failed flag", async () => {
                window.fetch = jest.fn(() => {
                    return {
                        status: 500
                    }
                });

                loginStatus.state = jest.fn(() => true);

                const result = await SoldToDetails();

                expect(result.failed).toEqual(true);
            });
        });
    });
});