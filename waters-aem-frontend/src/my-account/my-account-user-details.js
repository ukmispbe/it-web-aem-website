import React from 'react';

const MyAccountUserDetails = props => {    

    return (
        <>
            <div className="my-account-dropdown__user-details">
                {props.userName && (<div className="my-account-dropdown__user-details__name">{props.userName}</div>)}
                {props.accountNumber && props.accountName && (<div className="my-account-dropdown__user-details__account">
                    <span className="my-account-dropdown__user-details__account__name">{props.accountName}</span>
                    <span className="my-account-dropdown__user-details__account__number">{props.accountNumber}</span>
                </div>)}
                {props.switchAccount.text && props.switchAccount.url && (
                    <a className="my-account-dropdown__user-details__switch-account" href={props.switchAccount.url} >
                        {props.switchAccount.text}
                    </a>
                )}
            </div>
            <hr className="my-account-dropdown__hr" />
        </>
    );
};

export default MyAccountUserDetails;