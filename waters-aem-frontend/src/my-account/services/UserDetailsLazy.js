import loginStatus from "../../scripts/loginStatus";
import SessionStore from "../../stores/sessionStore";
import UserDetails from "../services/UserDetails";

export default async (userDetailsUrl, checkSessionStore, sessionStore = new SessionStore(), service = UserDetails) => {

    // Don't get User Details if My-Account Drop Down is not present
    const navBarControls = document.getElementsByClassName("cmp-header__top-bar__nav");
    if (navBarControls.length === 0) {
        console.info(
            "UserDetails API cannot be initiated due to nav bar controls"
        );
        return {};
    }

    // Don't get User Details if not logged in
    if (!loginStatus.state()) {
        console.info(
            "UserDetails API cannot be initiated due to unavailibility of login cookie"
        );
        return {};
    }

    if (checkSessionStore) {
        const userDetails = sessionStore.getUserDetails();
        if (userDetails && Object.keys(userDetails).length !== 0) {
            return userDetails;
        }
    }

    const response = await service(userDetailsUrl);

    if (!response.failed) {
        sessionStore.setUserDetails(response);

        return response;
    }

    return {};
}