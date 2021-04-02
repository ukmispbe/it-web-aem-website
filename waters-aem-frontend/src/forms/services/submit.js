import scrollToY from './../../scripts/scrollTo';
import { parse } from 'query-string';
import SessionStore from '../../stores/sessionStore';
import DigitalData from '../../scripts/DigitalData';
import UserDetails from '../../my-account/services/UserDetails';
import SoldToDetailsLazy from '../../my-account/services/SoldToDetailsLazy';
import { signInRedirect, getNamedHeaderLink } from '../../utils/redirectFunctions';
import { postData, getData, postDataWithLanguage } from '../../utils/serviceFunctions';
import { createUserAddresses, getFullName, matchUserToSoldToAddresses, setHeaderWelcome, getEprocUserLanguage } from '../../utils/userFunctions';
import { convertFileIntoBase64, getAttachmentFieldName } from '../fields/utils/fileAttachment';

export async function registrationSubmit(data) {
    delete data.confirmPassword;

    const isCaptcha = data.hasOwnProperty('captcha');
    if (isCaptcha) {
        this.url = `${this.url}?captcha=${data.captcha}`;
        delete data.captcha;
    }

    let localeLanguage = DigitalData.language;
    let localeCountry = DigitalData.country;
    if (
        (!localeLanguage && !localeCountry) ||
        DigitalData.country === DigitalData.globalExperience
    ) {
        localeLanguage = 'en';
        localeCountry = 'US';
    }

    data.country = data.country.toUpperCase();
    data.localeCountry = localeCountry;
    data.localeLanguage = localeLanguage;

    const response = await postData(this.url, data);
    const responseBody = await response.json();

    // remove all previous server error notifications
    this.setError();

    if (response.status === 200) {
        if (this.callback) {
            const userDetails = await UserDetails(this.callback);

            if (!userDetails.failed) {
                const store = new SessionStore();
                store.setUserDetails(userDetails);
                store.removeSoldToDetails();
            }
        }
        this.setFormAnalytics('submit');

        if (this.redirect) {
            window.location.replace(this.redirect);
        }
    } else {
        this.setFormAnalytics('error', responseBody);
        this.setError(responseBody);
        scrollToY(0);
    }
}

// Getting the Language from the User Details in Session Store
function getUserDetailsLanguage() {
    return getEprocUserLanguage();
}

export async function iRequestSubmit(url, data, callback, formData) {

    const userLanguage = getUserDetailsLanguage();
    const response = await postDataWithLanguage(url, data, userLanguage);
    const responseBody = await response.json();

    // remove all previous server error notifications
    this.setError();

    if (response.status === 200) {
        if (callback) {
            callback(responseBody, formData);
        }
        this.setFormAnalytics('submit');

    } else {
        this.setFormAnalytics('error', responseBody);
        this.setError({code: 500});
        window.dispatchEvent(new CustomEvent("showLoaderEproc", { detail: { showLoader: false }}));
    }
}

export async function checkEmailResetPasswordSubmit(data) {

    this.url = `${this.url.replace('{email}', data.email)}&isEproc=true`;
    const response = await postData(this.url, data);
    const responseBody = await response.json();

    // remove all previous server error notifications
    this.setError();

    if (response.status === 200) {
        this.setFormAnalytics('submit');
        if (this.redirect) {
            window.location.href = this.redirect + `?email=${data.email}`;
        }
    } else {
        this.setFormAnalytics('error', responseBody);
        this.setError(response);
        scrollToY(0);
    }
}

export async function serialNumberSubmit(apiUrl, companyName, formData, callback) {

    const fullUrl = `${apiUrl}?accountName=${companyName}&serialNumber=${formData.serialNumber}`;
    const response = await getData(fullUrl);
    const responseBody = await response.json();

    // remove all previous server error notifications
    this.setError();

    if (response.status === 200) {
        this.setFormAnalytics('submit');
        if (responseBody.errors) {
            //this.setError(responseBody);
            if (responseBody.errors[0].code === "WAT_CUSTOM_400") {
                this.setError({code: 400});
                window.dispatchEvent(new CustomEvent("showLoaderEproc", { detail: { showLoader: false }}));
            }
        }
        callback(responseBody, formData);
    } else {
        this.setFormAnalytics('error', responseBody);
        this.setError({code: 500});
        window.dispatchEvent(new CustomEvent("showLoaderEproc", { detail: { showLoader: false }}));
    }
}

