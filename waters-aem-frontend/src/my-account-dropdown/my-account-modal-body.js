import React from 'react';
import MyAccountDropDownList from './my-account-dropdown-list';

const MyAccountModalBody = props => { 
    if (props.list) {              
        return (
            <div className="cmp-modal__information">
                <ul className="account-dropdown dropdown__list">
                    <MyAccountDropDownList
                        listItems={props.list}
                    /></ul>
            </div>
        );
    } else {
        return null;
    }
}

export default MyAccountModalBody;