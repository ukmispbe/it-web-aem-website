
import React from 'react';
import ReactSVG from 'react-svg';

import UserDetails from './my-account-user-details';
import List from './my-account-list';


const MyAccountDropDown = props => {    

    const { createAccount, icon, list, notRegistered, signIn, signOut, switchAccount, loginStatus } = props.config;
    const { state:loginState, name:userName, location:userLocation } = loginStatus;

    const signInOutLink = () => (<>
        <a className="my-account-dropdown__sign-in-out" href={loginState ? signOut.url : signIn.url}>
            <ReactSVG
                src={icon}
                className="sign-in-out__icon"
            />
            {loginState ? signOut.text : signIn.text}
        </a>
    </>)
    
    const createAccountButton = () => (<>        
        {notRegistered && createAccount.url && createAccount.text && (
            <div className="my-account-dropdown__create-account">
                {notRegistered}
                <a class="cmp-button" href={createAccount.url}>{createAccount.text}</a>
            </div>
        )}
    </>);

    return (
        <div className="my-account-dropdown">
            {loginState &&
                <UserDetails
                    name={userName}
                    switchAccount={switchAccount}
                    location={userLocation}
                />
            }
            {list &&
                <List
                    listItems={list}
                /> 
            }

            {signInOutLink()}
            {!loginState && createAccountButton()}
        </div>
    )

};

export default MyAccountDropDown;


    
    