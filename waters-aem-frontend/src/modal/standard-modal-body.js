import React from 'react';
import PropTypes from 'prop-types';

class StandardModalBody extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldRender = {
        body: (text, textHeading, partNumberLabel) => {
            if (text || textHeading) {
                return (
                    <div className="cmp-modal__information">
                        {textHeading && (
                            <div className="cmp-modal__information-header">
                                {partNumberLabel}&nbsp;{textHeading}
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
                                onClick={() => this.props.closeModal()}
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
        }
    }

    render() {
        let modalBody = this.shouldRender.body( this.props.config.text, this.props.config.textHeading, this.props.config.partNumberLabel);
        let buttons = this.shouldRender.buttons(this.props.config.buttons);
    
        return (
            <>
                
                {modalBody} 
                {buttons}
            </>
        )
    }
}

StandardModalBody.propTypes = {
    config: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default StandardModalBody;