import loginStatus from "../../scripts/loginStatus";
import SessionStore from "../../stores/sessionStore";
import UserDetails from "../services/UserDetails";

export default async (userDetailsUrl, sessionStore = new SessionStore(), service = UserDetails) => {

    const currentPage = window.location.href;

    if (!loginStatus.state() || currentPage.includes('sign-in') || currentPage.includes('create-account') || currentPage.includes('trouble-signing-in') || currentPage.includes('update-password')  || currentPage.includes('reset-password')) {
        return {};
    }

    const userDetails = sessionStore.getUserDetails();

    if (userDetails && Object.keys(userDetails).length !== 0) {
        return userDetails;
    }

    const response = await service(userDetailsUrl);

    if (!response.failed) {
        sessionStore.setUserDetails(response);

        return response;
    }

    return {};
}