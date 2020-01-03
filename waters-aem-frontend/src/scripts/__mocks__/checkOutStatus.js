const checkOutStatus = {
    state: jest.fn(),
    get length() {
        const soldToDetails = this.details;

        if (!Array.isArray(soldToDetails)) { 
            return 0;
        }
        
        return soldToDetails.length;
    },
    get details() {
        const sessionStore = new SessionStore();
        const cestatusSession = sessionStore.getSoldToDetails();
        return cestatusSession;
    }
};

Object.defineProperty(checkOutStatus, 'length', {
    get: jest.fn()
})
  
Object.defineProperty(checkOutStatus, 'details', {
    get: jest.fn()
})

export default checkOutStatus;
