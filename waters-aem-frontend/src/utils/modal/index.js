import React from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import ReactSVG from 'react-svg';
import FeedbackSurvey from '../../scripts/feedbackSurvey';
import domElements from '../../scripts/domElements';

const keys = {
    ModalWithSiteNavOnMobile: 'cmp-modal-box__site-nav-on-mobile',
    HeaderTitleCenteredOnDesktop: 'header-with-title-centered-tablet-and-over',
    HeaderWithTitle: 'header-with-title'
}

const ModalPortal = props => {
    const modalElement = document.getElementById("modal-root");
    const el = document.createElement("div");

    React.useEffect(() => {
        modalElement.appendChild(el);

        return () => {
        modalElement.removeChild(el);
        };
    }, []);

    return ReactDOM.createPortal(props.children, el);
};

const onClose = ()=> { 
    FeedbackSurvey.isDisplayed(true);
    domElements.noScroll(false);
}

const onOpen = ()=> { 
    FeedbackSurvey.isDisplayed(false);
    domElements.noScroll(true);
}

const Modal = props => {
    if (!props.isOpen) {
        onClose();
        return <></>;
    }

    onOpen();
    
    return (
        <ModalPortal>
            <div className={`cmp-modal-box ${props.className ? props.className : ""}`}>
                <div className="cmp-modal">
                    {props.children}
                </div>
            </div>
        </ModalPortal>
    );
};


const Header = props => {

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
        <div className={`cmp-modal__header ${props.title ? keys.HeaderWithTitle : ""} ${props.className}` }>
            <Title/>
            <div className="cmp-modal__close-icon">
                <ReactSVG
                    onClick={props.onClose}
                    src="/content/dam/waters/en/brand-assets/icons/close.svg"/>
            </div>
        </div>
    );
};

Header.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired
}
  
Header.defaultProps = {
    onClose: () => { }
}

export default Modal;
export { Header, keys }