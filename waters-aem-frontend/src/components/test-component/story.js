import markup from './markup.html';
import { template } from './../stories';


const test = {
    title: 'Hello Sarah!',
    customText: 'blah blah blah blah'
};

export default () => {
    return template(markup, 'test')({test: test});
};