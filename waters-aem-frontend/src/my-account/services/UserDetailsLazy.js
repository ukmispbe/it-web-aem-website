import loginStatus from "../../scripts/loginStatus";
import SessionStore from "../../stores/sessionStore";
import UserDetails from "../services/UserDetails";

export default async (userDetailsUrl, sessionStore = new SessionStore(), service = UserDetails) => {
    if (!loginStatus.state()) {
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