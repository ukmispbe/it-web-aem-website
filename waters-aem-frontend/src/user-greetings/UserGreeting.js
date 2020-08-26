import React from 'react';
import SessionStore from '../stores/sessionStore';
import { elementLocator } from '../utils/eCommerceFunctions';

function UserGreeting(props) {
    const { greetings, logoDirectoryPath } = props;
    const store = new SessionStore();
    const savedUserDetails = store.getUserDetails();
    const name = `${savedUserDetails.firstName || ''} ${savedUserDetails.lastName || ''}`;
    const company = savedUserDetails.company || '';
    return (
        <>
            <div className="greetings" data-locator="user-greeting">
                <h2 data-locator="greeting">{greetings}</h2>
                <h3 data-locator="name">{name.trim()}</h3>
                <h4 data-locator="company">{company}</h4>
            </div>
            <img
                src={`${logoDirectoryPath.replace(/\/$/, '')}/${company.trim().replace(/ /g, '-').toLowerCase()}.png`}
                alt={company || ''}
                className="logo"
                data-locator={elementLocator(company || 'company logo')}
            />
        </>
    );
}

UserGreeting.defaultProps = {
    greetings: '',
    logoDirectoryPath: ''
};

export default UserGreeting;