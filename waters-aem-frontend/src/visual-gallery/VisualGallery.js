import React, { useState } from "react";
import PropTypes from "prop-types";
import OverlayWithTabs from "../overlay-with-tabs/OverlayWithTabs";
import ImageGallery from "./overlay/OverlayImageGallery";
import { WIDTHS } from "../constants";

const VisualGallery = ({ tabs, templates, videoIds, widths, zoomLabel, zoomInIcon }) => {
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
