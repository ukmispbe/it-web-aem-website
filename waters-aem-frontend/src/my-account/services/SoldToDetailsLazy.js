import loginStatus from "../../scripts/loginStatus";
import SessionStore from "../../stores/sessionStore";
import SoldToDetails from "../services/SoldToDetails";

export default async (soldToDetailsUrl, sessionStore = new SessionStore(), service = SoldToDetails) => {
    const currentPage = window.location.href;

    if (!loginStatus.state() || currentPage.includes('sign-in') || currentPage.includes('create-account') || currentPage.includes('trouble-signing-in') || currentPage.includes('update-password') || currentPage.includes('reset-password')) {
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