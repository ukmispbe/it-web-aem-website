import DigitalData from '../../../scripts/DigitalData';

export const getDefault = () => DigitalData.country !== DigitalData.globalExperience ? DigitalData.country.toLowerCase() : "";