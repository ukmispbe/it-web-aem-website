import React, { useState } from 'react';

import SessionStore from '../stores/sessionStore';
import { getCompanyLogo, htmlParser } from '../utils/eCommerceFunctions';


function UserGreeting(props) {
    const { greetings, logoDirectoryPath } = props;
    const store = new SessionStore();
    const savedUserDetails = store.getUserDetails();
    const name = `${savedUserDetails.firstName || ''} ${savedUserDetails.lastName || ''}`;
    const company = savedUserDetails.company || '';
    const [isImageHidden, hideCompanyImageOnError] = useState(false);
    const srcLogo = getCompanyLogo(logoDirectoryPath, htmlParser(company));

    return (
        <>
            <div className="greetings" data-locator="user-greeting-sec">
                <h2 data-locator="user-greeting">{greetings}</h2>
                <h3 data-locator="user-greeting-name">{htmlParser(name)}</h3>
                <h4 data-locator="user-greeting-company">{htmlParser(company)}</h4>
            </div>
            {!isImageHidden && <img
                src={srcLogo}
                alt={htmlParser(company)}
                className="logo"
                data-locator="user-greeting-logo"
                onError={() => hideCompanyImageOnError(true)}
            />}
        </>
    );
}

UserGreeting.defaultProps = {
    greetings: '',
    logoDirectoryPath: ''
};

export default UserGreeting;