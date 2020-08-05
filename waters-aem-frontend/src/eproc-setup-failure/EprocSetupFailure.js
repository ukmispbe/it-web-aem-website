import React from 'react';
import PropTypes from 'prop-types';

import Modal, { Header, keys } from '../utils/modal';
import AddToCartBody from '../sku-details/views/addToCartModal';
import './styles/index.scss';

function EprocSetupFailure(props) {
    const { status, title, text, icon, buttons } = props;
    return (
        <Modal isOpen={status} onClose={() => { }} className='cmp-add-to-cart-modal' showCloseIcon={false}>
            <Header
                title={title}
                icon={icon}
                className={keys.HeaderWithAddedMarginTopError}
            />
            <AddToCartBody
                config={{
                    isOrderDetails: true,
                    textHeading: '',
                    text,
                    buttons
                }}
                errorObjCart={{}}
                onClose={() => { }}
            ></AddToCartBody>
        </Modal>
    );
}

EprocSetupFailure.propTypes = {
    status: PropTypes.bool,
    title: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string,
    buttons: PropTypes.array
}

EprocSetupFailure.defaultProps = {
    status: false,
    title: '',
    text: '',
    icon: '',
    buttons: [{ text: '' }]
}

export default EprocSetupFailure;
