import React from 'react';
import { shallow } from 'enzyme';

import Divider from '../Divider';
import props from '../Divider.mock';

describe('<Divider />', () => {
    let enzymeWrapper;
    beforeAll(() => {
        enzymeWrapper = shallow(<Divider {...props} />);
    });
    it('should render without throwing an error', () => {
        expect(enzymeWrapper).toMatchSnapshot();
    });
    it('should display divider with default props', () => {
        expect(enzymeWrapper.find('.v-large')).toHaveLength(1);
        expect(enzymeWrapper.find('div').props()['data-locator']).toBe('divider-v-large');
    });
    it('should display divider with custom props', () => {
        enzymeWrapper.setProps({
            className: 'test',
            type: 'v-small'
        });
        enzymeWrapper.update();
        expect(enzymeWrapper.find('.v-large')).toHaveLength(0);
        expect(enzymeWrapper.find('.v-small')).toHaveLength(1);
        expect(enzymeWrapper.find('.test')).toHaveLength(1);
        expect(enzymeWrapper.find('div').props()['data-locator']).toBe('divider-v-small');
    });
});