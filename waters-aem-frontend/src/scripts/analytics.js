class Analytics {
    constructor() {
        this.analyticTypes = {
            cart: {
                name: 'cart',
                event: 'cartAdd',
                constants: ['main', 'search', 'related']
            },
            stock: {
                name: 'stock',
                event: 'checkAvailability'
            },
            search: {
                name: 'search',
                event: 'search'
            }
        }
    }

    setAnalytics = (name, obj) => { 
        if (this.analyticTypes[name]) { 
            this.dispatchEvent(this.analyticTypes[name].event, obj)
        }
    }
 
    buildAddToCartModel = (model, optionalModelProps = null) => {
        let addToCartModel = model;
        if (optionalModelProps) { 
            addToCartModel = {
                ...model,
                ...optionalModelProps
            }
        }

        return ({
            detail: {
                products: [addToCartModel]
            }
        });
    }

    buildStockModel = (model) => {
        //name, price, sku, availability
        console.log('buildStockModel', model)
        return {
            detail: {
                products: [model]
            }
        }
    }

    dispatchEvent = (eventName, obj) => {
        console.log('dispatched', eventName, obj)
        document.dispatchEvent(new CustomEvent(eventName, obj));
    }
}




    /**
    * Model options for AddToCart
    * @typedef {object} Model
    * @property {string} addContext Context to where AddToCartModel is located on page.
    * @property {string} name Title or name of the Sku product
    * @property {string} price Price of the Sku product
    * @property {string} quantity Quanity used for Sku product
    * @property {string} sku Sku number of the Sku product
    */
    
    /** @description Builds the Add To Cart Model
     * @param {Model} Model {addContext: string, name: string, price: string, quantity: string, sku: string}
     */

const analytics = new Analytics()
    
export default analytics;
export const analyticTypes = analytics.analyticTypes;