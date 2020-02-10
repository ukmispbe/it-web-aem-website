import loginStatus from "../../scripts/loginStatus";
import SessionStore from "../../stores/sessionStore";
import SoldToDetails from "../services/SoldToDetails";

export default async (soldToDetailsUrl, sessionStore = new SessionStore(), service = SoldToDetails) => {
    if (!loginStatus.state()) {
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