// Input.stories.js

import React from 'react';

import Input from './Input';
import props from './Input.mock';

//👇 This default export determines where your story goes in the story list
export default {
    title: 'Input',
    component: Input
  };
  
  //👇 We create a “template” of how args map to rendering
  const Template = (args) => <Input {...args} />;
  
  export const DefaultEnabled = Template.bind({});  
  DefaultEnabled.args = {
    /*👇 The args you need here will depend on your component */
   ...props
  };

  export const Disabled = Template.bind({});  
  Disabled.args = {
    /*👇 The args you need here will depend on your component */
    name: 'Quick Order',
    type: 'text',     
    id: 'quick-order',
    disabled: 'disabled',    
    showLabel: false
  };

  export const ShowLabel = Template.bind({});  
  ShowLabel.args = {
    /*👇 The args you need here will depend on your component */
    name: 'Quick Order',
    type: 'text',     
    id: 'quick-order',
    showLabel: true
  };
