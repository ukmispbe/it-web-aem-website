import React from 'react';

const statusCodes = {
    captcha: 802
};

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false, hasErrored: false };
    }

    resetErrorBoundaryToFalse() {
        this.setState({
            hasError: false,
        });
    }

    removeNotification() {
        this.setState(
            {
                hasError: false,
                hasErrored: false,
            },
            () => {
                const notification = document.querySelector(
                    '.cmp-notification--dynamic.cmp-notification--error'
                );

                notification.classList.remove('error');
            }
        );
    }

    setErrorBoundaryToTrue(response) {
        // Display captcha server error in a different notification component
        const classname = (response && response.status === statusCodes.captcha) ? 'captcha' : 'error';

        const notification = document.querySelector(
            '.cmp-notification--dynamic.cmp-notification--' + classname
        );

        notification.classList.add('error');

        this.setState({
            hasError: true,
            hasErrored: true,
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
                    removeNotification: this.removeNotification.bind(this),
                })}
            </>
        );
    }
}

export default ErrorBoundary;
