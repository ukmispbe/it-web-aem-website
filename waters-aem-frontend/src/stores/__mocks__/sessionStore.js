const keys = {
    previousPagePosition: 'waters.previousPagePosition',
    previousPagePositionEnabled: 'waters.previousPagePositionEnabled',
    fromSearchURL: 'waters.fromSearchURL',
    searchTabHistory: 'waters.searchTabHistory',
    previousPaginationClick: 'waters.previousPaginationClick',
    dismissSystemWideNotification: 'waters.dismissSystemWideNotification',
    userDetails: 'waters.userDetails',
    userToken: 'waters.userToken',
    soldToDetails: 'waters.soldToDetails'
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
    this.setSoldToDetails = jest.fn(() => {});
    this.getSoldToDetails = jest.fn(() => {});
    this.setUserToken = jest.fn(() => {});
    this.getUserToken = jest.fn(() => {});
    this.setUserDetails = jest.fn(() => {});
    this.getUserDetails = jest.fn(() => {});
    this.setPreviousPagePosition = jest.fn(() => {});
    this.getPreviousPagePosition = jest.fn(() => {});
    this.removePreviousPagePosition = jest.fn(() => {});
    this.setPreviousPagePositionEnabled = jest.fn(() => {});
    this.getPreviousPagePositionEnabled = jest.fn(() => {});
    this.removePreviousPagePositionEnabled = jest.fn(() => {});
    this.setFromSearchURL = jest.fn(() => {});
    this.getFromSearchURL = jest.fn(() => {});
    this.removeFromSearchURL = jest.fn(() => {});
    this.setSearchTabHistory = jest.fn(() => {});
    this.getSearchTabHistory = jest.fn(() => {});
    this.removeSearchTabHistory = jest.fn(() => {});
    this.setPreviousPaginationClick = jest.fn(() => {});
    this.getPreviousPaginationClick = jest.fn(() => {});
    this.removePreviousPaginationClick = jest.fn(() => {});
    this.setDismissSystemWideNotification = jest.fn(() => {});
    this.getDismissSystemWideNotificatiopn = jest.fn(() => {});
}

export default SessionStore;
export { keys };