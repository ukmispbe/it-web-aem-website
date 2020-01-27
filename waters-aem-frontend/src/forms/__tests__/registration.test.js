import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Form from '../form';

import { registrationConfig } from '../__mocks__/en_US/mockData';
import { checkRenderInput, 
        checkRenderCheckbox, 
        checkRenderDropdown,
        checkRenderDivByClass,
        checkRenderPassword, 
        checkRenderPasswordRequirements,
        checkRenderReCAPTCHA,
        checkEventsReCAPTCHA,
        checkRenderSubmitButton,
        checkEventsInput, 
        checkEventsCheckbox } from '../__utils__/utils';

const mockSubmitFn = jest.fn();
const isocode = 'en_us';
const sitekey = "6Ld5WMIUAAAAACZQvEc7I75aEg5AC8YUUO0W7zRG";

let wrapper;

beforeEach(async () => {
    await act(async () => {
        wrapper = mount(<Form config={registrationConfig} submitFn={mockSubmitFn} isocode={isocode} />);
    })
});

afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
});

describe('Feature: Registration Form', () => {
    describe('Scenario: Rendering', () => {
        describe('When initial render', () => {
            it('Then the snapshot should match', async () => {
                let json
                await renderer.act(async () => {
                    json = renderer.create(<Form config={registrationConfig} submitFn={mockSubmitFn} isocode={isocode} />);
                });
                expect(json).toMatchSnapshot();
            });

            it('Then it should render an email field', async () => {
                checkRenderInput(wrapper, "email");
            });

            it('Then it should render an email div field', async () => {
                checkRenderDivByClass(wrapper, "cmp-form_description", "This will be your username.");
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
            
            let isDisabledDropDown  = false;
            it('Then it should render a country field', async () => {
                checkRenderDropdown(wrapper, "country", isDisabledDropDown);
            });

            let isValidation = false;
            it('Then it should render a password field', async () => {
                checkRenderPassword(wrapper, "password", isValidation);
            });

            it('Then it should render a password validation div', async () => {
                checkRenderPasswordRequirements(wrapper);
            });

            isValidation = true;
            it('Then it should render a password confirmation field', async () => {
                checkRenderPassword(wrapper, "confirmPassword", isValidation);
            });
            
            it('Then it should render a receive communications checkbox field', async () => {
                checkRenderCheckbox(wrapper, "communications");
            });

            it('Then it should render a privacy checkbox field', async () => {
                checkRenderCheckbox(wrapper, "privacy");
            });

            it('Then it should render a reCaptcha field', async () => {
                checkRenderReCAPTCHA(wrapper, sitekey);
            });

            const isDisabledButton = true;
            it('Then it should render a disabled submit button', async () => {
                checkRenderSubmitButton(wrapper, "Create Account", isDisabledButton);
            });

            it('Then it should render a form', async () => {
                const form = wrapper.find('form');
                expect(form.exists()).toEqual(true);
            });

        });

        describe('Checking Events', () => {

            it('Then it should check events on email field', async () => {
                checkEventsInput(wrapper, "email");
            });
            
            it('Then it should check events on firstName field',  async ()=> {
                checkEventsInput(wrapper, "firstName");                       
            });

            it('Then it should check events on lastName field', async () => {
                checkEventsInput(wrapper, "lastName");
            });

            it('Then it should check events on company field', async () => {
                checkEventsInput(wrapper, "company");
            });
            
            it('Then it should check events on password field', async () => {
                checkEventsInput(wrapper, "password");
            });

            it('Then it should check events on confirm password field', async () => {
                checkEventsInput(wrapper, "confirmPassword");
            });

            it('Then it should check events on communications field', async () => {
                checkEventsCheckbox(wrapper, "communications");
            });

            it('Then it should check events on privacy checkbox field', async () => {
                checkEventsCheckbox(wrapper, "privacy");
            });

            it('Then it should check events on ReCAPTCHA field', async () => {
                checkEventsReCAPTCHA(wrapper);
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