import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Form from '../form';

import { personalConfig } from '../__mocks__/en_US/mockData';
import { checkRenderInput, 
        checkRenderCheckbox, 
        checkRenderDropdown, 
        checkEventsInput, 
        checkEventsCheckbox } from '../__utils__/utils';

const mockSubmitFn = jest.fn();
const isocode = 'en_us';

let wrapper;
beforeEach(async () => {
    await act(async () => {
        wrapper = mount(<Form config={personalConfig} submitFn={mockSubmitFn} isocode={isocode} />);
    })
});

afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
});

describe('Feature: Personal Details Form', () => {
    describe('Scenario: Rendering', () => {
        describe('When initial render', () => {
            it('Then the snapshot should match', async () => {
                let json
                await renderer.act(async () => {
                    json = renderer.create(<Form config={personalConfig} submitFn={mockSubmitFn} isocode={isocode} />);
                });
                expect(json).toMatchSnapshot();
            });

            it('Then it should render a firstName field',  async ()=>{                 
                    checkRenderInput(wrapper, "firstName");
            });

            it('Then it should render a lastName field', async () => {
                checkRenderInput(wrapper, "lastName");
            });

            it('Then it should render a company field', async () => {
                checkRenderInput(wrapper, "company");
            });

            it('Then it should render an email field', async () => {
                checkRenderInput(wrapper, "email");
            });

            it('Then it should render a phone field', async () => {
                checkRenderInput(wrapper, "phone");
            });

            let isDisabled  = true;
            it('Then it should render a country field', async () => {
                checkRenderDropdown(wrapper, "country", isDisabled);
            });
            
            it('Then it should render a receive communications field', async () => {
                checkRenderCheckbox(wrapper, "communications");
            });

            it('Then it should render a disabled submit button', async () => {
                const button = wrapper.find('button');
                expect(button.exists()).toEqual(true);
                expect(button.instance().disabled).toEqual(true);
                expect(button.instance().type).toEqual("submit");
            });

            it('Then it should render a form', async () => {
                const form = wrapper.find('form');
                expect(form.exists()).toEqual(true);
            });

        });

        describe('Checking Events', () => {
            it('Then it should check events on firstName field',  async ()=> {
                checkEventsInput(wrapper, "firstName");                       
            });

            it('Then it should check events on lastName field', async () => {
                checkEventsInput(wrapper, "lastName");
            });

            it('Then it should check events on company field', async () => {
                checkEventsInput(wrapper, "company");
            });

            it('Then it should check events on email field', async () => {
                checkEventsInput(wrapper, "email");
            });

            it('Then it should check events on phone field', async () => {
                checkEventsInput(wrapper, "phone");
            });      
            
            it('Then it should check events on communications field', async () => {
                checkEventsCheckbox(wrapper, "communications");
            });
            
            it('Then it should check events on submit button', async () => {
                const button = wrapper.find('button');
                button.props().onClick = mockSubmitFn;               
                button.props().onClick();
                expect(mockSubmitFn).toHaveBeenCalledTimes(1);
            });

            it('Then it should check events on form', async () => {
                const form = wrapper.find('form');
                form.props().onSubmit = mockSubmitFn;               
                form.props().onSubmit();
                expect(mockSubmitFn).toHaveBeenCalledTimes(1);
            });

        });
    });
});