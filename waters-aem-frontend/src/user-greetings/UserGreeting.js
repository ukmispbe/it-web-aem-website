import React from 'react';
import ReactSVG from 'react-svg';

import SessionStore from '../stores/sessionStore';

function UserGreeting(props) {
    const { greetings, logoDirectoryPath } = props;
    const store = new SessionStore();
    const savedUserDetails = store.getUserDetails();
    const name = `${savedUserDetails.firstName || ''} ${savedUserDetails.lastName || ''}`;
    return (
        <>
            <div className="greetings">
                <h2>{greetings}</h2>
                <h3>{name.trim()}</h3>
                <h4>{savedUserDetails.company}</h4>
            </div>
            <ReactSVG
                src={`${logoDirectoryPath.replace(/\/$/, '')}/${savedUserDetails.company.trim().replace(/ /g, '-').toLowerCase()}.svg`}
                alt={savedUserDetails.company || ''}
                className="logo"
            />
        </>
    );
}

UserGreeting.defaultProps = {
    greetings: '',
    logoDirectoryPath: ''
};

export default UserGreeting;