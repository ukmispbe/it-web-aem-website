import scrollToY from './../../scripts/scrollTo';
import { parse } from 'query-string';
import DigitalData from '../../scripts/DigitalData';
import cookieStore from '../../stores/cookieStore';

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

    const localeLanguage = DigitalData.language;
    const localeCountry = DigitalData.country;
    if((!localeLanguage && !localeCountry) || DigitalData.country===DigitalData.globalExperience){
        localeLanguage = 'en';
        localeCountry = 'US';
    }
    data.localeCountry = localeCountry;
    data.localeLanguage = localeLanguage;

    const response = await postData(this.url, data);

    // remove all previous server error notifications
    this.setError();

    if (response.status === 200) {
        console.log('registration complete  This needs finishing off later', response.json());
    } else {
        this.setError(response);
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

    // remove all previous server error notifications
    this.setError();

    if (response.status === 200) {
        if (this.redirect) {
            window.location.href = this.redirect;
        }
    } else {
        this.setError(response);
        scrollToY(0);
    }
}

export async function resetPasswordSubmit(data) {
    const queryString = parse(window.location.search);
    const resetToken = queryString.token;
    const email = queryString.email;
    const newPassword = data.password;

    const body = {
        email,
        resetToken,
        newPassword
    };

    const response = await postData(this.url, body);

    // remove all previous server error notifications
    this.setError();

    if (response.status === 200) {
        if (this.redirect) {
            window.location.href = this.redirect;
        }
    } else {
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

    // remove all previous server error notifications
    this.setError();

    if (response.status === 200) {
        console.log('update password complete.  This needs finishing off later');

        if (this.callback && typeof this.callback === 'function') {
            this.callback(await response.json());
        }
    } else {
        this.setError(response);
        scrollToY(0);
    }
}


export async function personalSubmit(data) {

    const response = await postData(this.url, data);

    // remove all previous server error notifications
    this.setError();

    if (response.status === 200) {
        console.log('Personal Details Updated complete . This needs finishing off later', response.json());
    } else {
        this.setError(response);
        scrollToY(0);
    }
}

export async function signInSubmit(data) {

    const isCaptcha = data.hasOwnProperty('captcha');
    if (isCaptcha) {
        this.url = `${this.url}?captcha=${data.captcha}`;
        delete data.captcha;
    }

    const response = await postData(this.url, data);

    // remove all previous server error notifications
    this.setError();

    if (response.status === 200) {
        // Temporary cookie
        document.cookie = "WatersLoginCookie=1; path=/; domain=.waters.com";
        const signInRedirect = window.sessionStorage.getItem('signInRedirect');
        if (signInRedirect || this.redirect) {
            window.location.replace(signInRedirect ? signInRedirect : this.redirect);
        }
    } else {
        this.updateFailedAttempts('signin');
        this.setError(response);
        scrollToY(0);
    }
}