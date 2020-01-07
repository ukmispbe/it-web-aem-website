import React from 'react';
import PropTypes from 'prop-types';
import Modal, { Header, keys } from '../utils/modal'
import ReactSVG from 'react-svg';

const CountrySelection = props => {
    const [selectedValue, setSelectedValue] = React.useState("");

    React.useEffect(() => {
        setSelectedValue(props.countries[0].href);
    }, []);

    const handleDropdownChange = e => {
        setSelectedValue(e.target.value);
    }

    const handleButtonClick = () => props.onChange(selectedValue);

    const Items = () => props.countries.map(country => <option key={country.href} value={country.href}>{country.title}</option>);

    return (
        <div className="cmp-country-selector">
            <div className="cmp-country-selector__text">
                {props.translations.changeCountryText}
            </div>
            <div className="cmp-country-selector__dropdown">
                <select className="select-css" value={selectedValue} onChange={handleDropdownChange}>
                    <Items />
                </select>
            </div>
            <div className="cmp-country-selector__note">
                <ReactSVG src="/content/dam/waters/en/brand-assets/icons/externallink.svg" />
                <div className="cmp-country-selector__note-text">
                    <span>{props.translations.changeCountryNoteText}:</span>&nbsp;{props.translations.changeCountryNewTabText}
                </div>
            </div>
            <div className="cmp-country-selector__button">
                <a className="cmp-button" onClick={handleButtonClick}>{props.translations.changeCountryButton}</a>
            </div>
            <div className="cmp-country-selector__cancel">
                <a onClick={props.onClose}>{props.translations.cancelButton}</a>
            </div>
        </div>
    );
}

 const CountrySelector = props => {
    const [open, setOpen] = React.useState(props.initialState);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        const regionSelectorElements = Array.from(document.getElementsByClassName('cmp-footer__selector__region'));
        
        regionSelectorElements.forEach(element => {
            element.addEventListener('click', handleOpen);
        });

        return () => {
            regionSelectorElements.forEach(element => {
                element.removeEventListener('click', handleOpen);
            });
        }
    }, []);

    const handleCountrySelectionChange = item => {
        handleClose();
        window.open(`${window.location.origin}${item}`, "_blank");
    }

    return (
        <Modal isOpen={open} onClose={handleClose} className='cmp-country-selector-modal'>
            <Header
                title={props.translations.preferredCountryHeading}
                icon='/content/dam/waters/en/brand-assets/icons/globe.svg'
            />
            <CountrySelection {...props} onChange={handleCountrySelectionChange} onClose={handleClose} />
        </Modal>
    );
 }

 CountrySelector.propTypes = {
     countries: PropTypes.arrayOf(PropTypes.object).isRequired,
     translations: PropTypes.object.isRequired,
     initialState: PropTypes.bool
 }

 CountrySelector.defaultProps = {
    countries: [],
    translations: {},
    initialState: false
 }

 export default CountrySelector;
 export { CountrySelection }