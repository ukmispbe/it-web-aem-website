import React from 'react';
import MyAccountDropDown from './my-account-dropdown';

const MyAccountModalBody = props => {              
    return (
        <div className="cmp-modal__information">
            <MyAccountDropDown config={props.config} />
        </div>
    );
    
}

export default MyAccountModalBody;