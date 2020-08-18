import React from 'react';
import ReactSVG from 'react-svg';

import SessionStore from '../stores/sessionStore';

function UserGreeting(props) {
    const { greetings, logoDirectoryPath } = props;
    const store = new SessionStore();
    const savedUserDetails = store.getUserDetails();
    const name = `${savedUserDetails.firstName || ''} ${savedUserDetails.lastName || ''}`;
    const company = savedUserDetails.company || '';
    return (
        <>
            <div className="greetings">
                <h2>{greetings}</h2>
                <h3>{name.trim()}</h3>
                <h4>{company}</h4>
            </div>
            <ReactSVG
                src={`${logoDirectoryPath.replace(/\/$/, '')}/${company.trim().replace(/ /g, '-').toLowerCase()}.png`}
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