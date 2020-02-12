import React from 'react';
import ReactSVG from 'react-svg';
import { signOutRequest } from './services';
import MyAccountUserDetails from './my-account-user-details';
import MyAccountItemList from './my-account-item-list';

const keys = {
    MyAccountContainer : 'my-account-dropdown'
}

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
        userDetails,
        homepageLink
    } = props.config;

    const {
        userName,
        accountName,
        accountNumber
    } = userDetails;

    const onSignIn = (e) => {
        e.preventDefault();
        window.sessionStorage.setItem('signInRedirect', window.location.href);
        window.location.href = signIn.url;
    }

    const onSignOut = (e) => {
        e.preventDefault();
        signOutRequest(signOut.signOutEndpoint, homepageLink);
    }

    const signInOutLink = () => (
        <>
            {signOut.url && signIn.url && (
                <>
                    <a
                        className="my-account-dropdown__sign-in-out"
                        href={loginState ? signOut.url : signIn.url}
                        {...(!loginState && { onClick: (e)=>onSignIn(e), rel: 'nofollow' })}
                        {...(loginState && { onClick: (e)=>onSignOut(e) })}
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
        <div className={keys.MyAccountContainer}>
            {loginState && (
                <MyAccountUserDetails
                    userName={userName}
                    accountName={accountName}
                    accountNumber={accountNumber}
                    switchAccount={switchAccount}
                />
            )}
            {loginState && itemList && <MyAccountItemList itemList={itemList} />}
            {signInOutLink()}
            {!loginState && createAccountButton()}
        </div>
    );
};

export default MyAccountContainer;
export { keys };
