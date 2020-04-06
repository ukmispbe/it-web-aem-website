jest.mock("../stickyService");

import SkuDetails from '../sku-details';
import stickyService from '../stickyService';
import SkuDetailsSticky from '../sticky-sku-details';

describe("Feature: SkuDetailsSticky Module", () => {
    describe("Scenario: Adding sku details to the queue", () => {
        describe("When ecommerce is disabled", () => {
            it("Then is should not add to the queue", () => {
                SkuDetails.okToConfigureSticky = jest.fn(() => false);

                SkuDetailsSticky();

                expect(stickyService.add).not.toHaveBeenCalled();
            });
        });

        describe("When ecommerce is not disabled", () => {
            it("Then is should add to the queue", () => {
                SkuDetails.okToConfigureSticky = jest.fn(() => true);

                SkuDetailsSticky();

                expect(stickyService.add).toHaveBeenCalled();
            });
        });
    });
});