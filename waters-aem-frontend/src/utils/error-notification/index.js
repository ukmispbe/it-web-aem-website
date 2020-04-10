import React from 'react';
import ReactSVG from 'react-svg';

const ErrorNotification = ({icon, title, text}) => {
    return (
        <div class="notification cmp-notification--error cmp-notification--dynamic error">
            <div class="cmp-notification-wrapper">
                <div class="cmp-notification-icon">
                    <ReactSVG src={icon} />
                </div>
                <div class="cmp-notification-body">
                    <div class="cmp-notification-title">{title}</div>
                    <div class="cmp-notification-description">{text}</div>
                </div>
            </div>
        </div>
    )
}

export default ErrorNotification;