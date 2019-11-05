const keys = {
    previousPagePosition: 'waters.previousPagePosition',
    fromSearchURL: 'waters.fromSearchURL',
    searchTabHistory: 'waters.searchTabHistory',
    previousPaginationClick: 'waters.previousPaginationClick',
    dismissSystemWideNotification: 'waters.dismissSystemWideNotification'
}

const getJSONObject = key => {
    const value = window.sessionStorage.getItem(key);
    return value ? JSON.parse(value) : {};
}

const SessionStore = function() {
    this.setPreviousPagePosition = value => window.sessionStorage.setItem(keys.previousPagePosition, value);
    this.getPreviousPagePosition = () => window.sessionStorage.getItem(keys.previousPagePosition);
    this.removePreviousPagePosition = () => window.sessionStorage.removeItem(keys.previousPagePosition);
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
}

export default SessionStore;