import React from 'react';
import MyAccountDropDown from './my-account-dropdown';

const ModalClass = 'cmp-modal__information';
const MyAccountModalBody = props => {
    return (
        <div className={ModalClass}>
            <MyAccountDropDown config={props.config} />
        </div>
    );
};

export default MyAccountModalBody;
export { ModalClass };
