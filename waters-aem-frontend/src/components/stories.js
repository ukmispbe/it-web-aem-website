// This file is for creating and updating components for rendering in the Storybook style guide

import { storiesOf } from '@storybook/html';

const context = {
    heading: {
        text: 'Hello Storybook'
    }
}

import testStory from './test-component/story';

storiesOf('Waters Component Library', module)
    .add('heading', () => `<h1>${context.heading.text}</h1>`)
    .add('test', testStory)


// Export template buider helper for converting ${variable} to context passed to story
export const template = (html, component) => {
    return ctx => {
        for (let x in ctx[component]) {
            const regex = `\\$\\{\\s?${component}.${x}\\s?\\}`;
            html = html.replace(new RegExp(regex, "ig"), ctx[component][x]);
        }

        return html;
    }
}