import React from 'react';
import { shallow } from 'enzyme';

//Mocked Props
import Input from '../Input';
import props from '../Input.mock';

describe('<Input />', () => {
    let enzymeWrapper;
    beforeAll(() => {
        props.onClick = jest.fn();
        enzymeWrapper = shallow(<Input {...props} />);
    });
    it('should render without throwing an error', () => {
        expect(enzymeWrapper).toMatchSnapshot();
    });
    it('should display input field default', () => {
        expect(enzymeWrapper.find('label')).toHaveLength(1);
        expect(enzymeWrapper.find('input')).toHaveLength(1);
    });
    it('should not display input label', () => {
        enzymeWrapper.setProps({ showLabel: false });
        enzymeWrapper.update();
        console.log(enzymeWrapper.debug());
        expect(enzymeWrapper.find('label')).toHaveLength(0);
        expect(enzymeWrapper.find('input')).toHaveLength(1);
    });
    it('should not display input label', () => {
        enzymeWrapper.setProps({ showLabel: false });
        enzymeWrapper.update();
        console.log(enzymeWrapper.debug());
        expect(enzymeWrapper.find('label')).toHaveLength(0);
        expect(enzymeWrapper.find('input')).toHaveLength(1);
    });
    it('should change value onChange', () => {
        enzymeWrapper.find('input').simulate('change', { target: { value: '176001125' } });
        enzymeWrapper.update();
        expect(enzymeWrapper.state().value).toBe('176001125');
        expect(enzymeWrapper.state().isApplyDisabled).toBeFalsy();
    });
});