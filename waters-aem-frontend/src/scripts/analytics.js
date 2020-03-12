import inlineSVG from '../scripts/inlineSVG';
import DigitalData from '../scripts/DigitalData';
import SessionStore from '../stores/sessionStore';
import cookieStore from '../stores/cookieStore';

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
            },
            form: {
                name: 'form',
                registration: {
                    name: 'registrationForm',
                    load: {
                        event: 'registrationFormLoad'
                    },
                    submit: {
                        event: 'registrationFormSubmit'
                    },
                    error: {
                        event: 'registrationFormError'
                    }
                },
                signin: {
                    name: 'signInForm',
                    load: {
                        event: 'signInFormLoad'
                    },
                    submit: {
                        event: 'signInFormSubmit'
                    },
                    error: {
                        event: 'signInFormError'
                    }
                },
                troublesigningin: {
                    name: 'troubleSignInForm',
                    load: {
                        event: 'troubleSignInFormLoad'
                    },
                    submit: {
                        event: 'troubleSignInFormSubmit'
                    },
                    error: {
                        event: 'troubleSignInFormError'
                    }
                },
                resetpassword: {
                    name: 'resetPasswordForm',
                    load: {
                        event: 'resetPasswordFormLoad'
                    },
                    submit: {
                        event: 'resetPasswordFormSubmit'
                    },
                    error: {
                        event: 'resetPasswordFormError'
                    }
                },
                updatepassword: {
                    name: 'updatePasswordForm',
                    load: {
                        event: 'legacyPasswordFormLoad'
                    },
                    submit: {
                        event: 'legacyPasswordFormSubmit'
                    },
                    error: {
                        event: 'legacyPasswordFormError'
                    }
                },
                changepassword: {
                    name: 'changePasswordForm',
                    load: {
                        event: 'changePasswordFormLoad'
                    },
                    submit: {
                        event: 'changePasswordFormSubmit'
                    },
                    error: {
                        event: 'changePasswordFormError'
                    }
                }
            }
        }
    }

    setAnalytics = (name, model) => {
        let thisAnalyticEvent = null;
        if(name==='form') {
            thisAnalyticEvent = this.analyticTypes[name][model.formName][model.event];
        } else {
            thisAnalyticEvent = this.analyticTypes[name];
        };
        if (thisAnalyticEvent) {
            const newModel = this.buildModel(name, model);
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
            case "form":
                returnModel = this.mapFormModel(model);
                break;
            default:
                break;
        }

        return returnModel;
    }

    mapFormModel = model => {
        const userLoggedIn = cookieStore.getLoggedInStatus();
        const store = new SessionStore();
        const userDetails = store.getUserDetails();

        model.page = DigitalData.page ? DigitalData.page : {};
        model.userLoggedIn = cookieStore.getLoggedInStatus() ? "yes" : "no";
        if(userDetails){
            model.userID = userDetails.userId;
        }
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


const analytics = new Analytics()
    
export default analytics;
export const analyticTypes = analytics.analyticTypes;
export const [mainCartContext, searchCartContext, relatedCartContext] = analytics.analyticTypes.cart.context;