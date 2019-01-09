import { configure } from '@storybook/html';

function loadStories() {
  require('../src/components/stories.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);