// React Search Application
import React, { useState } from 'react';
import Search from './search';

import ModalContainer, { Modal } from '../modal/index';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const SearchApp = props => {
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => {
        if (modalOpen) {
            setModalOpen(false);
        } else {
            setModalOpen(true);
        }
    };
    return (
        <>
            <Router>
                <Route
                    path=""
                    render={() => (
                        <ErrorBoundary>
                            <Search
                                defaultFacet={props.defaultFacet}
                                searchDefaults={props.searchDefaults}
                                searchServicePath={props.searchServicePath}
                                searchText={props.searchText}
                                searchLocale={props.searchLocale}
                                filterMap={props.filterMap}
                                isocode={props.isocode}
                            />
                        </ErrorBoundary>
                    )}
                />
            </Router>
            {/* Remove the button and Modal from here before PR */}
            <button onClick={toggleModal}>Toggle Modal</button>
            <Modal
                toggleModal={toggleModal}
                open={modalOpen}
                theme="callToAction"
                config={{
                    icon: 'path/to/icon.svg',
                    title: 'Hello World',
                    textHeading: 'Small heading',
                    text: 'Hello, World, from React Modal',
                    buttons: [
                        {
                            text: 'Cancel',
                            action: 'close',
                        },
                        {
                            text: 'View Cart',
                            action:
                                'https://www.waters.com/waters/shoppingCart.htm',
                        },
                    ],
                }}
            />
        </>
    );
};

export default SearchApp;
