import UserDetails from "../services/UserDetails";
import { userDetailsJSON } from '../../__mocks__/en_US/services/mock-services-json'
import loginStatus from "../../scripts/loginStatus";

describe("Feature: User Details Service", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("Scenario: Response Verification", () => {
        describe("When status is 200", () => {
            it("Then it should return user details", async () => {
                window.fetch = jest.fn(() => {
                    return {
                        status: 200,
                        json: async () => userDetailsJSON
                    }
                });
    
                const result = await UserDetails();
    
                expect(result).toEqual(userDetailsJSON);
            })
        });

        describe("When status is other than 200", () => {
            it("Then it should return a failed flag", async () => {
                window.fetch = jest.fn(() => {
                    return {
                        status: 500
                    }
                });

                loginStatus.state = jest.fn(() => true);

                const result = await UserDetails();

                expect(result.failed).toEqual(true);
            });
        });
    });
});