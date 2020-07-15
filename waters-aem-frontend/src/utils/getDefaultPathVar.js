import SessionStore from '../stores/sessionStore';

export const getDefaultPathVar = () => {
    const store = new SessionStore();
    const userDetails = store.getUserDetails();
    if (userDetails && Object.keys(userDetails).length > 0) {
        const mailingAddress = userDetails.userAddress.find(item => item.addressType === 'mailingAddress');
        const localeCountry = mailingAddress ? mailingAddress.countryCode : userDetails.localeCountry;
        const localeLanguage = userDetails.localeLanguage;
        return {
            userType: userDetails.userId,
            localeCountry: localeCountry.toLowerCase(),
            localeLanguage: localeLanguage.toLowerCase()
        }
    }
    return {
        userType: '',
        localeCountry: '',
        localeLanguage: ''
    }
};

export default getDefaultPathVar;
