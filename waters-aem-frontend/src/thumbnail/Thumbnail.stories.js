// Thumbnail.stories.js

import React from "react";

import Thumbnail from "./Thumbnail";
import props from "./Thumbnail.mock";

// This default export determines where your story goes in the story list
export default {
  title: "Thumbnail",
  component: Thumbnail,
};

// We create a “template” of how args map to rendering
const Template = (args) => <Thumbnail {...args} />;

export const DefaultView = Template.bind({});
DefaultView.args = {
  ...props,
};

export const ViewWithImage = Template.bind({});
ViewWithImage.args = {
  thumbnailURL:
    "http://localhost:4502/content/dam/waters/emails/innovations-otto-spe-logo.jpeg",
  thumbnailAltText: "productImage",
  thumbnailTitleText: "Innovation Acquity",
};

export const ViewWithImageInActiveState = Template.bind({});
ViewWithImageInActiveState.args = {
  thumbnailURL:
    "http://localhost:4502/content/dam/waters/emails/innovations-otto-spe-logo.jpeg",
  thumbnailAltText: "productImage",
  thumbnailTitleText: "Innovation Acquity",
  className: "thumbnail-active",
};

export const ViewWithImageAndLabel = Template.bind({});
ViewWithImageAndLabel.args = {
  thumbnailURL:
    "http://localhost:4502/content/dam/waters/emails/innovations-otto-spe-logo.jpeg",
  thumbnailAltText: "productImage",
  thumbnailTitleText: "Innovation Acquity",
  thumbnailLabel: "Innovation Acquity RDA Smart MS",
};
export const ThumbnailWithVideo = Template.bind({});
ThumbnailWithVideo.args = {
  thumbnailURL:
    "http://localhost:4502/content/dam/waters/emails/innovations-acquity-premier-column-logo.jpeg",
  thumbnailAltText: "productImage",
  thumbnailTitleText: "Innovation Acquity",
  isVideo: true,
  videoIconURL:
    "https://dev1.waters.com/content/dam/waters/en/brand-assets/icons/play.svg",
};

export const ThumbnailWithTimeStamp = Template.bind({});
ThumbnailWithTimeStamp.args = {
  thumbnailURL:
    "http://localhost:4502/content/dam/waters/emails/innovations-acquity-premier-column-logo.jpeg",
  thumbnailAltText: "productImage",
  thumbnailTitleText: "Innovation Acquity",
  isVideo: true,
  showVideoPlayButton: false,
  timeStamp: "04:35",
  videoIconURL:
    "https://dev1.waters.com/content/dam/waters/en/brand-assets/icons/play.svg",
};
