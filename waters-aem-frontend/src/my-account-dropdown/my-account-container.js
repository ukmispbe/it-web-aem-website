import React from 'react';
import ReactSVG from 'react-svg';
import { signOutRequest } from './services';
import MyAccountUserDetails from './my-account-user-details';
import MyAccountItemList from './my-account-item-list';
import SessionStore from '../stores/sessionStore';
import { setClickAnalytics } from "../analytics";
import { isEprocurementUserRole } from '../utils/userFunctions';

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
        const store = new SessionStore();
        store.setSignInRedirect(window.location.href);
        setClickAnalytics('Account Dropdown', signIn.linkName, signIn.url);
        window.location.href = signIn.url;
    }

    const onSignOut = (e) => {
        e.preventDefault();
        setClickAnalytics('Account Dropdown', signOut.linkName, signOut.url);
        signOutRequest(signOut.signOutEndpoint,signOut.url, homepageLink);
    }

    const filterItemList = (list) => list.filter((item) => !(item.isHiddenForEprocUser === "true" && isEprocurementUserRole()));

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
                    <a
                        class="cmp-button"
                        href={createAccount.url}
                        onClick={(e)=>setClickAnalytics('Account Dropdown', createAccount.linkName, createAccount.url)}
                    >
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
            {itemList && <MyAccountItemList itemList={filterItemList(itemList)} />}
            {signInOutLink()}
            {!loginState && createAccountButton()}
        </div>
    );
};

export default MyAccountContainer;
export { keys };
