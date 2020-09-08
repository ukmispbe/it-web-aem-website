import React from 'react';
import SessionStore from '../stores/sessionStore';

function UserGreeting(props) {
    const { greetings, logoDirectoryPath } = props;
    const store = new SessionStore();
    const savedUserDetails = store.getUserDetails();
    const name = `${savedUserDetails.firstName || ''} ${savedUserDetails.lastName || ''}`;
    const company = savedUserDetails.company || '';
    const [isImageHidden, hideCompanyImageOnError] = useState(false);
    return (
        <>
            <div className="greetings" data-locator="user-greeting-sec">
                <h2 data-locator="user-greeting">{greetings}</h2>
                <h3 data-locator="user-greeting-name">{name.trim()}</h3>
                <h4 data-locator="user-greeting-company">{company}</h4>
            </div>
            {!isImageHidden && <img
                src={`${logoDirectoryPath.replace(/\/$/, '')}/${company.trim().replace(/ /g, '-').toLowerCase()}.png`}
                alt={company}
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