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
        event.preventDefault();
        try {
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
        document.querySelector(container).addEventListener('click', callback);
    }

    // Wait untill selector is loaded
    function waitUntilLinkExists(container, callback, addListner) {
        if (document.querySelector(container)) {
            return callback(container, addListner);
        }
        setTimeout(function () { return waitUntilLinkExists(container, callback, addListner) }, 1000);
    }

    // invoke waitUntilLinkExists method
    useEffect(() => {
        waitUntilLinkExists('#js-contact-support-form a.terms-of-use', addDOMEvent, openModal);
        waitUntilLinkExists('#js-contact-support-form a.waters-privacy', addDOMEvent, openModal);

        return () => {
            document.querySelector('#js-contact-support-form a.terms-of-use').removeEventListener('click', openModal);
            document.querySelector('#js-contact-support-form a.waters-privacy').removeEventListener('click', openModal);
        }
    }, [addDOMEvent]);

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