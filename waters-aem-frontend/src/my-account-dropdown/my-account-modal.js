import React from 'react';
import MyAccountContainer from './my-account-container';

const ModalClass = 'cmp-modal__information';
const MyAccountModalBody = props => {
    return (
        <div className={ModalClass}>
            <MyAccountContainer config={props.config} />
        </div>
    );
};

export default MyAccountModalBody;
export { ModalClass };
