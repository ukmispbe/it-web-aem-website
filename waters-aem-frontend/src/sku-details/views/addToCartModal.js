import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ErrorMessages from '../../scripts/ErrorMessages';
import { useModalApi } from '../../utils/modal'
import { elementLocator } from '../../utils/eCommerceFunctions';

const keys = {
    AddToCartPrefix: 'cmp-atc-modal',
    InfoTextWrapper: `cmp-atc-modal__information`,
    TextHeading: `cmp-atc-modal__information-header`,
    Text: `cmp-atc-modal__information-text`,
    ErrorText: `cmp-atc-modal__information-text error`,
    ButtonWrapper: 'cmp-atc-modal__btn',
    AltButton: `cmp-button cmp-atc-modal__btn-alt`,
    MainButton: `cmp-button cmp-atc-modal__btn-main`,
    FullWidthButton: `cmp-button--fullWidth`
}

const AddToCartModalBody = props => {
    
    const errorObjCart = props.errorObjCart;

    const [state] = useState({ ...props.config })
    const { onClose } = useContext(useModalApi);

    const {
        text,
        textHeading,
        partNumberLabel,
        buttons,
        isOrderDetails
    } = state;

    const InfoTextWrapper = (props) => { 
        if (!isOrderDetails){
            if (!text || !textHeading) return <></>;
        }
        else {
            if (!text) return <></>;
        }
        

        return (
            <div className={keys.InfoTextWrapper}>
                { props.children }
            </div>
        );
    }

    const TextHeading = () => { 
        if (!textHeading) return <></>;
    
        return (
            <div className={keys.TextHeading}>
                {partNumberLabel}&nbsp;{textHeading}
            </div>
        );
    }

    const Text = (props) => { 
        if (!props.text) return <></>;
    
        return (
            <div className={props.className} data-locator='modal-information-text'>
                {props.text}
            </div>
        );
    }

    const buttonType = btn => {
        if (btn.action === 'close') {
            if (!onClose) return <></>;

            return (
                <button
                    onClick={() => onClose()}
                    className={keys.AltButton}
                    data-locator={elementLocator(btn.text)}
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
                    className={keys.MainButton}
                    target={btn.target || ''}
                    {...(btn.callback && { onClick: (e)=>btn.callback(e) })}
                    data-locator={elementLocator(btn.text)}
                    role="button"
                >
                    {btn.text}
                </a>
            );
        }
    };

    const Buttons = () => { 
        if (!buttons) return <></>;
    
        return (
            <div className={keys.ButtonWrapper}>
                {buttons.map((btn, index) => {
                    return (
                        <div
                            className={keys.FullWidthButton}
                            key={`modal-btn-${index}`}
                            data-locator={`modal-btn-${index}`}
                        >
                            {btn.text ? buttonType(btn) : null}
                        </div>
                    );
                })}
            </div>
        );
    }

    const Error = () => { 
        return (
            <InfoTextWrapper>
                <Text className={keys.ErrorText} text={ErrorMessages.ErrorMessages(errorObjCart).wereSorry}></Text>
            </InfoTextWrapper>
        );
    }

    const Body = () => {
        return (
            <>
                <InfoTextWrapper>
                    <TextHeading></TextHeading>
                    <Text className={keys.Text} text={text}></Text>
                </InfoTextWrapper>
                <Buttons></Buttons>
            </>
        );
    }

    return (
        <>
            {errorObjCart && errorObjCart.ok === false ? <Error/> : <Body />}
        </>
    )
}

AddToCartModalBody.propTypes = {
    config: PropTypes.object.isRequired,
    errorObjCart: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

AddToCartModalBody.whyDidYouRender = true

export default AddToCartModalBody;