export async function troubleSigningInSubmit(data) {
    const isCaptcha = data.hasOwnProperty('captcha');

    if (isCaptcha) {
        this.url = `${this.url}&captcha=${data.captcha}`;
        delete data.captcha;
    }

    this.url = this.url.replace('{email}', data.email);
    const response = await postData(this.url, data);
    const responseBody = await response.json();

    // remove all previous server error notifications
    this.setError();

    if (response.status === 200) {
        this.setFormAnalytics('submit');
        if (this.redirect) {
            window.location.href = this.redirect;
        }
    } else {
        this.setFormAnalytics('error', responseBody);
        this.setError(response);
        scrollToY(0);
    }
}

export async function resetPasswordSubmit(data) {

    const store = new SessionStore();
    let resetToken = store.getLegacyToken();
    store.removeLegacyToken();
    if (resetToken === null) {
        const queryString = parse(window.location.search);
        resetToken = queryString.token;
    }

    const newPassword = data.password;

    let body = {
        resetToken,
        newPassword
    };

    const response = await postData(this.url, body);
    const responseBody = await response.json();
    // remove all previous server error notifications
    this.setError();

    if (response.status === 200) {
        this.setFormAnalytics('submit');
        // Use Call back to added userDetails to Session State
        if (this.callback) {
            const userDetails = await UserDetails(this.callback);
            if (!userDetails.failed) {
                const store = new SessionStore();
                store.setUserDetails(userDetails);

                const needToChooseAccount = checkRedirectToChooseAccount(userDetails.soldToAccounts);
                if(needToChooseAccount) {
                    // If there is only one account then set this as the default account
                    if (userDetails.soldToAccounts.length === 1) {
                        submitAccount(userDetails.soldToAccounts[0].soldTo, this.urlChooseAccount);
                        return;
                    }

                    // Choose Account URL
                    const switchAccountUrl = getNamedHeaderLink("data-switch-account-url");
                    window.location.replace(switchAccountUrl);
                    return;
                }

                store.removeSoldToDetails();
            }
        }
        const store = new SessionStore();
        const signInRedirectStore = store.getSignInRedirect();
        store.removeSignInRedirect();
        if (signInRedirectStore || this.redirect) {
            window.location.replace(
                signInRedirectStore ? signInRedirectStore : this.redirect
            );
            return;
        }
    } else if (response.status === 401) {
        signInRedirect();
    } else {
        this.setFormAnalytics('error', responseBody);
        this.setError(response);
        scrollToY(0);
    }
}

export async function changePasswordSubmit(data) {
    delete data.confirmNewPassword;

    const queryString = parse(window.location.search);
    const email = queryString.email;
    data.email = email;

    const response = await postData(this.url, data);
    const responseBody = await response.json();

    // remove all previous server error notifications
    this.setError();

    if (response.status === 200) {
        this.setFormAnalytics('submit');

        document.getElementsByName("currentPassword")[0].value = "";
        document.getElementsByName("newPassword")[0].value = "";
        document.getElementsByName("confirmNewPassword")[0].value = "";

        if (this.callback && typeof this.callback === 'function') {
            this.callback(await responseBody);
        }
    } else if (response.status === 401) {
        signInRedirect();
    } else {
        this.setFormAnalytics('error', responseBody);
        this.setError(response);
        scrollToY(0);
    }
}

