class Analytics {
    constructor() {
        this.analyticTypes = {
            cart: {
                name: 'cart',
                event: 'cartAdd',
                context: ['main', 'search', 'related']
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
        const thisAnalyticEvent = this.analyticTypes[name];
        if (thisAnalyticEvent) { 
            const newModel = this.buildModel(name, obj);
            if (newModel) { 
                this.dispatchEvent(thisAnalyticEvent.event, newModel)
            }
        }
    }
 
    buildModel = (name, model) => {
        console.log('buildModel name:', name)
        if (name == "stock" || name == "cart") { 
            return ({
                detail: {
                    products: [model]
                }
            })
        }
    }

    dispatchEvent = (eventName, obj) => {
        console.log('dispatched', eventName, obj)
        document.dispatchEvent(new CustomEvent(eventName, obj));
    }
}

const analytics = new Analytics()
    
export default analytics;
export const analyticTypes = analytics.analyticTypes;
export const analyticContextATC = analytics.analyticTypes.cart.context;