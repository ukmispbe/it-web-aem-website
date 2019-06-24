import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    resetErrorBoundaryToFalse() {
        this.setState({
            hasError: false,
        });

        const notification = document.querySelector(
            '.cmp-notification--dynamic.cmp-notification--error'
        );

        notification.classList.remove('error');
    }

    setErrorBoundaryToTrue() {
        const notification = document.querySelector(
            '.cmp-notification--dynamic.cmp-notification--error'
        );

        notification.classList.add('error');

        this.setState({
            hasError: true,
        });
    }

    render() {
        return (
            <>
                {React.cloneElement(this.props.children, {
                    hasError: this.state.hasError,
                    resetErrorBoundaryToFalse: this.resetErrorBoundaryToFalse.bind(
                        this
                    ),
                    setErrorBoundaryToTrue: this.setErrorBoundaryToTrue.bind(
                        this
                    ),
                })}
            </>
        );
    }
}

export default ErrorBoundary;
