// OverlayWithTabs.stories.js

import React from 'react';

import {OverlayWithTabs} from './OverlayWithTabs';
import {tabs, children} from './OverlayWithTabs.mock';

// This default export determines where your story goes in the story list
export default {
    title: 'OverlayWithTabs',
    component: OverlayWithTabs
  };
  
  // We create a “template” of how args map to rendering
  const Template = (args) => <OverlayWithTabs {...args} />;
  
  export const OverlayOpenView = Template.bind({});  
  OverlayOpenView.args = {   
    tabs, children, isOpen : true
  };



