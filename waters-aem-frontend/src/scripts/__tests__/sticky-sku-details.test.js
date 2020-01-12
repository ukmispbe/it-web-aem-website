jest.mock("../stickyService");

import SkuDetails from '../sku-details';
import stickyService from '../stickyService';
import SkuDetatilsSticky from '../sticky-sku-details';

describe("Feature: SkuDetailsSticky Module", () => {
    describe("Scenario: Adding sku details to the queue", () => {
        describe("When ecommerce is disabled", () => {
            it("Then is should not add to the queue", () => {
                SkuDetails.okToConfigureSticky = jest.fn(() => false);

                SkuDetatilsSticky();

                expect(stickyService.add).not.toHaveBeenCalled();
            });
        });

        describe("When ecommerce is not disabled", () => {
            it("Then is should add to the queue", () => {
                SkuDetails.okToConfigureSticky = jest.fn(() => true);

                SkuDetatilsSticky();

                expect(stickyService.add).toHaveBeenCalled();
            });
        });
    });
});