export async function personalSubmit(data) {
    const response = await postData(this.url, data);
    const responseBody = await response.json();
    // remove all previous server error notifications
    this.setError();

    if (response.status === 200) {
        const store = new SessionStore();
        store.setUserDetails(responseBody);
        store.setPersonalDetailsUpdated();
        setHeaderWelcome(getFullName(responseBody));

        if (responseBody && responseBody.soldToAccounts && responseBody.soldToAccounts.length &&
            responseBody.userId && responseBody.salesOrg) {
            if (responseBody.shipOrBillChangeFlag && (responseBody.shipOrBillChangeFlag == 1)) {
                this.setProfileData(createUserAddresses(responseBody));
            } else {
                SoldToDetailsLazy(this.soldToDetailsUrl, responseBody.userId, responseBody.salesOrg)
                    .then((soldToDetails) => {
                        let mergeAPIs = matchUserToSoldToAddresses(responseBody, soldToDetails);
                        this.setProfileData(mergeAPIs);
                    });
            }
        } else {
            this.setProfileData(createUserAddresses(responseBody));
        }

        const model = {
            "communications": data.communications
        }
        this.setFormAnalytics('submit', model);

        this.callback();
        scrollToY(0);
    } else if (response.status === 401) {
        signInRedirect();
    } else {
        this.setError(response);
        this.setFormAnalytics('error', responseBody);
        scrollToY(0);
    }
}

//Note: this method uses the USER Details API, not the SoldToDetailsAPI
const checkRedirectToChooseAccount = (soldToAccounts) => {
    if (soldToAccounts === null || soldToAccounts === undefined || !soldToAccounts.length) {
        return false;
    }
    let defaultSoldTos = soldToAccounts.filter(function(i) {
        return i.defaultFlag === 1;
    });

    if (defaultSoldTos.length > 1 || defaultSoldTos.length === 0) {
        return true;
    }
    return false;
}

export async function signInSubmit(data) {
    const isCaptcha = data.hasOwnProperty('captcha');
    if (isCaptcha) {
        this.url = `${this.url}?captcha=${data.captcha}`;
        delete data.captcha;
    }
    
    const response = await postData(this.url, data);
    const responseBody = await response.json();

    // remove all previous server error notifications
    this.setError();

    if (response.status === 200) {
        this.setFormAnalytics('submit');
        if(responseBody.migrated === "N") {
            const store = new SessionStore();
            store.setLegacyToken(responseBody.resetToken);
            window.location.replace(this.passwordUpdateUrl);
            return;
        }
        if (this.callback) {
            const userDetails = await UserDetails(this.callback);
            if (!userDetails.failed) {
                const store = new SessionStore();
                store.setUserDetails(userDetails);
                const needToChooseAccount = checkRedirectToChooseAccount(userDetails.soldToAccounts);
                if(needToChooseAccount) {
                    // If there is only one account then set this as the default account
                    if (userDetails.soldToAccounts.length === 1) {
                        submitAccount(userDetails.soldToAccounts[0].soldTo, this.urlChooseAccount);
                        return;
                    }

                    // Choose Account URL
                    const switchAccountUrl = getNamedHeaderLink("data-switch-account-url");
                    window.location.replace(switchAccountUrl);
                    return;
                }
                store.removeSoldToDetails();
                this.setFormAnalytics('submit');
                const signInRedirectStore = store.getSignInRedirect();
                store.removeSignInRedirect();
                if (signInRedirectStore || this.redirect) {
                    window.location.replace(
                        signInRedirectStore ? signInRedirectStore : this.redirect
                    );
                    return;
                }
            }
        } else {
            this.setFormAnalytics('submit');
            const store = new SessionStore();
            const signInRedirectStore = store.getSignInRedirect();
            store.removeSignInRedirect();
            if (signInRedirectStore || this.redirect) {
                window.location.replace(
                    signInRedirectStore ? signInRedirectStore : this.redirect
                );
                return;
            }
        }
    } else {
        this.setFormAnalytics('error', responseBody);
        this.updateFailedAttempts('signin');
        this.setError(responseBody);
        scrollToY(0);
    }
}

