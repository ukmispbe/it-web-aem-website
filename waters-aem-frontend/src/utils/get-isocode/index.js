import DigitalData from '../../scripts/DigitalData';

function getIsocode() {
    let isoCode;
    let footerIsocode = JSON.parse(
        document.getElementById('commerce-configs-json').innerHTML
    ).isocode;

    if(!footerIsocode){
        let localeLanguage = DigitalData.language;
        let localeCountry = DigitalData.country;
        if (
            (!localeLanguage && !localeCountry) ||
            DigitalData.country === DigitalData.globalExperience
        ) {
            localeLanguage = 'en';
            localeCountry = 'US';
        }

        isoCode = localeLanguage + "_" + localeCountry.toUpperCase();
    } else {
        isoCode = footerIsocode;
    }
        

    return isoCode;
}

export default {
    getIsocode: getIsocode,
};
