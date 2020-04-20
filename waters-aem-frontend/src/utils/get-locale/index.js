import DigitalData from '../../scripts/DigitalData';

function getLocale() {
        let locale = "";
        let localeLanguage = DigitalData.language;
        let localeCountry = DigitalData.country;
        if (
            (!localeLanguage && !localeCountry) ||
            DigitalData.country === DigitalData.globalExperience
        ) {
            localeLanguage = 'en';
            localeCountry = 'US';
        }

        locale = localeLanguage + "-" + localeCountry.toUpperCase();

        return locale;
}

export default {
    getLocale: getLocale,
};

