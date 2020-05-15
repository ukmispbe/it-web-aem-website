const keys = {
    previousPagePosition: 'waters.previousPagePosition',
    previousPagePositionEnabled: 'waters.previousPagePositionEnabled',
    fromSearchURL: 'waters.fromSearchURL',
    searchTabHistory: 'waters.searchTabHistory',
    previousPaginationClick: 'waters.previousPaginationClick',
    dismissSystemWideNotification: 'waters.dismissSystemWideNotification',
    userDetails: 'waters.userDetails',
    soldToDetails: 'waters.soldToDetails',
    continue: 'waters.continue',
    personalDetailsUpdated: 'waters.personalDetailsUpdated',
    legacyToken: 'waters.legacyToken',
    signInRedirect: 'waters.signInRedirect'
}


const getJSONObject = key => {
    const value = window.sessionStorage.getItem(key);
    return value ? JSON.parse(value) : {};
}

const getJSONArray = key => {
    const value = window.sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

const SessionStore = function () {
    this.setSoldToDetails = value => window.sessionStorage.setItem(keys.soldToDetails, JSON.stringify(value));
    this.getSoldToDetails = () => getJSONArray(keys.soldToDetails);
    this.removeSoldToDetails = () => window.sessionStorage.removeItem(keys.soldToDetails);
    this.setUserDetails = value => window.sessionStorage.setItem(keys.userDetails, JSON.stringify(value));
    this.getUserDetails = () => getJSONObject(keys.userDetails);
    this.removeUserDetails = () => window.sessionStorage.removeItem(keys.userDetails);
    this.setPreviousPagePosition = value => window.sessionStorage.setItem(keys.previousPagePosition, value);
    this.getPreviousPagePosition = () => window.sessionStorage.getItem(keys.previousPagePosition);
    this.removePreviousPagePosition = () => window.sessionStorage.removeItem(keys.previousPagePosition);
    this.setPreviousPagePositionEnabled = () => window.sessionStorage.setItem(keys.previousPagePositionEnabled, 'Y');
    this.getPreviousPagePositionEnabled = () => window.sessionStorage.getItem(keys.previousPagePositionEnabled);
    this.removePreviousPagePositionEnabled = () => window.sessionStorage.removeItem(keys.previousPagePositionEnabled);
    this.setFromSearchURL = value => window.sessionStorage.setItem(keys.fromSearchURL, JSON.stringify(value));
    this.getFromSearchURL = () => getJSONObject(keys.fromSearchURL);
    this.removeFromSearchURL = () => window.sessionStorage.removeItem(keys.fromSearchURL);
    this.setSearchTabHistory = value => window.sessionStorage.setItem(keys.searchTabHistory, JSON.stringify(value));
    this.getSearchTabHistory = () => getJSONObject(keys.searchTabHistory);
    this.removeSearchTabHistory = () => window.sessionStorage.removeItem(keys.searchTabHistory);
    this.setPreviousPaginationClick = value => window.sessionStorage.setItem(keys.previousPaginationClick, value);
    this.getPreviousPaginationClick = () => window.sessionStorage.getItem(keys.previousPaginationClick);
    this.removePreviousPaginationClick = () => window.sessionStorage.removeItem(keys.previousPaginationClick);
    this.setDismissSystemWideNotification = () => window.sessionStorage.setItem(keys.dismissSystemWideNotification, "Y");
    this.getDismissSystemWideNotificatiopn =() => window.sessionStorage.getItem(keys.dismissSystemWideNotification);
    this.setContinueLink = value => window.sessionStorage.setItem(keys.continue, value)
    this.getContinueLink = () => window.sessionStorage.getItem(keys.continue);
    this.removeContinueLink = () => window.sessionStorage.removeItem(keys.continue);
    this.setPersonalDetailsUpdated = () => window.sessionStorage.setItem(keys.personalDetailsUpdated, 'Y');
    this.getPersonalDetailsUpdated = () => window.sessionStorage.getItem(keys.personalDetailsUpdated);
    this.removePersonalDetailsUpdated = () => window.sessionStorage.removeItem(keys.personalDetailsUpdated);
    this.setLegacyToken = value => window.sessionStorage.setItem(keys.legacyToken, value)
    this.getLegacyToken = () => window.sessionStorage.getItem(keys.legacyToken);
    this.removeLegacyToken = () => window.sessionStorage.removeItem(keys.legacyToken);
    this.setSignInRedirect = value => window.sessionStorage.setItem(keys.signInRedirect, value)
    this.getSignInRedirect = () => window.sessionStorage.getItem(keys.signInRedirect);
    this.removeSignInRedirect = () => window.sessionStorage.removeItem(keys.signInRedirect);
}

export default SessionStore;
export { keys };