import React from 'react';
import { shallow } from 'enzyme';

//Mocked Props
import Button from '../Button';
import props from '../Button.mock';

describe('<Button />', () => {
    let enzymeWrapper;
    beforeAll(() => {
        props.onClick = jest.fn();
        enzymeWrapper = shallow(<Button {...props}>Add To Cart</Button>);
    });
    it('should render without throwing an error', () => {
        expect(enzymeWrapper).toMatchSnapshot();
    });
    it('should display button default', () => {
        expect(enzymeWrapper.find('button')).toHaveLength(1);
        expect(enzymeWrapper.props()['aria-label']).toBeNull();
        expect(enzymeWrapper.props().className).toBe('');
        expect(enzymeWrapper.props().disabled).toBeFalsy();
        expect(enzymeWrapper.props().type).toBe('button');
    });
    it('should display button with ariaLabel, className', () => {
        enzymeWrapper.setProps({ ariaLabel: 'test', className: 'primary', elementLocator: 'add-to-cart' });
        enzymeWrapper.update();
        expect(enzymeWrapper.props()['aria-label']).toBe('test');
        expect(enzymeWrapper.props().className).toBe('primary');
        expect(enzymeWrapper.props()['data-locator']).toBe('add-to-cart');
    });
    it('should display button with ariaLabel, className', () => {
        enzymeWrapper.setProps({ ariaLabel: 'test', className: 'primary', elementLocator: 'add-to-cart' });
        enzymeWrapper.update();
        expect(enzymeWrapper.props()['aria-label']).toBe('test');
        expect(enzymeWrapper.props().className).toBe('primary');
        expect(enzymeWrapper.props()['data-locator']).toBe('add-to-cart');
        enzymeWrapper.props().onClick();
        expect(props.onClick).toHaveBeenCalled();
    });
    it('should display disabledand not clickable', () => {
        props.onClick.mockReset();
        enzymeWrapper.setProps({ disabled: true });
        enzymeWrapper.update();
        expect(enzymeWrapper.find('button')).toHaveLength(1);
        expect(enzymeWrapper.props().disabled).toBe(true);
        enzymeWrapper.props().onClick();
        expect(props.onClick).toHaveBeenCalledTimes(1);
    });
});