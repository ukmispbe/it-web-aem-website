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
                    "title": "Item Added to Cart",
                    "textHeading": "1860004623",
                    "text": "ACQUITY UPLC Protein BEH C4 VanGuard Pre-column, 300A, 1.7 um, 2.1 mm X 5 mm, 3/pk",
                    "buttons": [
                        {
                            "text": "View Cart",
                            "action": "https://www.waters.com/waters/shoppingCart.htm"
                        },
                        {
                            "text": "Continue Shopping",
                            "action": "close"
                        }
                    ],
                }}
            />
        </>
    );
};

export default SearchApp;
