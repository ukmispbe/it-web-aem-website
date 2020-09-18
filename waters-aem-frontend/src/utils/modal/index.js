import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import ModalPortal from './modal-portal';
import FeedbackSurvey from '../../scripts/feedbackSurvey';
import domElements from '../../scripts/domElements';
import { elementLocator } from '../eCommerceFunctions';

const keys = {
    ModalWithSiteNavOnMobile: 'cmp-modal-box__site-nav-on-mobile',
    HeaderTitleCentered: 'header-with-title-centered',
    HeaderWithTitle: 'header-with-title',
    HeaderWithAddedMarginTop: 'header-with-added-margin-top',
    HeaderWithAddedMarginTopError: 'header-with-added-margin-top__error'
}

const ModalApi = createContext();
ModalApi.displayName = 'ModalApi';

const Modal = props => {
    const mainRef = useRef();
    const [firstFocusableElement, setFirstFocusableElement] = useState('');
    const [lastFocusableElement, setLastFocusableElement] = useState('');

    const getApi = useMemo(() => ({
        onClose: props.onClose,
        closeIcon : props.showCloseIcon && (props.closeIcon || "/content/dam/waters/en/brand-assets/icons/close.svg")
    }), []);

    // Assigns modal elements in state
    useEffect(() => {
        try {
            if (props.isOpen) {
                // Select the modal by it's class
                const modalInnerContainer = document.querySelector('.cmp-modal-box');
                if (modalInnerContainer) {
                    // Get first element to be focused inside modal
                    setFirstFocusableElement(modalInnerContainer.querySelectorAll(props.focusableElements)[0]);
                    const focusableContent = modalInnerContainer.querySelectorAll(props.focusableElements);
                    // Get last element to be focused inside modal
                    setLastFocusableElement(focusableContent[focusableContent.length - 1]);
                    // Focus on first element in modal
                    modalInnerContainer.querySelectorAll(props.focusableElements)[0].focus();
                }
            }
        } catch (err) {
            console.error(err);
        }
    }, [props.isOpen]);

    // Focuses on element inside Modal
    const accessibilityWithinModal = event => {
        // if shift key pressed for shift + tab combination
        if (event.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                // add focus for the last focusable element
                lastFocusableElement.focus();
                event.preventDefault();
            }
        } else if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
            firstFocusableElement.focus(); // add focus for the first focusable element
            event.preventDefault();
        }
    }

    const handleModalKeyDown = event => {
        const keyCode = event.keyCode || event.which || event.key;
        const escapeEntered = keyCode === 27;
        const isModalOpen = document.querySelector(".cmp-modal-box");

        if (isModalOpen && escapeEntered && mainRef.current) {
            mainRef.current.click();
        }

        if(isModalOpen && (event.key === 'Tab' || event.keyCode === 9)) {
            accessibilityWithinModal(event);
        }
    }
    
    const overlayClickToClose = e => {
        e.stopPropagation();
        if (e.target.classList.contains('cmp-modal-box')) {
            return props.onClose();
        } 
    }

    const onClose = () => { 
        FeedbackSurvey.isDisplayed(true);
        domElements.noScroll(false);
    }
    
    const onOpen = () => { 
        // binding the event when the modal is open will prevent
        // other closed modals on the page (if any happen to exist)
        // from binding the same event, which will make them refire the event
        document.addEventListener("keydown", handleModalKeyDown);
        FeedbackSurvey.isDisplayed(false);
        domElements.noScroll(true);
    }
    
    if (!props.isOpen) {
        onClose();
        return <></>;
    }

    onOpen();

    return (
        <ModalPortal>
            <ModalApi.Provider value={getApi}>
                <div ref={mainRef} className={`cmp-modal-box ${props.className ? props.className : ""}`} onClick={overlayClickToClose}>
                    <div className="cmp-modal">
                        {props.children}
                    </div>
                </div>
            </ModalApi.Provider>
        </ModalPortal>
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    showCloseIcon: PropTypes.bool,
    focusableElements: PropTypes.string,
}

Modal.defaultProps = {
    onClose: () => { },
    showCloseIcon: true,
    focusableElements: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
}

const Header = props => {
    const { onClose, closeIcon } = useContext(ModalApi);

    const Icon = () => { 
        if (!props.icon) return <></>;

        return (
            <div className="cmp-modal__title-icon"  data-locator="header-icon">
                <ReactSVG src={props.icon} />
            </div>
        )
    }

    const Title = () => { 
        if (!props.title) return <></>;

        return (
            <div className="cmp-modal__title">
                <Icon/>
                <div className="cmp-modal__title-text" role="heading" aria-label={props.title} data-locator={elementLocator(props.title)}>{props.title}</div>
            </div>
            
        )
    }

    return (
        <div
        className={`cmp-modal__header ${props.title ? keys.HeaderWithTitle : ''} ${props.className ? props.className : ''}` }
        data-locator={props.elementLocator || elementLocator(props.title || props.className)}>
            <Title />
            <button onClick={onClose} className="cmp-modal__close-icon">
                <ReactSVG src={closeIcon} aria-hidden="true" />
            </button>
        </div>
    );
};

Header.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
    elementLocator: PropTypes.string
}

Header.defaultProps = {
    icon: '',
    title: '',
    className: '',
    elementLocator: ''
}

export default Modal;
export { Header, keys, ModalApi as useModalApi }
