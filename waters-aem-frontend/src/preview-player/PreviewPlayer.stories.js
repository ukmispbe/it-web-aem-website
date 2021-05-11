// Input.stories.js

import React from 'react';

import PreviewPlayer from './index';
import {videoConfig, imgConfig} from './previewPlayer.mock';

// This default export determines where your story goes in the story list
export default {
    title: 'PreviewPlayer',
    component: PreviewPlayer
  };
  
  // We create a “template” of how args map to rendering
  const Template = (args) => <PreviewPlayer {...args} />;
  
  export const ImageView = Template.bind({});  
  ImageView.args = {   
   ...imgConfig
  };

  export const VideoView = Template.bind({});  
  VideoView.args = {videoConfig};

