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
    let instanceTimeOut;

    // Content Fragment
    function openModal(event) {
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
                })
                .catch(e => console.error(e));
        } catch (error) {
            console.error(error);
        }
    }
    
    // Wait untill selector is loaded
    function waitUntilLinkExists(container) {
        var links = document.querySelectorAll(container);
        if (links && links.length > 0) {
        links.forEach.call(links, function (link) {
            // Adds addEventListener event on terms-of-use' and privacy-policy link
            link.addEventListener('click', function (event) {
                    event.preventDefault();
                    openModal(event);
                    clearTimeout(instanceTimeOut);
            });
        });
        } else {
            instanceTimeOut = setTimeout(function () {
                waitUntilLinkExists(container);
            }, 10);
        }
    }

    // componentDidMount
    useEffect(() => {
        waitUntilLinkExists('#contact-support-form-terms-of-use');
        waitUntilLinkExists('#contact-support-form-waters-privacy');
        waitUntilLinkExists('.link-open-modal a');
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
                        text: ReactHtmlParser(`<main>${bodyContent}</main>`)
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