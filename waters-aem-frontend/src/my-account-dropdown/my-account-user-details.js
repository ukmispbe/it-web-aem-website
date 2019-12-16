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
            {(props.accountName || props.accountNumber) && (
                <div className="my-account-dropdown__user-details__account">
                    {props.accountName && (
                            <span className="my-account-dropdown__user-details__account__name">
                                {props.accountName}
                            </span>
                    )}
                    {props.accountNumber && (
                        <span className="my-account-dropdown__user-details__account__number">
                            {props.accountNumber}
                        </span>
                    )}
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
