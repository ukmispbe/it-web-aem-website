const keys = {
    guid: 'waters.cartGuid',
    cartId: 'waters.cartId'
}

const LocalStore = function () {
    this.setGUID = value => window.localStorage.setItem(keys.guid, value.toString());
    this.getGUID = () => window.localStorage.getItem(keys.guid);
    this.removeGUID = () => window.localStorage.removeItem(keys.guid);
    this.setCartId = value => window.localStorage.setItem(keys.cartId, value.toString());
    this.getCartId = () => window.localStorage.getItem(keys.cartId);
    this.removeCartId = () => window.localStorage.removeItem(keys.cartId);
}

export default LocalStore;
export { keys };