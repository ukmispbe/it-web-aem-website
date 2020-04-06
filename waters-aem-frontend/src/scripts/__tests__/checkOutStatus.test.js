import checkOutStatus from '../checkOutStatus';

describe("Feature: CheckOutStatus Module", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("Scenario: Validating the state property", () => {
        describe("When sold to details is not in the session", () => {
            it("Then it should return false", () => {
                jest.spyOn(checkOutStatus, 'details', 'get').mockImplementation(() => undefined);
                const result = checkOutStatus.state();

                expect(result).toEqual(false);
            });
        });

        describe("When sold to details is an empty in the session", () => {
            it("Then it should return false", () => {
                jest.spyOn(checkOutStatus, 'details', 'get').mockImplementation(() => []);

                const result = checkOutStatus.state();

                expect(result).toEqual(false);
            });
        });

        describe("When sold to details is not empty in the session", () => {
            it("Then it should return true", () => {
                jest.spyOn(checkOutStatus, 'details', 'get').mockImplementation(() => [0]);

                const result = checkOutStatus.state();

                expect(result).toEqual(true);
            });
        });
    });

    describe("Scenario: Validating the length property", () => {
        describe("When sold to details is not in the session", () => {
            it("Then is should return 0", () => {
                jest.spyOn(checkOutStatus, 'details', 'get').mockImplementation(() => undefined);

                const result = checkOutStatus.length;

                expect(result).toEqual(0);
            });
        });

        describe("When sold to details is not empty in the session", () => {
            it("Then is should return 0", () => {
                const mockReturnValue = [0];

                jest.spyOn(checkOutStatus, 'details', 'get').mockImplementation(() => mockReturnValue);

                const result = checkOutStatus.length;

                expect(result).toEqual(mockReturnValue.length);
            });
        });
    });

    describe("Scenario: Additional code coverage to satisfy the analysis report", () => {
        describe("When sold to details is not in the session", () => {
            it("Then it should return null", () => {
                const result = checkOutStatus.details;

                expect(result).toEqual(null);
            });
        });
    });
});