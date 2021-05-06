import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getBrightCoveVideoData } from "./services";
import OverlayWithTabs from "../overlay-with-tabs/OverlayWithTabs";
import ImageGallery from "./overlay/OverlayImageGallery";
import VideoGallery from "./overlay/OverlayVideoGallery";
import { WIDTHS } from "../constants";

const VisualGallery = ({ tabs, templates, videoIds, brightcoveAccount, brightcovePlayerId, widths, zoomLabel, zoomInIcon }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [brightCoveData, setBrightCoveData] = useState([]);

  const handleClose = (e) => setIsOpen(false);

  const activeTabHandler = (id) => setActiveTabIndex(id);
 
  const birghtCoveData = data => {   
    const videoObj = data.map(obj  => ({      
        title: obj.name,
        description: obj.description,
        thumbnail: obj.thumbnail,
        duration: obj.duration,
        brightcoveVideoId: obj.id, 
        brightcoveAccount,
        brightcovePlayerId,    
    }));
    setBrightCoveData(videoObj)
  }
 
  useEffect(() => {   
   getBrightCoveVideoData(videoIds, brightcoveAccount, birghtCoveData);   
  },[])

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
          {brightCoveData.length > 0 && (
            <div style={{ display: activeTabIndex === 1 ? "block" : "none" }}>
              <VideoGallery brightCoveData={brightCoveData} />              
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
