import inlineSVG from '../scripts/inlineSVG';

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
                this.dispatchEvent(thisAnalyticEvent.event, newModel)
            }
        }
    }
 
    buildModel = (name, model) => {
        let returnModel = null;

        switch (name) {
            case "stock":
            case "cart":
                returnModel = this.mapCartAndStockModel(model);
                break;
            case "search":
                returnModel = this.mapSearchModel(model);
                break;
            default:
                break;
        }

        return returnModel;
    }

    mapCartAndStockModel = model => {
        return {
            detail: {
                products: [model]
            }
        }
    }

    mapSearchModel = (model) => {
        if (!model) {
            return {};
        }

        const category = model.category ? model.category : '';
        const contentType = model.content_type ? model.content_type : '';
        const facetsObj = model.facets ? model.facets : {};
        const facets = Object.entries(facetsObj).map(item => {
            return {
                name: item[0],
                values: item[1],
            }
        });

        return {
            detail: {
                search: {
                    category,
                    contentType,
                    facets,
                    totalResults: model.total,
                }
            }
        }
    }

    dispatchEvent = (eventName, obj) => {
        document.dispatchEvent(new CustomEvent(eventName, obj));
    }

    onSiteLoad = () => { 
        //atjs.custom events for Target Analytics :: see below URL for more detials
        //https://docs.adobe.com/content/help/en/target/using/implement-target/client-side/functions-overview/atjs-custom-events.html
      
        document.addEventListener('at-content-rendering-succeeded', this.contentRenderingSucceeded);
    }

    contentRenderingSucceeded = (event) => {
        //Unique svg class for Target authored images
        inlineSVG.init('img.inline-svg-target', 'svg-inlined-target');
    }
}


const analytics = new Analytics()
    
export default analytics;
export const analyticTypes = analytics.analyticTypes;
export const [mainCartContext, searchCartContext, relatedCartContext] = analytics.analyticTypes.cart.context;