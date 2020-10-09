import loginStatus from "../../scripts/loginStatus";
import SessionStore from "../../stores/sessionStore";
import SoldToDetails from "../services/SoldToDetails";
import domElements from "../../scripts/domElements";
import {
    isCartHidden
} from "../../utils/eCommerceFunctions";

export default async (
    soldToDetailsUrl,
    userId,
    salesOrg,
    sessionStore = new SessionStore(),
    service = SoldToDetails
) => {
    const currentPage = window.location.href;
    let soldToUrl = `${soldToDetailsUrl}/${userId}?salesOrg=${salesOrg}`;

    if (
        (!loginStatus.state() ||
        currentPage.indexOf("sign-in") !== -1 ||
        currentPage.indexOf("create-account") !== -1 ||
        currentPage.indexOf("trouble-signing-in") !== -1 ||
        currentPage.indexOf("update-password") !== -1 ||
        currentPage.indexOf("reset-password") !== -1 ) &&
        currentPage.indexOf('choose-account') !== -1
    ) {
        return [];
    }

    const soldToDetails = sessionStore.getSoldToDetails();

    if (soldToDetails) {
        return soldToDetails;
    }

    const response = await service(soldToUrl);

    if (!response.failed) {
        sessionStore.setSoldToDetails(response);
        // Show or Hide Cart Icon dependent upon eCommerce Status
        const hideCartClass = "top-bar__nav__cart--hide";
        const headerNavigation_cartLI = document.querySelector(
            ".top-bar__nav__cart"
        );
        if (headerNavigation_cartLI) {
            if (isCartHidden()) {
                domElements.addClass(headerNavigation_cartLI, hideCartClass);
            } else {
                domElements.removeClass(headerNavigation_cartLI, hideCartClass);
            }
        }
        return response;
    }

    return [];
};