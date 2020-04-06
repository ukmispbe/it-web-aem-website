import scrollToY from './../../scripts/scrollTo';
import { parse } from 'query-string';
import SessionStore from '../../stores/sessionStore';
import DigitalData from '../../scripts/DigitalData';
import UserDetails from '../../my-account/services/UserDetails';
import { signInRedirect } from '../../utils/redirectFunctions';

const postData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await response;
};

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
                
                const soldToAccounts = userDetails.soldToAccounts;
                
                // Temporary Code to ensure the user has to Choose Account
                soldToAccounts[0].defaultFlag = 1;
                console.log(soldToAccounts);
                // Temporary Code to ensure the user has to Choose Account

                const needToChooseAccount = checkRedirectToChooseAccount(soldToAccounts);
                if(needToChooseAccount) {
                    // Choose Account URL
                    window.location.replace(this.switchAccountUrl);
                    return;
                }

                store.removeSoldToDetails();

                // Check 
            }
        }
        if (this.redirect) {
            window.location.replace(this.redirect);
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
        this.setProfileData(responseBody);
        const model = {
            "communications":data.communications 
        }
        this.setFormAnalytics('submit', model);

        this.callback();
    } else if (response.status === 401) {
        signInRedirect();
    } else {
        this.setError(response);
        this.setFormAnalytics('error', responseBody);
        scrollToY(0);
    }
}

const checkRedirectToChooseAccount = (soldToAccounts) => {
    if (soldToAccounts === null || soldToAccounts === undefined || !soldToAccounts.length || soldToAccounts.length === 1 ) {
        return false;
    }
    let defaultSoldTos = soldToAccounts.filter(function(i) {
        return i.defaultFlag === 1;
    });

    if (defaultSoldTos.length > 1) {
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
                
                const soldToAccounts = userDetails.soldToAccounts;
                
                // Temporary Code to ensure the user has to Choose Account
                soldToAccounts[0].defaultFlag = 1;
                console.log(soldToAccounts);
                // Temporary Code to ensure the user has to Choose Account

                const needToChooseAccount = checkRedirectToChooseAccount(soldToAccounts);
                if(needToChooseAccount) {
                    // Choose Account URL
                    window.location.replace(this.switchAccountUrl);
                    return;
                }

                store.removeSoldToDetails();

                // Check 
            }
        }

        this.setFormAnalytics('submit');

        const signInRedirect = window.sessionStorage.getItem('signInRedirect');
        if (signInRedirect || this.redirect) {
            window.location.replace(
                signInRedirect ? signInRedirect : this.redirect
            );
        }
    } else {
        this.setFormAnalytics('error', responseBody);
        this.updateFailedAttempts('signin');
        this.setError(responseBody);
        scrollToY(0);
    }
}

export async function chooseAccountSubmit(data) {
    // Determine the selercted Account
    let selectedAccount = "";
    for (let key of Object.keys(data)) {
        if (data[key] === "on") {
            selectedAccount = key;
        }
    }

    const response = await postData(this.url + "/" + selectedAccount, "");
    const responseBody = await response.json();
     // remove all previous server error notifications
    this.setError();

    if (response.status === 200) {
        if (this.redirect) {
            window.location.replace(this.redirect);
        }
    } else if (response.status === 401) {
        signInRedirect();
    } else {
        this.setError(responseBody);
        scrollToY(0);
    }
}