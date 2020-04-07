import loginStatus from "../../scripts/loginStatus";
import SessionStore from "../../stores/sessionStore";
import SoldToDetails from "../services/SoldToDetails";

export default async (soldToDetailsUrl, sessionStore = new SessionStore(), service = SoldToDetails) => {
    const currentPage = window.location.href;

    if (!loginStatus.state() || currentPage.indexOf('sign-in') !== -1 || currentPage.indexOf('create-account') !== -1 || currentPage.indexOf('trouble-signing-in') !== -1 || currentPage.indexOf('update-password') !== -1 || currentPage.indexOf('reset-password') !== -1) {
        return [];
    }

    const soldToDetails = sessionStore.getSoldToDetails();

    if (soldToDetails) {
        return soldToDetails;
    }

    const response = await service(soldToDetailsUrl);

    if (!response.failed) {
        sessionStore.setSoldToDetails(response);

        return response;
    }

    return [];
}