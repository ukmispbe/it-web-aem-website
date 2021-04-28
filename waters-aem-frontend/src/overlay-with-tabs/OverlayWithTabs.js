import React, { useState } from 'react';
import PropTypes from "prop-types";
import Modal, { Header, keys } from "../utils/modal";
import Tabs from "../navigation/tabs";
import './overlaywith.css';

const OverlayWithTabs = props => {
    const [state, setState] = useState({
        open: props.isOpen,
        gallerySelected: "",
        activeTabFilter: "",
        activeTabIndex: 0,
    });

    const handleClose = (e) => setState({ open: false });
    
    const handleGallerySelected = (e) => {
       
        let tabId;
        let activeTabFilterStatus = props.tabs[0].name;
        e.value || e.value === 0 ? (tabId = e.value) : (tabId = e);
    
        if (tabId === 1) {
          activeTabFilterStatus = props.tabs[1].name;
        }

        if(props.activeTabHandler) {
            props.activeTabHandler(tabId);
        }
    
        setState({
          activeTabFilter: activeTabFilterStatus,
          activeTabIndex: tabId,
          open: true
        });
      };

    const renderTabs = () => {
        const { tabs = [] } = {
          tabs: props.tabs,
        };
        return (
          <Tabs
            className="cmp-search__categories-tabs"
            items={tabs}
            activeIndex={state.activeTabIndex}
            onClick={(e) => handleGallerySelected(e)}
            enableFading={true}
          />
        );
      };

    return (
        <>
          <Modal
                isOpen={state.open}
                onClose={handleClose}
                className="cmp-asset-display-modal"
              >
              <div>
                  <Header title="" />
                  <div className="cmp-gallery-tab">{renderTabs()}</div>
                  <div>{props.children}</div>
              </div>                
            </Modal>
        </>
    )
}

OverlayWithTabs.propTypes = {
  isOpen: PropTypes.bool,
  tabs: PropTypes.arrayOf(PropTypes.object),
  activeTabHandler: PropTypes.func
}

OverlayWithTabs.defaultProps = {
  isOpen: false,
  tabs: [],
  activeTabHandler: () => {}
}

export default OverlayWithTabs;