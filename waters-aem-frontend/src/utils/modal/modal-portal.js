import React, { useState, useRef} from "react";
import ReactDOM from "react-dom";

const ModalPortal = props => {
    const modalElement = document.getElementById("modal-root");
    const el = useRef(document.createElement('div'));
    const [dynamic] = useState(!el.current.parentElement); 

    React.useEffect(() => {
        if (dynamic) { 
            modalElement.appendChild(el.current);
        }

        return () => {
            if (dynamic && el.current.parentElement) {
                modalElement.removeChild(el.current);
            }
        };
    }, []);

    return ReactDOM.createPortal(props.children, el.current);
};

export default React.memo(ModalPortal);