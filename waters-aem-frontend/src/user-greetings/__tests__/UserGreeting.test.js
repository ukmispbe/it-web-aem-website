import React from 'react';
import { shallow } from 'enzyme';

import { htmlParser, getCompanyLogo } from '../../utils/eCommerceFunctions';

//Mocked Props
import UserGreeting from '../UserGreeting';
import props, { userDetails } from '../UserGreeting.mock';

describe('<UserGreeting />', () => {
    let enzymeWrapper;
    beforeAll(() => {
        window.sessionStorage = {
            storage: {},
            setItem: function (field, value) {
                this.storage[field] = value;
            },
            getItem: function (field) {
                return value ? JSON.parse(this.storage[field]) : {};
            }
        }
        window.sessionStorage.setItem('waters.userDetails', JSON.stringify(userDetails));

        enzymeWrapper = shallow(<UserGreeting {...props} />);
    });
    it('should render without throwing an error', () => {
        expect(enzymeWrapper).toMatchSnapshot();
    });
    it('should display greeting, name, company, and logo', () => {
        expect(enzymeWrapper.find('.greetings')).toHaveLength(1);
        expect(enzymeWrapper.find('h2')).toHaveLength(1);
        expect(enzymeWrapper.find('h3')).toHaveLength(1);
        expect(enzymeWrapper.find('h4')).toHaveLength(1);
        expect(enzymeWrapper.find('.logo')).toHaveLength(1);

        expect(enzymeWrapper.find('h2').text()).toBe(props.greetings);
        expect(enzymeWrapper.find('h3').text()).toBe(`${userDetails.firstName} ${userDetails.lastName}`);
        expect(enzymeWrapper.find('h4').text()).toBe(userDetails.company);
    });
    it('should display greeting, firstname, company, and logo', () => {
        window.sessionStorage.setItem('waters.userDetails', JSON.stringify({ ...userDetails, lastName: '' }));
        enzymeWrapper.setProps({ greetings: 'Welcome' });
        enzymeWrapper.update();
        expect(enzymeWrapper.find('h2')).toHaveLength(1);
        expect(enzymeWrapper.find('h3')).toHaveLength(1);
        expect(enzymeWrapper.find('h4')).toHaveLength(1);
        expect(enzymeWrapper.find('.logo')).toHaveLength(1);

        expect(enzymeWrapper.find('h2').text()).toBe('Welcome');
        expect(enzymeWrapper.find('h3').text()).toBe(userDetails.firstName);
        expect(enzymeWrapper.find('h4').text()).toBe(userDetails.company);
    });
    it('should display greeting, lastname and no company no logo', () => {
        window.sessionStorage.setItem('waters.userDetails', JSON.stringify({ ...userDetails, firstName: '', company: '' }));
        enzymeWrapper.setProps({ greetings: 'Welcome' });
        enzymeWrapper.update();
        expect(enzymeWrapper.find('h2')).toHaveLength(1);
        expect(enzymeWrapper.find('h3')).toHaveLength(1);
        expect(enzymeWrapper.find('h4')).toHaveLength(1);
        expect(enzymeWrapper.find('.logo')).toHaveLength(1);

        expect(enzymeWrapper.find('h2').text()).toBe('Welcome');
        expect(enzymeWrapper.find('h3').text()).toBe(userDetails.lastName);
        expect(enzymeWrapper.find('h4').text()).not.toBe(userDetails.company);
    });
    it('should display greeting, no name, no company and no logo', () => {
        window.sessionStorage.setItem('waters.userDetails', JSON.stringify({ ...userDetails, firstName: '', lastName: '', company: '' }));
        enzymeWrapper.setProps({ greetings: 'Welcome!' });
        enzymeWrapper.update();
        expect(enzymeWrapper.find('h2')).toHaveLength(1);
        expect(enzymeWrapper.find('h3')).toHaveLength(1);
        expect(enzymeWrapper.find('h4')).toHaveLength(1);
        expect(enzymeWrapper.find('.logo')).toHaveLength(1);

        expect(enzymeWrapper.find('h2').text()).toBe('Welcome!');
        expect(enzymeWrapper.find('h3').text()).toBe('');
        expect(enzymeWrapper.find('h4').text()).toBe('');
    });
    it('should display no greeting and company without HTML entity', () => {
        window.sessionStorage.setItem('waters.userDetails', JSON.stringify({ company: 'Johnson &amp; Johnson BE' }));
        enzymeWrapper.setProps({ greetings: '' });
        enzymeWrapper.update();
        expect(enzymeWrapper.find('h2').text()).toBe('');
        expect(enzymeWrapper.find('h4').text()).toBe(htmlParser('Johnson &amp; Johnson BE'));
    });
    it('should display company logo with special char(&) in company name', () => {
        window.sessionStorage.setItem('waters.userDetails', JSON.stringify({ company: 'Johnson &amp; Johnson' }));
        enzymeWrapper.setProps({ greetings: 'Welcome' });
        enzymeWrapper.update();
        expect(enzymeWrapper.find('h2').text()).toBe('Welcome');
        expect(enzymeWrapper.find('h4').text()).toBe(htmlParser('Johnson &amp; Johnson'));
        expect(enzymeWrapper.find('img')).toHaveLength(1);
        const imgProps = enzymeWrapper.find('img').props();
        expect(imgProps.src).toBe(getCompanyLogo(props.logoDirectoryPath, htmlParser('Johnson &amp; Johnson')));
        expect(imgProps.alt).toBe(htmlParser('Johnson &amp; Johnson'));
    });
});