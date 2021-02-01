import ReactHtmlParser from 'react-html-parser';

import SessionStore from '../stores/sessionStore';
import loginStatus from '../scripts/loginStatus';
import {
    getCountryCode,
    getLanguage,
    isEprocurementUser,
    getEprocUserCountryCode,
    getEprocUserLanguage
} from '../utils/userFunctions';
// This function determines the eCommerce Status of the User / Country combination
// The eCommerce status is determined from the "data-ecommerce-state" which is returned in the header Navigation
export const isCartHidden = () => {
    let eCommStatus;
    const headerNavigation_cartLI = document.querySelector('.top-bar__nav__cart');    
    if (headerNavigation_cartLI) {
        eCommStatus = headerNavigation_cartLI.attributes["data-ecommerce-state"].value.toUpperCase();
        setViewCartURL();
    }
    if (eCommStatus === "DISABLED") {
        return true;
    }
    if (eCommStatus === "FULL_ENABLED") {
        return false;
    }
    if (eCommStatus === "PARTIAL_ENABLED") {
        if (loginStatus.state()) { 
            const store = new SessionStore();
            const soldToDetails = store.getSoldToDetails();
            if (!soldToDetails  || soldToDetails.length === 0) {
                return true;
            }
        }
        else {
            return true;
        }
    }
    return false;
}

// Hide Sign In Component if If Partial or Disabled
export const isSignInHidden = () => {
    let eCommStatus;
    const headerNavigation_cartLI = document.querySelector('.top-bar__nav__cart');    
    if (headerNavigation_cartLI) {
        eCommStatus = headerNavigation_cartLI.attributes["data-ecommerce-state"].value.toUpperCase();
        setViewCartURL();
    }
    if (eCommStatus === "DISABLED" || eCommStatus === "PARTIAL_ENABLED") {
        return true;
    }
    if (eCommStatus === "FULL_ENABLED") {
        return false;
    }
    return false;
}

export const elementLocator = str => {
    try{
        return str ? (str.trim()).replace(/ /g, '-').toLowerCase() : '';
    } catch(e) {
        return str;
    }
}

export const getHttpStatusFromErrors = (arrErrors, defaultCode) => {
    try {
        return Array.isArray(arrErrors) ? arrErrors.reduce((acc, item) => {
            if (item.hasOwnProperty('code')) {
                acc = parseInt(item.code.substring(item.code.lastIndexOf('_') + 1), 10);
            }
            return acc;
        }, defaultCode) : defaultCode;
    } catch (e) {
        return defaultCode;
    }
}

export const htmlParser = (text = '') => {
    try {
        return ReactHtmlParser(text.trim()).toString();
    } catch (err) {
        return text;
    }
}

export const getCompanyLogo = (dir, company) => {
    const logoDir = dir.replace(/\/$/, '');
    const logo = company.replace(/[\|#%{}?&-]/g, '')
        .replace(/\s+/g, "-")
        .toLowerCase();

    return `${logoDir}/${logo}.png`;
};

export const buildViewCartURL = (url) => {
    url = url
        .replace('{localeCountry}', isEprocurementUser() ? getEprocUserCountryCode().toLowerCase() : getCountryCode())
        .replace('{localeLanguage}', isEprocurementUser() ? getEprocUserLanguage().toLowerCase() : getLanguage())
    return url;
}

export const setViewCartURL = () => {
    let cartClass = ".top-bar__nav__cart .cmp-header-links__link";
    const commerceJSON = document.querySelector("#commerce-configs-json");
    const config = JSON.parse(commerceJSON.innerHTML) ;
    const url = config.viewCartUrl ? buildViewCartURL(config.viewCartUrl) : "";
    document.querySelector(cartClass).setAttribute("href", url);
}