import React from "react";

const ModalPortal = jest.fn((props) => {
    return (
        <>{props.children}</>
    )
});

export default ModalPortal;