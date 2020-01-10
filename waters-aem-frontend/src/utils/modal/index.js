import React, { createContext, useContext, useMemo } from "react";
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import ModalPortal from './modal-portal';
import FeedbackSurvey from '../../scripts/feedbackSurvey';
import domElements from '../../scripts/domElements';

const keys = {
    ModalWithSiteNavOnMobile: 'cmp-modal-box__site-nav-on-mobile',
    HeaderTitleCentered: 'header-with-title-centered',
    HeaderWithTitle: 'header-with-title',
    HeaderWithAddedMarginTop: 'header-with-added-margin-top'
}

const ModalApi = createContext();
ModalApi.displayName = 'ModalApi';

const Modal = props => {
    const getApi = useMemo(() => ({
        onClose: props.onClose,
        closeIcon : props.closeIcon || "/content/dam/waters/en/brand-assets/icons/close.svg"
    }), []);

    const handleModalKeyDown = event => {
        event.stopPropagation();
        event.preventDefault();
        
        const keyCode = event.keyCode || event.which || event.key;
        const escapeEntered = keyCode === 27;
        const isModalOpen = document.querySelector(".cmp-modal-box");

        if (isModalOpen && escapeEntered) {
            // the event listener is no longer needed since the modal will close
            document.removeEventListener("keydown", handleModalKeyDown);
            props.onClose();
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
                <div className={`cmp-modal-box ${props.className ? props.className : ""}`} onClick={overlayClickToClose}>
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
    isOpen: PropTypes.bool.isRequired
}
  
Modal.defaultProps = {
    onClose: () => { }
}

const Header = props => {
    const { onClose, closeIcon } = useContext(ModalApi);

    const Icon = () => { 
        if (!props.icon) return <></>;

        return (
            <div className="cmp-modal__title-icon">
                <ReactSVG src={props.icon} />
            </div>
        )
    }

    const Title = () => { 
        if (!props.title) return <></>;

        return (
            <div className="cmp-modal__title">
                <Icon/>
                <div className="cmp-modal__title-text">{props.title}</div>
            </div>
            
        )
    }

    return (
        <div className={`cmp-modal__header ${props.title ? keys.HeaderWithTitle : ''} ${props.className ? props.className : ''}` }>
            <Title />
            <div className="cmp-modal__close-icon">
                <ReactSVG
                    onClick={onClose}
                    src={closeIcon} />
            </div>
        </div>
    );
};

Header.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string
}

export default Modal;
export { Header, keys, ModalApi as useModalApi }
