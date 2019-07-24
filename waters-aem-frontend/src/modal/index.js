import React from 'react';
import ReactSVG from 'react-svg';

class Modal extends React.Component {
    constructor(props) {
        super(props);

        if (props.config) {
            this.setState({
                config: props.config,
            });
        }
    }

    componentWillReceiveProps(props) {
        console.log('component receiving props', props);
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
        this.setState({
            open: false,
            theme: null,
            config: null,
        });
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
                                className={btn.className}
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
                                className={btn.action}
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
                                    className="cmp-modal__btn-main cmp-button--fullWidth"
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
    };

    render() {
        const state = this.state || {};
        if (state.open && state.theme && state.theme.length && state.config) {
            return (
                <div className="cmp-modal">
                    <div className="cmp-modal__box">
                        {this.props.closeIcon && (
                            <div className="cmp-modal__close-icon cmp-utility-button">
                                <ReactSVG src={this.props.closeIcon} />
                            </div>
                        )}

                        {this.shouldRender.title(
                            state.config.title,
                            state.config.icon
                        )}

                        {this.shouldRender.body(
                            state.config.text,
                            state.config.textHeading
                        )}

                        {this.shouldRender.buttons(state.config.buttons)}
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
