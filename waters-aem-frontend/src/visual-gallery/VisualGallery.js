import React, { useState } from "react";
import PropTypes from "prop-types";
import OverlayWithTabs from "../overlay-with-tabs/OverlayWithTabs";
import ImageGallery from "./overlay/OverlayImageGallery";
import MobileOverlay from "./overlay/MobileOverlay";
import { WIDTHS } from "../constants";

const VisualGallery = ({
  tabs,
  templates,
  videoIds,
  widths,
  zoomLabel,
  pinchLabel,
  zoomInIcon,
  pinchIcon,
}) => {
  const overlayProps = {
    iconClear:
      "https://dev1.waters.com/content/dam/waters/en/brand-assets/icons/close.svg",
    iconLeft:
      "https://dev1.waters.com/content/dam/waters/en/brand-assets/icons/left.svg",
    backBtnLabel: "Back",
    closeBtnLabel: "Close",
  };

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOverlayOpen, mobileOverlayHandler] = useState(false);
  const handleClose = (e) => setIsOpen(false);

  const activeTabHandler = (id) => setActiveTabIndex(id);
  const launchMobileOverlay = () => {
    mobileOverlayHandler(!isMobileOverlayOpen);
  };

  return (
    <div>
      <button onClick={launchMobileOverlay}>{`Launch Mobile Overlay`}</button>
      <OverlayWithTabs
        isOpen={isOpen}
        tabs={tabs}
        handleClose={handleClose}
        activeTabHandler={activeTabHandler}
      >
        <div>
          {templates.length > 0 && (
            <div style={{ display: activeTabIndex === 0 ? "block" : "none" }}>
              <ImageGallery
                templates={templates}
                widths={widths}
                zoomInIcon={zoomInIcon}
                zoomLabel={zoomLabel}
              />
            </div>
          )}
          {videoIds.length > 0 && (
            <div style={{ display: activeTabIndex === 1 ? "block" : "none" }}>
              {tabs[1]}
            </div>
          )}
        </div>
      </OverlayWithTabs>
      {isMobileOverlayOpen && (
        <MobileOverlay
          iconClear={overlayProps.iconClear}
          iconLeft={overlayProps.iconLeft}
          backBtnLabel={overlayProps.backBtnLabel}
          closeBtnLabel={overlayProps.closeBtnLabel}
          templates={templates}
          videoIds={videoIds}
          widths={widths}
          zoomInIcon={pinchIcon}
          pinchLabel={pinchLabel}
        ></MobileOverlay>
      )}
    </div>
  );
};

VisualGallery.defaultProps = {
  widths: WIDTHS,
};

VisualGallery.propTypes = {
  alt: PropTypes.string,
  templates: PropTypes.arrayOf(PropTypes.string).isRequired,
  widths: PropTypes.arrayOf(PropTypes.string).isRequired,
  zoomInIcon: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string),
};

export default VisualGallery;
