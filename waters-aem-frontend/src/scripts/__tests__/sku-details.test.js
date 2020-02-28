import SkuDetails from "../sku-details";
import screenSizes from "../screenSizes";
import Ecommerce from "../ecommerce";
import LoginStatus from "../loginStatus";
import CheckOutStatus from "../checkOutStatus";

describe("Feature: SkuDetails Module", () => {
    const defaultTemplate = 
    `
        <div class='cmp-sku-details'>
            <div class='cmp-sku-details__ecom'></div>
        </div> 
    `;

    const discontinuedTemplate = 
    `
        <div class='cmp-sku-details'>
            <div class='cmp-sku-details__ecom' data-discontinued='true'></div>
        </div> 
    `;

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("Scenario: Rendering", () => {
        describe("When sku details has not been rendered", () => {
            it("Then is should not exist", () => {
                document.body.innerHTML = "";
                
                expect(SkuDetails.exists()).toEqual(false);
            });

            it("And it should not be discontinued", () => {
                expect(SkuDetails.discontinued()).toEqual(false);
            });
        });

        describe("When sku details has been rendered", () => {
            it("Then is should exist", () => {
                document.body.innerHTML = defaultTemplate;
                
                expect(SkuDetails.exists()).toEqual(true);
            });
        });

        describe("When the data-discontinued attribute is set to true", () => {
            it("Then is should be discontinued", () => {
                document.body.innerHTML = discontinuedTemplate;

                expect(SkuDetails.discontinued()).toEqual(true);
            });
        });

        describe("When the data-discontinued attribute does not exist", () => {
            it("Then is should not be discontinued", () => {
                document.body.innerHTML = defaultTemplate;

                expect(SkuDetails.discontinued()).toEqual(false);
            });
        });
    });

    describe("Scenario: Sticky Header", () => {
        describe("When ecommerce is disabled", () => {
            it("Then it should not configure sticky", () => {
                document.body.innerHTML = defaultTemplate;

                Ecommerce.currentState = jest.fn(() => Ecommerce.disabled);

                expect(SkuDetails.okToConfigureSticky()).toEqual(false);
            });
        });

        describe("When ecommerce is not disabled", () => {
            it("Then it should configure sticky", () => {
                document.body.innerHTML = defaultTemplate;

                Ecommerce.currentState = jest.fn(() => Ecommerce.full);

                expect(SkuDetails.okToConfigureSticky()).toEqual(true);
            });
        });

        describe("When viewing a discontinued sku on mobile", () => {
            it("Then it should prevent sticky", () => {
                document.body.innerHTML = discontinuedTemplate;

                screenSizes.isMobile = jest.fn(() => true);

                expect(SkuDetails.preventSticky()).toEqual(true);
            });
        });

        describe("When viewing a discontinued sku not on mobile", () => {
            it("Then it should not prevent sticky", () => {
                document.body.innerHTML = defaultTemplate;

                screenSizes.isMobile = jest.fn(() => false);

                expect(SkuDetails.preventSticky()).toEqual(false);
            });
        });

        describe("When sku is not partially enabled", () => {
            it("Then it should allow sticky", () => {
                document.body.innerHTML = defaultTemplate;

                Ecommerce.isPartialState = jest.fn(() => false);

                expect(SkuDetails.allowSticky()).toEqual(true);
            });
        });

        describe("When sku is partially enabled and log in status and checkout status are not set", () => {
            it("Then it should not allow sticky", () => {
                document.body.innerHTML = defaultTemplate;

                Ecommerce.isPartialState = jest.fn(() => true);

                LoginStatus.state = jest.fn(() => false);

                CheckOutStatus.state = jest.fn(() => false);

                expect(SkuDetails.allowSticky()).toEqual(false);
            });
        });

        describe("When sku is partially enabled and only log in status is set", () => {
            it("Then it should not allow sticky", () => {
                document.body.innerHTML = defaultTemplate;

                Ecommerce.isPartialState = jest.fn(() => true);

                LoginStatus.state = jest.fn(() => true);

                CheckOutStatus.state = jest.fn(() => false);

                expect(SkuDetails.allowSticky()).toEqual(false);
            });
        });

        describe("When sku is partially enabled and only checkout status is set", () => {
            it("Then it should not allow sticky", () => {
                document.body.innerHTML = defaultTemplate;

                Ecommerce.isPartialState = jest.fn(() => true);

                LoginStatus.state = jest.fn(() => false);

                CheckOutStatus.state = jest.fn(() => true);

                expect(SkuDetails.allowSticky()).toEqual(false);
            });
        });

        describe("When sku is partially enabled and log in status and checkout status are set", () => {
            it("Then it should allow sticky", () => {
                document.body.innerHTML = defaultTemplate;

                Ecommerce.isPartialState = jest.fn(() => true);

                LoginStatus.state = jest.fn(() => true);

                CheckOutStatus.state = jest.fn(() => true);

                expect(SkuDetails.allowSticky()).toEqual(true);
            });
        });

        describe("When sticky is fully configured", () => {
            it("Then sticky should exist", () => {
                document.body.innerHTML = defaultTemplate;

                screenSizes.isMobile = jest.fn(() => false);

                Ecommerce.isPartialState = jest.fn(() => false);

                expect(SkuDetails.stickyExists()).toEqual(true);
            });
        });

        describe("When sticky is not full configured", () => {
            it("Then sticky should not exist", () => {
                document.body.innerHTML = defaultTemplate;

                screenSizes.isMobile = jest.fn(() => false);

                Ecommerce.isPartialState = jest.fn(() => true);

                LoginStatus.state = jest.fn(() => false);

                CheckOutStatus.state = jest.fn(() => false);

                expect(SkuDetails.stickyExists()).toEqual(false);
            });
        });
    });
});