import React from 'react';
import { shallow } from 'enzyme';

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
        expect(enzymeWrapper.find('.greeting')).toHaveLength(1);
        expect(enzymeWrapper.find('.name')).toHaveLength(1);
        expect(enzymeWrapper.find('.company')).toHaveLength(1);
        expect(enzymeWrapper.find('.logo')).toHaveLength(1);

        expect(enzymeWrapper.find('.greeting').text()).toBe(props.greetings);
        expect(enzymeWrapper.find('.name').text()).toBe(`${userDetails.firstName} ${userDetails.lastName}`);
        expect(enzymeWrapper.find('.company').text()).toBe(userDetails.company);
    });
    it('should display greeting, company, and logo', () => {
        enzymeWrapper.setProps({ showName: false });
        enzymeWrapper.update();
        expect(enzymeWrapper.find('.greeting')).toHaveLength(1);
        expect(enzymeWrapper.find('.name')).toHaveLength(0);
        expect(enzymeWrapper.find('.company')).toHaveLength(1);
        expect(enzymeWrapper.find('.logo')).toHaveLength(1);

        expect(enzymeWrapper.find('.greeting').text()).toBe(props.greetings);
        expect(enzymeWrapper.find('.company').text()).toBe(userDetails.company);
    });
    it('should display greeting and company', () => {
        enzymeWrapper.setProps({ showName: false, showLogo: false });
        enzymeWrapper.update();
        expect(enzymeWrapper.find('.greeting')).toHaveLength(1);
        expect(enzymeWrapper.find('.name')).toHaveLength(0);
        expect(enzymeWrapper.find('.company')).toHaveLength(1);
        expect(enzymeWrapper.find('.logo')).toHaveLength(0);

        expect(enzymeWrapper.find('.greeting').text()).toBe(props.greetings);
        expect(enzymeWrapper.find('.company').text()).toBe(userDetails.company);
    });
    it('should display greeting, name and company', () => {
        enzymeWrapper.setProps({ showName: true});
        enzymeWrapper.update();
        expect(enzymeWrapper.find('.greeting')).toHaveLength(1);
        expect(enzymeWrapper.find('.name')).toHaveLength(1);
        expect(enzymeWrapper.find('.company')).toHaveLength(1);
        expect(enzymeWrapper.find('.logo')).toHaveLength(0);

        expect(enzymeWrapper.find('.greeting').text()).toBe(props.greetings);
        expect(enzymeWrapper.find('.name').text()).toBe(`${userDetails.firstName} ${userDetails.lastName}`);
        expect(enzymeWrapper.find('.company').text()).toBe(userDetails.company);
    });
});