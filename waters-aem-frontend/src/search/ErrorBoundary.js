import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, hasErrored: false };
    }

    resetErrorBoundaryToFalse() {
        this.setState({
            hasError: false
        });
    }

    removeNotifications() {
        this.setState(
            {
                hasError: false,
                hasErrored: false
            },
            () => {
                const notifications = document.querySelectorAll(
                    '.cmp-notification--dynamic[class*=cmp-notification--]'
                );
                [...notifications].forEach(notification => {
                    if (notification) {
                        notification.classList.remove('error');
                    }
                });
            }
        );
    }

    setErrorBoundaryToTrue(response) {

        const status = response.hasOwnProperty('code') ? response.code : "";
        const notification = document.querySelector(
            '.cmp-notification--dynamic.cmp-notification--error' + status
        );

        if (notification) {
            notification.classList.add('error');
        }

        this.setState({
            hasError: true,
            hasErrored: true
        });
    }

    render() {
        return (
            <>
                {React.cloneElement(this.props.children, {
                    hasError: this.state.hasError,
                    hasErrored: this.state.hasErrored,
                    resetErrorBoundaryToFalse: this.resetErrorBoundaryToFalse.bind(
                        this
                    ),
                    setErrorBoundaryToTrue: this.setErrorBoundaryToTrue.bind(
                        this
                    ),
                    removeNotifications: this.removeNotifications.bind(this)
                })}
            </>
        );
    }
}

export default ErrorBoundary;
