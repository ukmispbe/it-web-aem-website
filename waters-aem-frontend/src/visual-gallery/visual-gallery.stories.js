// OverlayWithTabs.stories.js

import React from "react";

import OverWithImageTabs from "./VisualGallery";
import {
  props,
  singleImageAndNoTabs,
  visualGalleryMobileOverlayData,
} from "./OverlayImageTabs.mock";

// This default export determines where your story goes in the story list
export default {
  title: "OverWithImageTabs",
  component: OverWithImageTabs,
};

// We create a “template” of how args map to rendering
const Template = (args) => <OverWithImageTabs {...args} />;

export const OverWithImageTabsWithDualImage = Template.bind({});
OverWithImageTabsWithDualImage.args = { ...props };

export const OverWithImageSingleImageNoTabs = Template.bind({});
OverWithImageSingleImageNoTabs.args = { ...singleImageAndNoTabs };

export const GalleryViewOnMobile = Template.bind({});
GalleryViewOnMobile.args = { ...visualGalleryMobileOverlayData };