const setNewSoldTo = (newSoldto) => {
    const store = new SessionStore();
    const soldToDetails = store.getSoldToDetails();
    const user = store.getUserDetails();

    const updatedSoldToDetails = soldToDetails.map(soldTo => {
        if (soldTo.customerNumber === newSoldto) {
            soldTo.soldToFlag = 1;
        }
        else {
            soldTo.soldToFlag = 0;
        }         
        return soldTo;
    });

    store.setSoldToDetails(updatedSoldToDetails);

    const updatedUserDetailsSoldTos = user.soldToAccounts.map(soldTo => {
        if (soldTo.soldTo === newSoldto) {
            soldTo.defaultFlag = 1;
        }
        else {
            soldTo.defaultFlag = 0;
        }         
        return soldTo;
    });
    user.soldToAccounts = updatedUserDetailsSoldTos;
    store.setUserDetails(user);
    store.setPersonalDetailsUpdated();
}

export async function chooseAccountSubmit(data) {
    // Determine the selected Account
    let selectedAccount = "";
    for (let key of Object.keys(data)) {
        if (data[key] === "on") {
            selectedAccount = key;
        }
    }

    setNewSoldTo(selectedAccount);

    const response = await postData(this.url + "/" + selectedAccount, "");
    const responseBody = await response.json();
     // remove all previous server error notifications
    this.setError();

    if (response.status === 200) {
        // If accessed from My Account Drop Down - Return to same page
        const queryString = location.search;
        if(queryString === "?fromMenu=true") {
            window.location.replace(document.referrer);
            return;
        }

        // If User had previously been directed to Sign in - Return to Original page
        const store = new SessionStore();
        const signInRedirectStore = store.getSignInRedirect();
        store.removeSignInRedirect();

        if (signInRedirectStore) {
            window.location.replace(signInRedirectStore.replace(/"/g, ""));
            return;
        }

        // If user has accessed directly from Sign in Page - Return to Home page
        const homePageUrl = getNamedHeaderLink("data-homepage-url");
        window.location.replace(homePageUrl);
        return;

    } else if (response.status === 401) {
        signInRedirect();
    } else {
        this.setError(responseBody);
        scrollToY(0);
    }
}

export async function submitAccount(selectedAccount, urlChooseAccount) {

    const response = await postData(urlChooseAccount + "/" + selectedAccount, "");
    
    if (response.status === 200) {
        // If accessed from My Account Drop Down - Return to same page
        const queryString = location.search;
        if(queryString === "?fromMenu=true") {
            window.location.replace(document.referrer);
            return;
        }

        // If User had previously been directed to Sign in - Return to Original page
        const store = new SessionStore();
        const signInRedirectStore = store.getSignInRedirect();
        store.removeSignInRedirect();

        if (signInRedirectStore) {
            window.location.replace(signInRedirectStore.replace(/"/g, ""));
            return;
        }

        // If user has accessed directly from Sign in Page - Return to Home page
        const homePageUrl = getNamedHeaderLink("data-homepage-url");
        window.location.replace(homePageUrl);
        return;

    } else {
        signInRedirect();
    }
}

export async function contactSupportSubmit(data) {
    try {
        window.dispatchEvent(new CustomEvent("showLoaderEproc", { detail: { showLoader: true }}));
        const isCaptcha = data.hasOwnProperty('captcha');
        if (isCaptcha) {
            this.url = `${this.url}?captcha=${data.captcha}`;
            delete data.captcha;
        }
        const attachmentFieldName = getAttachmentFieldName(data);
        const { fileName, base64Value } = await convertFileIntoBase64(data[attachmentFieldName]);
        const encodeValue = base64Value.replace(/^[^,]*,/, '');
        const formData = { ...data, [attachmentFieldName]: encodeValue, hasAttachment: encodeValue ? 'Y': 'N', fileName};

        const response = await postData(this.url, formData);
        const responseBody = await response.json();

        // remove all previous server error notifications
        this.setError();

        if (response.status === 200) {
            this.setFormAnalytics('submit');

            if (this.redirect) {
                window.location.replace(this.redirect);
            }
        } else {
            this.setFormAnalytics('error', responseBody);
            this.setError(responseBody);
            scrollToY(0);
        }
        window.dispatchEvent(new CustomEvent("showLoaderEproc", { detail: { showLoader: false }}));
    } catch (e) {
        console.error(e);
        window.dispatchEvent(new CustomEvent("showLoaderEproc", { detail: { showLoader: false }}));
    }
}

