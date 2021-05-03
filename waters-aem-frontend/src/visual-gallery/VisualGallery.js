import React, { useState } from "react";
import PropTypes from "prop-types";
import OverlayWithTabs from "../overlay-with-tabs/OverlayWithTabs";
import ImageGallery from "./overlay-image-gallery/OverlayImageGallery";

const VisualGallery = ({ tabs, templates, widths, zoomLabel, zoomInIcon }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = (e) => setIsOpen(false);

  const activeTabHandler = (id) => setActiveTabIndex(id);

  return (
    <div>
      <OverlayWithTabs
        isOpen={isOpen}
        tabs={tabs}
        handleClose={handleClose}
        activeTabHandler={activeTabHandler}
      >
        <div>
          <div style={{ display: activeTabIndex === 0 ? "block" : "none" }}>
            <ImageGallery
              templates={templates}
              widths={widths}
              zoomInIcon={zoomInIcon}
              zoomLabel={zoomLabel}
            />
          </div>
          <div style={{ display: activeTabIndex === 1 ? "block" : "none" }}>
            {tabs[1]}
          </div>
        </div>
      </OverlayWithTabs>
    </div>
  );
};

VisualGallery.defaultProps = {
  widths: ["128", "140", "256", "320", "375", "620", "770", "1280"],
};

VisualGallery.propTypes = {
  alt: PropTypes.string,
  templates: PropTypes.arrayOf(PropTypes.string).isRequired,
  widths: PropTypes.arrayOf(PropTypes.string).isRequired,
  zoomInIcon: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string),
};

export default VisualGallery;
