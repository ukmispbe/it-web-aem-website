jest.mock('../modal-portal');

import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import Modal, { Header } from '../index';

describe('Feature: Modal Component', () => {

    afterAll(() => {
        jest.restoreAllMocks();
    });

    describe('Scenario Rendering Modal', () => {

        describe('When the modal is rendered in a closed state', () => {
            it('Then the snapshot should match', () => {

                let isOpen = false;
                const toggleModal = jest.fn(() => {
                    isOpen = !isOpen;
                })

                const component = renderer.create(
                    <Modal isOpen={isOpen} onClose={toggleModal} />
                );

                expect(component).toMatchSnapshot();
            });
        });

        describe('When the modal is rendered in an open state', () => {
            it('Then the snapshot should match', () => {

                let isOpen = true;
                const toggleModal = jest.fn(() => {
                    isOpen = !isOpen;
                })

                const component = renderer.create(
                    <Modal isOpen={isOpen} onClose={toggleModal}/>
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
                    <Modal isOpen={isOpen} onClose={toggleModal}>
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
                    title: 'TEST TITLE'
                }

                let isOpen = true;
                const toggleModal = jest.fn(() => {
                    isOpen = !isOpen;
                })
                    
                const component = renderer.create(
                    <Modal isOpen={isOpen} onClose={toggleModal}>
                        <Header {...props} />
                    </Modal>
                );

                expect(component).toMatchSnapshot();
            });
        });

        describe('When rendering the Header with a title & Icon', () => {
            it('Then the snapshot should match', () => {
           
                const props = {
                    icon: '/content/dam/waters/en/brand-assets/icons/close.svg',
                    title: 'TEST TITLE'
                }

                let isOpen = true;
                const toggleModal = jest.fn(() => {
                    isOpen = !isOpen;
                })
                    
                const component = renderer.create(
                    <Modal isOpen={isOpen} onClose={toggleModal}>
                        <Header {...props} />
                    </Modal>
                );
                
                expect(component).toMatchSnapshot();
            });
        });
    });

    describe('Scenario: User Interaction', () => {
        describe('When the overlay is clicked on tablet & above', () => {
            it('Then it should call the close handler property', () => {
                let isOpen = true;
                const toggleModal = jest.fn(() => {
                    isOpen = !isOpen;
                })

                const component = mount(<Modal isOpen={isOpen} onClose={toggleModal} />);

                const overlay = component.find('.cmp-modal-box');
                overlay.simulate('click');

                expect(toggleModal).toHaveBeenCalled();
            });
        });

        describe('When the escape key is entered', () => {
            it('Then it should call the close handler property', () => {
                document.body.innerHTML = "<div class='cmp-modal-box' />";

                const eventLister = {};

                document.addEventListener = jest.fn((event, cb) => {
                    eventLister[event] = cb;
                });

                mount(<Modal isOpen={true} onClose={() => {}} />);

                expect(() => {
                    eventLister['keydown']({keyCode: 27, stopPropagation: () => {}, preventDefault: () => {}});
                }).not.toThrow(Error);
            });
        });

        describe('When a key is entered and it is not the escape key', () => {
            it('Then it should not call the close handler property', () => {
                document.body.innerHTML = "<div class='cmp-modal-box' />";

                let isOpen = true;
                const toggleModal = jest.fn(() => {
                    isOpen = !isOpen;
                })

                mount(<Modal isOpen={isOpen} onClose={toggleModal} />);

                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("keydown", false, true);
                evt.keyCode = 8;
                
                document.dispatchEvent(evt);

                expect(toggleModal).not.toHaveBeenCalled();
            });
        });

        describe('When the escape key is entered in IE', () => {
            it('Then it should call the close handler property', () => {
                document.body.innerHTML = "<div class='cmp-modal-box' />";

                const eventLister = {};

                document.addEventListener = jest.fn((event, cb) => {
                    eventLister[event] = cb;
                });

                mount(<Modal isOpen={true} onClose={() => {}} />);

                expect(() => {
                    eventLister['keydown']({which: 27, stopPropagation: () => {}, preventDefault: () => {}});
                }).not.toThrow(Error);
            });
        });

        describe('When the escape key is entered onKeyUp', () => {
            it('Then it should call the close handler property', () => {
                document.body.innerHTML = "<div class='cmp-modal-box' />";

                const eventLister = {};

                document.addEventListener = jest.fn((event, cb) => {
                    eventLister[event] = cb;
                });

                mount(<Modal isOpen={true} onClose={() => {}} />);

                expect(() => {
                    eventLister['keydown']({key: 27, stopPropagation: () => {}, preventDefault: () => {}});
                }).not.toThrow(Error);
            });
        });

        describe('When the close button is clicked', () => {
            it('Then it should call the close handler property', () => {

                const props = {
                    icon: '/content/dam/waters/en/brand-assets/icons/close.svg',
                    title: 'TEST TITLE'
                }

                let isOpen = true;
                const toggleModal = jest.fn(() => {
                    isOpen = !isOpen;
                })

                const component = mount(
                    <Modal isOpen={isOpen} onClose={toggleModal}>
                        <Header {...props} />
                    </Modal>
                );

                const icon = component.find('.cmp-modal__close-icon ReactSVG');
                icon.simulate('click');

                expect(toggleModal).toHaveBeenCalled();
            });
        });

    });
});
