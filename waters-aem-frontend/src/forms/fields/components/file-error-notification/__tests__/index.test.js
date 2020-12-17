import React from 'react';
import { shallow } from 'enzyme';
import ReactSVG from 'react-svg';

import Notification from '../index';
import props from '../__mocks__/en_US';

describe('<Notification />', () => {
    let enzymeWrapper;
    beforeAll(() => {
        enzymeWrapper = shallow(<Notification {...props} />);
    });
    it('should render without throwing an error', () => {
        expect(enzymeWrapper).toMatchSnapshot();
    });
    it('should display default notification message', () => {
        expect(enzymeWrapper.find('.file-error-notification')).toHaveLength(1);
        expect(enzymeWrapper.find('.file-error-notification').text()).toBe('');
        expect(enzymeWrapper.find('div').at(0).props()['data-locator']).toBe('');
    });
    it('should display message with error icon and title', () => {
        enzymeWrapper.setProps({
            className: 'file-notify',
            variation: 'inline',
            type: 'error',
            title: 'File format not accepted',
            elementLocator: 'invalid-file',
            icon: '/content/dam/waters/en/brand-assets/icons/x.svg'
        });
        enzymeWrapper.update();
        expect(enzymeWrapper.find('.file-error-notification')).toHaveLength(1);
        expect(enzymeWrapper.find('.inline')).toHaveLength(1);
        expect(enzymeWrapper.find('.error')).toHaveLength(1);
        expect(enzymeWrapper.find('.file-notify')).toHaveLength(1);
        expect(enzymeWrapper.find(ReactSVG)).toHaveLength(1);
        expect(enzymeWrapper.find(ReactSVG).props().src).toBe('/content/dam/waters/en/brand-assets/icons/x.svg');
        expect(enzymeWrapper.find('.title')).toHaveLength(1);
        expect(enzymeWrapper.find('.title').text()).toBe('File format not accepted');
    });
    it('should display message with success icon and description', () => {
        enzymeWrapper.setProps({
            type: 'success',
            title: '',
            description: 'File format verified',
            elementLocator: 'file-format-verified',
            icon: '/content/dam/waters/en/brand-assets/icons/success.svg'
        });
        enzymeWrapper.update();
        expect(enzymeWrapper.find('.file-error-notification')).toHaveLength(1);
        expect(enzymeWrapper.find('.inline')).toHaveLength(1);
        expect(enzymeWrapper.find('.success')).toHaveLength(1);
        expect(enzymeWrapper.find('.file-notify')).toHaveLength(1);
        expect(enzymeWrapper.find(ReactSVG)).toHaveLength(1);
        expect(enzymeWrapper.find(ReactSVG).props().src).toBe('/content/dam/waters/en/brand-assets/icons/success.svg');
        expect(enzymeWrapper.find('.description')).toHaveLength(1);
        expect(enzymeWrapper.find('.description').text()).toBe('File format verified');
    });
    it('should display message link without icon', () => {
        enzymeWrapper.setProps({
            type: 'link',
            description: '',
            linkText: 'Go to home page',
            elementLocator: 'link',
            link: {
                to: '/',
                target: '__self'
            },
            icon: ''
        });
        enzymeWrapper.update();
        expect(enzymeWrapper.find('.file-error-notification')).toHaveLength(1);
        expect(enzymeWrapper.find('.inline')).toHaveLength(1);
        expect(enzymeWrapper.find('.link')).toHaveLength(1);
        expect(enzymeWrapper.find(ReactSVG)).toHaveLength(0);
        expect(enzymeWrapper.find('.description')).toHaveLength(0);
        expect(enzymeWrapper.find('a').text()).toBe('Go to home page');
    });
});