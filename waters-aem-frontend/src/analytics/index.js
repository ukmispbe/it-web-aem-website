import inlineSVG from '../scripts/inlineSVG';
import DigitalData from '../scripts/DigitalData';
import SessionStore from '../stores/sessionStore';
import cookieStore from '../stores/cookieStore';
import eventTypes from './eventTypes';

class Analytics {
    constructor() {
        this.analyticTypes = eventTypes;
    }

    setAnalytics = (eventType, model) => {
        let thisAnalyticEvent = null;
        if(eventType === 'form') {
            if(model.formName === 'resetpassword' && model.formType && model.formType === 'update') {
                model.formName = 'updatepassword';
            }
            if(model.formName !== 'chooseAccount') {
                thisAnalyticEvent = this.analyticTypes[eventType][model.formName][model.event];
            }
        } else if (eventType === 'orderHistory' || eventType === 'orderDetails' || eventType === 'quoteHistory' || eventType === 'quoteDetails') {
            thisAnalyticEvent = this.analyticTypes[eventType][model.event];
        } else {
            thisAnalyticEvent = this.analyticTypes[eventType];
        }
        if (thisAnalyticEvent) {
            const newModel = this.buildModel(eventType, model);
            if (newModel) {
                this.dispatchEvent(thisAnalyticEvent.event, newModel)
            }
        }
    }
 
    setClickAnalytics = (menuLocation, linkName, href) => {
         const model = {
             detail: {
                 url: href,
                 menuLocation,
                 key: 'LinkName',
                 value: linkName
             }
         };
         this.setAnalytics(this.analyticTypes['linkClick'].name, model);
    }

    setSelectDropdownAnalytics = (key, value) => {
         const model = {
             detail: {
                 key,
                 value
             }
         };
         this.setAnalytics(this.analyticTypes['selectDropDown'].name, model);
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
            case "form":
                returnModel = this.mapFormModel(model);
                break;
            case "quickOrder":
                returnModel = this.mapQuickOrderModel(model);
                break;
            default:
                returnModel = model;
                break;
        }

        return returnModel;
    }

    getUserData = model => {
        const userLoggedIn = cookieStore.getLoggedInStatus();
        const store = new SessionStore();
        const userDetails = store.getUserDetails();

        model.page = DigitalData.page ? DigitalData.page : {};
        model.detail.userLoggedIn = cookieStore.getLoggedInStatus() ? "yes" : "no";
        if(userDetails){
            model.detail.userID = userDetails.userId;
        }

        return model;
    }

    mapFormModel = model => {
        model.event = this.analyticTypes['form'][model.formName][model.event]['event'];
        model.formName = this.analyticTypes['form'][model.formName]['name'];
        return model;
    }

    mapCartAndStockModel = model => {
        return {
            detail: {
                products: [model]
            }
        }
    }

    mapQuickOrderModel = model => {
        return {
            detail: {
                cart: model.cart
            }
        }
    }

    mapSearchModel = (model) => {
        if (!model) {
            return {};
        }

        const category = model.category ? model.category : '';
        const contentType = model.content_type ? model.content_type : '';
        const keyword = model.keyword ? model.keyword : '';
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
                    keyword,
                    facets,
                    totalResults: model.total,
                }
            }
        }
    }

    dispatchEvent = (eventName, model) => {
        model = this.getUserData(model);
        // Uncomment next two lines to test analytics
        // console.log(eventName, model);
        // alert(eventName);
        document.dispatchEvent(new CustomEvent(eventName, model));
    }

    siteLoad = () => {
        document.addEventListener('at-library-loaded', function(event) { 
            if (typeof adobe != 'undefined') { 
                document.addEventListener(adobe.target.event.CONTENT_RENDERING_SUCCEEDED, function (event) {
                    inlineSVG.init('img.inline-svg', 'svg-inlined'); 
                });
            }
        });
    }

}

const analytics = new Analytics();
    
export default analytics;
export const analyticTypes = analytics.analyticTypes;
export const setClickAnalytics = analytics.setClickAnalytics;
export const setSelectDropdownAnalytics = analytics.setSelectDropdownAnalytics;
export const [mainCartContext, searchCartContext, relatedCartContext, shopAllCartContext] = analytics.analyticTypes.cart.context;