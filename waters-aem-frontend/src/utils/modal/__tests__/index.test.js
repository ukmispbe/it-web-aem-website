jest.mock('../modal-portal');

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Modal, { Header } from '../index';

describe('Feature: Modal Component', () => {

    describe('Scenario Rendering Modal', () => {

        describe('When the modal is rendered in a closed state', () => {
            it('Then the snapshot should match', () => {
                const component = renderer.create(
                    <Modal isOpen={false} />
                );

                expect(component).toMatchSnapshot();
            });
        });

        describe('When the modal is rendered in an open state', () => {
            it('Then the snapshot should match', () => {

                const component = renderer.create(
                    <Modal isOpen={true} />
                );

                expect(component).toMatchSnapshot();
            });
        });

        describe('When the modal is rendered w/child components & open state', () => {
            it('Then the snapshot should match', () => {

                let isOpen = true;
                const toggleModal = jest.fn(() => {
                    isOpen = !isOpen;
                })
                    
                const component = renderer.create(
                    <Modal isOpen={true} onClose={toggleModal}>
                        <Header />
                    </Modal>
                );

                expect(component).toMatchSnapshot();
            });
        });

        describe('When the modal is passed a className as a prop', () => {
            it(`Then the wrapper '.cmp-modal-box' should contain that class name`, () => {
                const testClass = 'cmp-test-class';
                const component = shallow(<Modal isOpen={true} className={testClass} />);
                const element = component.find(`.${testClass}`);
                expect(element.length).toEqual(1);
            });
        });

    });

    describe('Scenario Rendering Header Sub-Component', () => {
        describe('When rendering the Header with a title', () => {
            it('Then the snapshot should match', () => {
           
                const props = {
                    title: 'TEST TITLE',
                    onClose: jest.fn(() => {})
                }

                const component = renderer.create(
                    <Header {...props} />
                );
                expect(component).toMatchSnapshot();
            });
        });

        describe('When rendering the Header with a title & Icon', () => {
            it('Then the snapshot should match', () => {
           
                const props = {
                    icon: '/content/dam/waters/en/brand-assets/icons/close.svg',
                    title: 'TEST TITLE',
                    onClose: jest.fn(() => {})
                }

                const component = renderer.create(
                    <Header {...props} />
                );
                expect(component).toMatchSnapshot();
            });
        });
    });
});
