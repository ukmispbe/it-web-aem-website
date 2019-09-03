import React from 'react';
import ReactSVG from 'react-svg';
import AccountDropDownList from '../account-dropdown/account-dropdown-list';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        
        if (props.config && props.open && props.theme && props.toggleModal) {
            this.state = {
                open: props.open,
                config: props.config,
                theme: props.theme,
            };
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            open: props.open,
            config: props.config,
            theme: props.theme,
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
            });
        } else {
            this.setState({
                open: false,
                theme: null,
                config: null,
            });
        }
    };

    shouldRender = {
        title: (title, icon) => {
            if (title) {
                return (
                    <div className="cmp-modal__title">
                        {icon && (
                            <div className="cmp-modal__title-icon">
                                <ReactSVG src={icon} />
                            </div>
                        )}
                        <div className="cmp-modal__title-text">{title}</div>
                    </div>
                );
            } else {
                return null;
            }
        },
        body: (text, textHeading) => {
            if (text || textHeading) {
                return (
                    <div className="cmp-modal__information">
                        {textHeading && (
                            <div className="cmp-modal__information-header">
                                {textHeading}
                            </div>
                        )}
                        {text && (
                            <div className="cmp-modal__information-text">
                                {text}
                            </div>
                        )}
                    </div>
                );
            } else {
                return null;
            }
        },
        buttons: buttons => {
            if (buttons.length) {
                const determineButtonType = btn => {
                    if (btn.action === 'close') {
                        return (
                            <button
                                onClick={() => this.closeModal()}
                                className="cmp-button cmp-modal__btn-alt"
                            >
                                {btn.text}
                            </button>
                        );
                    } else if (
                        btn.action.indexOf('://') >= 0 ||
                        btn.action.indexOf('.com') >= 0
                    ) {
                        return (
                            <a
                                href={btn.action}
                                className="cmp-button cmp-modal__btn-main"
                                target={btn.target || ''}
                            >
                                {btn.text}
                            </a>
                        );
                    }
                };
                return (
                    <div className="cmp-modal__btn">
                        {buttons.map((btn, index) => {
                            return (
                                <div
                                    className="cmp-button--fullWidth"
                                    key={`modal-btn-${index}`}
                                >
                                    {btn.text ? determineButtonType(btn) : null}
                                </div>
                            );
                        })}
                    </div>
                );
            } else {
                return null;
            }
        },
        list: list => {
            if (list) {
                const listItems = AccountDropDownList(list);

                return (
                    <div className="cmp-modal__information">
                        <ul className="account-dropdown dropdown__list">{listItems}</ul>
                    </div>
                );
            } else {
                return null;
            }
        }
    };

    theme = state => {
        if (state.theme == 'account-dropdown') {

            let modalBody = this.shouldRender.list(
                state.config.list
            );

            return (
                <>
                   {modalBody}
                </>
            )
        } else {           
            let modalBody = this.shouldRender.body(
                state.config.text,
                state.config.textHeading
            );
            let buttons = this.shouldRender.buttons(state.config.buttons);

            return (
                <>
                    {modalBody} 
                    {buttons}
                </>
            )
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
