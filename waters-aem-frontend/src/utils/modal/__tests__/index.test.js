import React from 'react';
import { shallow, mount } from 'enzyme';
import Modal from '../index';

document.body.innerHTML = "<div id='modal-root'></div>"

describe('Feature: Modal Component', () => {
    const props = {
        isOpen: true,
        onClose: jest.fn()
    };

    let spyOnUseEffect;

    beforeAll(() => {
        spyOnUseEffect = jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    });

    describe('Scenario: Rendering', () => {
        describe('When the modal is closed', () => {
            it("Then it should contain an empty component", () => {
                const props = {
                    isOpen: false,
                    onClose: jest.fn()
                };

                const wrapper = shallow(<Modal {...props} />);
                const fragment = wrapper.find('Fragment');
                
                expect(fragment.exists()).toEqual(true);
            });
        });

        describe('When the modal is open', () => {
            it('Then it should contain the modal portal', () => {
                const wrapper = shallow(<Modal {...props} />);
                
                const portal = wrapper.find('ModalPortal');

                expect(portal.exists()).toEqual(true);
            });
        });
    });

    describe('Scenario: User Interaction', () => {
        describe('When the close icon is clicked', () => {
            const wrapper = mount(<Modal {...props} />);

            it('Then it should call the close handler property', () => {
                const wrapper = mount(<Modal {...props} />);
                const icon = wrapper.find('ReactSVG');
                
                icon.simulate('click');
                
                expect(props.onClose).toHaveBeenCalled();
            });

            afterAll(() => {
                wrapper.unmount();
            });
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });
});