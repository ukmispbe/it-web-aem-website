import loginStatus from "../../scripts/loginStatus";
import SessionStore from "../../stores/sessionStore";
import SoldToDetails from "../services/SoldToDetails";

export default async (soldToDetailsUrl, useDefaultSoldTo = false, sessionStore = new SessionStore(), service = SoldToDetails) => {
    if (!loginStatus.state()) {
        return [];
    }

    // const soldToDetails = sessionStore.getSoldToDetails();

    // if (soldToDetails) {
    //     return soldToDetails;
    // }
console.log("soldToDetailsUrl", soldToDetailsUrl, "useDefaultSoldTo", useDefaultSoldTo);
    const response = await service(soldToDetailsUrl, useDefaultSoldTo);

    console.log("Response: soldToDetails", response);
    if (!response.failed) {
        sessionStore.setSoldToDetails(response);

        return response;
    }

    return [];
}