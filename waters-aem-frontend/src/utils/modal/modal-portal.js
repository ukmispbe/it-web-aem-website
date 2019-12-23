import React, { useEffect} from "react";
import ReactDOM from "react-dom";

const ModalPortal = props => {
    const modalElement = document.getElementById("modal-root");
    const el = document.createElement("div");

    useEffect(() => {
        modalElement.appendChild(el);

        return () => {
            modalElement.removeChild(el);
        };
    }, []);

    return ReactDOM.createPortal(props.children, el);
};

export default ModalPortal;