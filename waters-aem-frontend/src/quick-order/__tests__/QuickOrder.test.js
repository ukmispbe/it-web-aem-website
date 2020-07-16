import React from 'react';
import { shallow } from 'enzyme';

//Mocked Props
import QuickOrder from '../QuickOrder';
import props from '../QuickOrder.mock';
import AddToCart from '../../sku-details/views/addToCart';

describe('<QuickOrder />', () => {
    let enzymeWrapper;
    let addToCart;
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
        expect(enzymeWrapper.find(AddToCart)).toHaveLength(1);
        addToCart = enzymeWrapper.find(AddToCart).dive();
        expect(addToCart.find('.cmp-sku-details__quantity')).toHaveLength(1);
        expect(addToCart.find('.cmp-button')).toHaveLength(1);
        expect(enzymeWrapper.find('.quick-order-multiple-item')).toHaveLength(1);
    });
    it('should display Add Multiple Items', () => {
        expect(enzymeWrapper.find('.quick-order-multiple-item')).toHaveLength(1);
    });
    xit('should display ADD TO CART Button as active', () => {
        enzymeWrapper.find('#code').simulate('change', { target: { value: 'rertert' } });
        addToCart.find('.cmp-sku-details__quantity').simulate('change', { target: { value: '2' } });
    });
});