import React from 'react';

const renderUserName = props => {
    return (
        <>
            {props.userName && (
                <div className="my-account-dropdown__user-details__name">
                    {props.userName}
                </div>
            )}
        </>
    );
};

const renderAccountDetails = props => {
    return (
        <>
            {props.accountNumber && props.accountName && (
                <div className="my-account-dropdown__user-details__account">
                    <span className="my-account-dropdown__user-details__account__name">
                        {props.accountName}
                    </span>
                    <span className="my-account-dropdown__user-details__account__number">
                        {props.accountNumber}
                    </span>
                </div>
            )}
        </>
    );
};

const renderSwitchAccountLink = props => {
    return (
        <>
            {props.switchAccount.text && props.switchAccount.url && (
                <a
                    className="my-account-dropdown__user-details__switch-account"
                    href={props.switchAccount.url}
                >
                    {props.switchAccount.text}
                </a>
            )}
        </>
    );
};

const MyAccountUserDetails = props => {
    return (
        <>
            <div className="my-account-dropdown__user-details">
                {renderUserName(props)}
                {renderAccountDetails(props)}
                {renderSwitchAccountLink(props)}
            </div>
            <hr className="my-account-dropdown__hr" />
        </>
    );
};

export default MyAccountUserDetails;
export const funcs = {
    renderUserName,
    renderAccountDetails,
    renderSwitchAccountLink
};
