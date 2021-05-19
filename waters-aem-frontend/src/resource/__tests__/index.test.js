import React from 'react';
import { shallow } from 'enzyme';

import Resource from '../index';
import props from './props';

describe('<Resource />', () => {
    let enzymeWrapper;
    beforeAll(() => {
        enzymeWrapper = shallow(<Resource {...props} />);
    });
    it('should render without throwing an error', () => {
        expect(enzymeWrapper).toMatchSnapshot();
    });
    it('should display Resources', () => {
        expect(enzymeWrapper.exists('.cmp-resource-section')).toEqual(true);
        expect(enzymeWrapper.exists('h4')).toEqual(true);
        expect(enzymeWrapper.find('h4').text()).toEqual(props.title);
        expect(enzymeWrapper.exists('.cmp-resource-section__list')).toEqual(true);
        expect(enzymeWrapper.exists('ul')).toEqual(true);
    });
});