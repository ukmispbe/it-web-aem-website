import loginStatus from "../../scripts/loginStatus";
import SessionStore from "../../stores/sessionStore";
import SoldToDetails from "../services/SoldToDetails";

export default async (soldToDetailsUrl, useDefaultSoldTo = false, sessionStore = new SessionStore(), service = SoldToDetails) => {
    if (!loginStatus.state()) {
        return [];
    }

    const soldToDetails = sessionStore.getSoldToDetails();

    if (soldToDetails && !useDefaultSoldTo) {
        return soldToDetails;
    }
    if (soldToDetails && useDefaultSoldTo) {
        return SoldToDetails.getDefaultSoldTo(soldToDetails);
    }

    const response = await service(soldToDetailsUrl, useDefaultSoldTo);

    if (!response.failed) {
        sessionStore.setSoldToDetails(response);

        return response;
    }

    return [];
}