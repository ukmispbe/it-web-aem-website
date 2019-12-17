import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../utils/modal'
import ReactSVG from 'react-svg';

const CountrySelection = props => {
    const [selectedValue, setSelectedValue] = React.useState("");

    React.useEffect(() => {
        setSelectedValue(props.countries[0].href);
    }, []);

    const handleChange = e => {
        setSelectedValue(e.target.value);
    }

    const handleButtonClick = () => window.location.href = selectedValue;

    const Items = () => props.countries.map(country => country.href === selectedValue ? <option selected key={country.href} value={country.href}>{country.title}</option> : <option key={country.href} value={country.href}>{country.title}</option>);

    return (
        <div className="cmp-country-selector">
            <div className="cmp-country-selector__title">
                <ReactSVG src="/content/dam/waters/brand-assets/icons/globe.svg" />
                <div>
                    {props.translations.preferredCountryHeading}
                </div>
            </div>
            <div className="cmp-country-selector__text">
                {props.translations.changeCountryText}
            </div>
            <div className="cmp-country-selector__dropdown">
                <select className="select-css" onChange={handleChange}>
                    <Items />
                </select>
            </div>
            <div className="cmp-country-selector__note">
                <ReactSVG src="/content/dam/waters/brand-assets/icons/externallink.svg" />
                <div>
                    {props.translations.changeCountryNoteText}&nbsp;{props.translations.changeCountryNewTabText}
                </div>
            </div>
            <div className="cmp-country-selector__button">
                <button className="cmp-button" onClick={handleButtonClick}>{props.translations.changeCountryButton}</button>
            </div>
            <div className="cmp-country-selector__cancel">
                <a onClick={props.onClose}>{props.translations.cancelButton}</a>
            </div>
        </div>
    );
}

 const CountrySelector = props => {
    const [open, setOpen] = React.useState(false);

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
        window.location.href = item.href;
    }

    return (
        <Modal isOpen={open} onClose={handleClose}>
            <CountrySelection {...props} onChange={handleCountrySelectionChange} onClose={handleClose} />
        </Modal>
    );
 }

 CountrySelector.propTypes = {
     countries: PropTypes.arrayOf(PropTypes.object).isRequired,
     translations: PropTypes.object.isRequired
 }

 CountrySelector.defaultProps = {
    countries: [],
    translations: {}
 }

 export default CountrySelector;