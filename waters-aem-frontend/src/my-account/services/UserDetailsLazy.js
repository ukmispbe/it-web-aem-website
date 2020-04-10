import loginStatus from "../../scripts/loginStatus";
import SessionStore from "../../stores/sessionStore";
import UserDetails from "../services/UserDetails";

export default async (userDetailsUrl, sessionStore = new SessionStore(), service = UserDetails) => {

    const currentPage = window.location.href;

    if (!loginStatus.state() || currentPage.indexOf('sign-in') !== -1 || currentPage.indexOf('create-account') !== -1 || currentPage.indexOf('trouble-signing-in') !== -1 || currentPage.indexOf('update-password') !== -1 || currentPage.indexOf('reset-password') !== -1) {
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