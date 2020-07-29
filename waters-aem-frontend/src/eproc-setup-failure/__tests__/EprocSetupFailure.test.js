import React from 'react';
import { shallow } from 'enzyme';

//Mocked Props
import EprocSetupFailure from '../EprocSetupFailure';
import Modal, { Header } from '../../utils/modal';
import AddToCartBody from '../../sku-details/views/addToCartModal';
import props from '../EprocSetupFailure.mock';

describe('<EprocSetupFailure />', () => {
    let enzymeWrapper;
    beforeAll(() => {
        enzymeWrapper = shallow(<EprocSetupFailure {...props} />);
    });
    it('should render without throwing an error', () => {
        expect(enzymeWrapper).toMatchSnapshot();
    });
    it('should display greeting, name, company, and logo', () => {
        expect(enzymeWrapper.find(Modal)).toHaveLength(1);
        expect(enzymeWrapper.find(Header)).toHaveLength(1);
        expect(enzymeWrapper.find(AddToCartBody)).toHaveLength(1);
        expect(enzymeWrapper.find(Modal).dive().html()).toBe('');
    });
    it('should display modal without close button', () => {
        enzymeWrapper.setProps({
            status: true,
            title: 'Sorry, something went wrong.',
            text: 'Please return to your procurement system and try again.',
            buttons: [{ text: 'RETURN TO PROCUREMENT SYSTEM', noAction: true, action: '#' }]
        });
        enzymeWrapper.update();
        const enzymeWrapperModal = enzymeWrapper.find(Modal).dive();
        expect(enzymeWrapperModal.find(Header)).toHaveLength(1);
        expect(enzymeWrapperModal.find(AddToCartBody)).toHaveLength(1);
    });
});