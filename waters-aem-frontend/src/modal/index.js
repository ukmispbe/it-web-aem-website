import React from 'react';
import ReactSVG from 'react-svg';
import MyAccountModalBody from '../my-account-dropdown/my-account-modal-body';
import StandardModalBody from './standard-modal-body';
import ErrorMessages from '../scripts/ErrorMessages';

class Modal extends React.Component {
    constructor(props) {
        super(props);

        if (props.config && props.open && props.theme && props.toggleModal) {
            this.state = {
                open: props.open,
                config: props.config,
                theme: props.theme,
                errorObj: this.props.errorObj
            };
        }

        this.closeModal = this.closeModal.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            open: props.open,
            config: props.config,
            theme: props.theme,
            errorObj: this.props.errorObj
        });
    }

    showModal = (theme, config) => {
        if (theme && config) {
            this.setState({
                open: true,
                theme,
                config,
            });
        } else if (this.state.config) {
            this.setState({
                open: true,
            });
        }
    };

    closeModal = () => {
        if (this.props.toggleModal) {
            this.props.toggleModal();

            this.setState({
                theme: null,
                config: null,
                errorObj: null
            });
        } else {
            this.setState({
                open: false,
                theme: null,
                config: null,
                errorObj: null
            });
        }
    };

    shouldRender = {
        title: (title, icon) => {

            if (this.state.errorObj && this.state.errorObj.ok === false) {
                title = ErrorMessages.ErrorMessages(this.props.errorObj).anErrorHasOccurred;
                icon = ErrorMessages.ErrorMessages(this.props.errorObj).modalImage;
            }
            if (title) {
                return (
                    <div className="cmp-modal__title">
                        {icon && (
                            <div className="cmp-modal__title-icon">
                                <ReactSVG src={icon} />
                            </div>
                        )}
                        <div className={`cmp-modal__title-text ${this.state.config.screenReader ? "screen-reader-text" : ""}`}>{title}</div>
                    </div>
                );
            } else {
                return null;
            }
        }
    };

    theme = state => {
        if (state.theme == 'account-dropdown') {
            return (
                <MyAccountModalBody list={state.config.list}/>
            )
        } else {

            if (this.state.errorObj && this.state.errorObj.ok === false) {
                const newConfig = Object.assign({}, state.config);
                newConfig.text = ErrorMessages.ErrorMessages(this.props.errorObj).wereSorry;
                newConfig.textHeading = '';
                newConfig.buttons = [];

                return (
                    <StandardModalBody config={newConfig} closeModal={this.closeModal} />
                )
            }
            else {
                return (
                    <StandardModalBody config={{
                        ...state.config,
                        partNumberLabel: this.props.partNumberLabel
                    }} closeModal={this.closeModal} />
                )
            }

        }
    };

    render() {
        const state = this.state || {};
        if (state.open && state.theme && state.theme.length && state.config) {
            return (
                <div
                    className={"cmp-modal-box " + this.state.theme}
                    onClick={e => {
                        e.stopPropagation();
                        if (e.target.classList.contains('cmp-modal-box')) {
                            return this.closeModal();
                        } else {
                            return false;
                        }
                    }}
                >
                    <div className={"cmp-modal " + this.state.theme}>
                        <div className="cmp-modal__box ">
                            {state.config.closeIcon && (
                                <div className="cmp-modal__close-icon">
                                    <ReactSVG
                                        onClick={() => this.closeModal()}
                                        src={state.config.closeIcon}
                                    />
                                </div>
                            )}

                            {this.shouldRender.title(
                                state.config.title,
                                state.config.icon
                            )}

                            { this.theme(state)}

                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

/**
 * This container class is only used to expose the modal class methods on the window
 */
class ModalContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal {...this.props} ref={modal => (window.cmp.modal = modal)} />
        );
    }
}

export default ModalContainer;
export { Modal };