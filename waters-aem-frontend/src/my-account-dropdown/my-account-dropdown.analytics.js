import Analytics, { analyticTypes } from "../analytics";

export const setAnalytics = (event, linkName) => {
    const model = {
        detail: {
            url: window.location.href,
            menuLocation: 'Account Dropdown',
            linkName
        },
        event
    };

    Analytics.setAnalytics(analyticTypes['myaccount'].name, model);
}
