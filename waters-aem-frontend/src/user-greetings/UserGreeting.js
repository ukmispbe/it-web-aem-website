import React from 'react';
import ReactSVG from 'react-svg';

import SessionStore from '../stores/sessionStore';

function UserGreeting(props) {
    const { greetings, logoDirectoryPath, showName, showLogo } = props;
    const store = new SessionStore();
    const savedUserDetails = store.getUserDetails();
    return (
        <>
            <div className="greetings">
                <div className="greeting">{greetings}</div>
                {showName && <div className="name">{`${savedUserDetails.firstName} ${savedUserDetails.lastName}`}</div>}
                <div className="company">{savedUserDetails.company}</div>
            </div>
            {showLogo &&
                <ReactSVG
                    src={`${logoDirectoryPath}/${savedUserDetails.company.trim().replace(/ /g, '-').toLowerCase()}.svg`}
                    alt={savedUserDetails.company}
                    className="logo"
                />
            }
        </>
    );
}

export default UserGreeting;