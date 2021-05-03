import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal, { Header, keys } from "../utils/modal";
import Tabs from "../navigation/tabs";
import "../styles/overlay-with-tabs.scss";

const OverlayWithTabs = (props) => {
  const [state, setState] = useState({
    open: props.isOpen,
    gallerySelected: "",
    activeTabFilter: "",
    activeTabIndex: 0,
  });

  const handleClose = (e) => props.handleClose();

  const handleGallerySelected = (e) => {
    let tabId;
    e.value || e.value === 0 ? (tabId = e.value) : (tabId = e);

    if (props.activeTabHandler) {
      props.activeTabHandler(tabId);
    }

    setState({
      activeTabIndex: tabId,
      open: true,
    });
  };

  const getTabObj = (obj) => obj.map((item) => ({ name: item }));

  const renderTabs = () => {
    const { tabs = [] } = {
      tabs: getTabObj(props.tabs),
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
        isOpen={props.isOpen}
        onClose={handleClose}
        className="cmp-asset-display-modal"
      >
        <div>
          <Header title="" />
          {props.tabs.length > 1 && (
            <div className="cmp-gallery-tab">{renderTabs()}</div>
          )}
          <div>{props.children}</div>
        </div>
      </Modal>
    </>
  );
};

OverlayWithTabs.propTypes = {
  isOpen: PropTypes.bool,
  tabs: PropTypes.arrayOf(PropTypes.object),
  activeTabHandler: PropTypes.func,
};

OverlayWithTabs.defaultProps = {
  isOpen: false,
  tabs: [],
  activeTabHandler: () => {},
};

export default OverlayWithTabs;
