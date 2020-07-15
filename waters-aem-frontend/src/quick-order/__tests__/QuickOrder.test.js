import React from 'react';
import { shallow } from 'enzyme';

//Mocked Props
import QuickOrder from '../QuickOrder';
import props from '../QuickOrder.mock';
import Button from '../../components/Button/Button';

describe('<QuickOrder />', () => {
    let enzymeWrapper;
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            value: () => ({
                matches: false,
                addListener: () => { },
                removeListener: () => { }
            }),
            writable: true,
            enumerable: true,
            configurable: true
        });
        enzymeWrapper = shallow(<QuickOrder {...props} />);
    });
    it('should render without throwing an error', () => {
        expect(enzymeWrapper).toMatchSnapshot();
    });
    it('should display default Add to cart section', () => {
        expect(enzymeWrapper.find('.quick-order-parent')).toHaveLength(1);
        expect(enzymeWrapper.find('#code')).toHaveLength(1);
        expect(enzymeWrapper.find('#quickOrderQty')).toHaveLength(1);
        expect(enzymeWrapper.find('.quick-order-submit-button')).toHaveLength(1);
        expect(enzymeWrapper.find('.quick-order-multiple-item')).toHaveLength(1);
        expect(enzymeWrapper.find(Button).props().disabled).toBe(true);
    });
    xit('should display ADD TO CART Button as active', () => {
        enzymeWrapper.find('#code').simulate('change', { target: { value: 'rertert' } });
        enzymeWrapper.find('#quickOrderQty').simulate('change', { target: { value: '2' } });
        console.log(enzymeWrapper.find(Button).props());
    });
    it('should display Add Multiple Items', () => {
        expect(enzymeWrapper.find('.quick-order-multiple-item')).toHaveLength(1);
    });
});