import React, { useState, useCallback, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Modal, { Header, keys } from '../utils/modal';
import AddToCartBody from '../sku-details/views/addToCartModal';
import './styles/index.scss';

function LegalLinkModal(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [bodyContent, setBodyContent] = useState('');

    const openModal = useCallback(event => {
        event.preventDefault();
        const { href, innerText } = event.target;
        fetch(href, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'text/html',
                'Content-Type': 'text/html'
            }
        })
            .then(response => response.text())
            .then(content => {
                setTitle(innerText)
                setBodyContent(content);
                setIsOpen(true);
            });

    }, [setTitle, setBodyContent, setIsOpen]);

    useLayoutEffect(() => {
        document.querySelector('#js-contact-support-form a.terms-of-use').addEventListener('click', openModal);
        document.querySelector('#js-contact-support-form a.waters-privacy').addEventListener('click', openModal);
    }, [openModal]);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, [isOpen, setIsOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="cmp-modal-legal-links">
            <div className="cmp-modal-body-legal-links custom-scroll">
                <Header
                    title={title}
                    icon={props.docIcon}
                    className={keys.HeaderWithAddedMarginTop}
                />
                <AddToCartBody
                    config={{
                        isOrderDetails: true,
                        text: ReactHtmlParser(bodyContent)
                    }}
                    errorObjCart={{}}
                    onClose={() => { }}
                ></AddToCartBody>
            </div>
        </Modal>
    );
}

LegalLinkModal.propTypes = {
    docIcon: PropTypes.string
};

LegalLinkModal.defaultProps = {
    docIcon: ''
};

export default LegalLinkModal;