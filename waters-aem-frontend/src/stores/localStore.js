const keys = {
    guid: 'waters.guid',
}

const LocalStore = function () {
    this.setCartId = value => window.localStorage.setItem(keys.cartId, value.toString());
    this.getCartId = () => window.localStorage.getItem(keys.cartId);
    this.removeCartId = () => window.localStorage.removeItem(keys.cartId);
}

export default LocalStore;
export { keys };