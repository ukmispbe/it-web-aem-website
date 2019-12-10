import React from 'react';
import ReactSVG from 'react-svg';

import UserDetails from './my-account-user-details';
import ItemList from './my-account-item-list';

const MyAccountDropDown = props => {
    const {
        createAccount,
        icon,
        itemList,
        notRegistered,
        signIn,
        signOut,
        switchAccount,
        loginStatus
    } = props.config;
    const {
        state: loginState,
        userName,
        accountName,
        accountNumber
    } = loginStatus;

    const signInOutLink = () => (
        <>
            {signOut.url && signOut.text && signIn.url && signIn.text && (
                <>
                    <a
                        className="my-account-dropdown__sign-in-out"
                        href={loginState ? signOut.url : signIn.url}
                    >
                        <ReactSVG src={icon} className="sign-in-out__icon" />
                        {loginState ? signOut.text : signIn.text}
                    </a>
                </>
            )}
        </>
    );

    const createAccountButton = () => (
        <>
            {notRegistered && createAccount.url && createAccount.text && (
                <div className="my-account-dropdown__create-account">
                    {notRegistered}
                    <a class="cmp-button" href={createAccount.url}>
                        {createAccount.text}
                    </a>
                </div>
            )}
        </>
    );

    return (
        <div className="my-account-dropdown">
            {loginState && (
                <UserDetails
                    userName={userName}
                    accountName={accountName}
                    accountNumber={accountNumber}
                    switchAccount={switchAccount}
                />
            )}
            {itemList && <ItemList itemList={itemList} />}
            {signInOutLink()}
            {!loginState && createAccountButton()}
        </div>
    );
};

export default MyAccountDropDown;
