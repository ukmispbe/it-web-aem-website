import React from 'react';
import ReactSVG from 'react-svg';

import MyAccountUserDetails from './my-account-user-details';
import MyAccountItemList from './my-account-item-list';

const MyAccountContainer = props => {
    const {
        createAccount,
        icon,
        itemList,
        notRegistered,
        signIn,
        signOut,
        switchAccount,
        loginState,
        userDetails
    } = props.config;

    const {
        userName,
        accountName,
        accountNumber
    } = userDetails;

    const signInOutLink = () => (
        <>
            {signOut.url && signIn.url && (
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
                <MyAccountUserDetails
                    userName={userName}
                    accountName={accountName}
                    accountNumber={accountNumber}
                    switchAccount={switchAccount}
                />
            )}
            {itemList && <MyAccountItemList itemList={itemList} />}
            {signInOutLink()}
            {!loginState && createAccountButton()}
        </div>
    );
};

export default MyAccountContainer;
