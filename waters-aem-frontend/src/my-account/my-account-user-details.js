import React from 'react';

const MyAccountUserDetails = props => {    

    return (
        <>
            <div className="my-account-dropdown__user-details">
                {props.name && (<div className="my-account-dropdown__user-details__name">{props.name}</div>)}
                {props.location && (<div className="my-account-dropdown__user-details__location">{props.location}</div>)}
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