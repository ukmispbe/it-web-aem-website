import React from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import ReactSVG from 'react-svg';

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
  
const Modal = props => {
    if (!props.isOpen) {
        return <></>;
    }

    return (
        <ModalPortal>
            <div className="cmp-modal-box">
                <div className="cmp-modal">
                    <div className="cmp-modal__box cmp-modal__header">
                        <div className="cmp-modal__close-icon">
                            <ReactSVG
                                onClick={props.onClose}
                                src="/content/dam/waters/en/brand-assets/icons/close.svg"/>
                        </div>
                    </div>
                    {props.children}
                </div>
            </div>
        </ModalPortal>
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired
}

Modal.defaultProps = {
    onClose: () => {}
}
  
export default Modal;