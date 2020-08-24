import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import Modal, { Header, keys } from '../utils/modal';
import AddToCartBody from '../sku-details/views/addToCartModal';
import './styles/index.scss';

function LegalLinkModal(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [bodyContent, setBodyContent] = useState('');

    // Content Fragment
    const openModal = useCallback(event => {
        try {
            event.preventDefault();
            const { href, title } = event.target;
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
                    setTitle(title)
                    setBodyContent(content);
                    setIsOpen(true);
                });
        } catch (error) {
            console.error(error);
        }
    }, [setTitle, setBodyContent, setIsOpen]);

    // Add event on DOM
    function addDOMEvent(container, callback) {
        const link = document.getElementById(container);
        if (window.addEventListener) {
            link.addEventListener('click', callback, false);
        } else {
            link.attachEvent('onclick', callback);
        }
    }

    // Wait untill selector is loaded
    function waitUntilLinkExists(container, callback, addListner) {
        let instanceTimeOut;
        if (document.getElementById(container)) {
            clearTimeout(instanceTimeOut);
            return callback(container, addListner);
        }
        instanceTimeOut = setTimeout(function () { return waitUntilLinkExists(container, callback, addListner) }, 1000);
    }

    // invoke waitUntilLinkExists method
    useEffect(() => {
        waitUntilLinkExists('contact-support-form-terms-of-use', addDOMEvent, openModal);
        waitUntilLinkExists('contact-support-form-waters-privacy', addDOMEvent, openModal);
    }, []);

    // Close Modal
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