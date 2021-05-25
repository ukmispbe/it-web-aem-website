import loginStatus from "../../scripts/loginStatus";
import SessionStore from "../../stores/sessionStore";
import SoldToDetails from "../services/SoldToDetails";
import domElements from "../../scripts/domElements";
import { isCommerceHidden } from "../../utils/eCommerceFunctions";
import { TOP_BAR_NAV_CART_HIDE, TOP_BAR_NAV_QUICK_ORDER_HIDE } from '../../constants/index';
import ScreenSizes from '../../scripts/screenSizes';

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

    let soldToDetails = sessionStore.getSoldToDetails();

    //START Patches for EComm
    if (soldToDetails && soldToDetails.length !== 0) {
        let hasDefaultSoldTo = false;

        soldToDetails.map((soldTo) => {
            if(((soldTo.soldToFlag && soldTo.soldToFlag === 1) ||
            (soldTo.default_soldTo && soldTo.default_soldTo === 1)) && 
            (soldTo.soldToInfo && soldTo.soldToInfo.length !== 0 &&
            soldTo.billToInfo && soldTo.shipToInfo)) {
                hasDefaultSoldTo = true;
                soldTo.soldToFlag = 1;
                soldTo.default_soldTo = 1;
            }
        });

        if (hasDefaultSoldTo) {
            return soldToDetails;
        }
    }
    //END Patches for EComm

    const response = await service(soldToUrl);

    if (!response.failed) {
        sessionStore.setSoldToDetails(response);
        // Show or Hide Cart Icon dependent upon eCommerce Status
        const headerNavigation_cartLI = document.querySelector(
            ".top-bar__nav__cart"
        );
        const headerNavigation_quickOrderLI = document.querySelector(
            ".top-bar__nav__quick-order"
        );
        if (headerNavigation_cartLI && headerNavigation_quickOrderLI) {
            if (isCommerceHidden()) {
                domElements.addClass(headerNavigation_cartLI, TOP_BAR_NAV_CART_HIDE);               
                domElements.addClass(headerNavigation_quickOrderLI, TOP_BAR_NAV_QUICK_ORDER_HIDE);
            } else {
                domElements.removeClass(headerNavigation_cartLI, TOP_BAR_NAV_CART_HIDE);
                if (!ScreenSizes.isMobile()) {
                    domElements.removeClass(headerNavigation_quickOrderLI, TOP_BAR_NAV_QUICK_ORDER_HIDE);
                }
            }
        }
        return response;
    }

    return [];
};