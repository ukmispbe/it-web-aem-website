import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Form from '../form';

import { changePasswordConfig } from '../__mocks__/en_US/mockData';
import { checkRenderInput,
        checkRenderPassword, 
        checkRenderPasswordRequirements,
        checkRenderSubmitButton,
        checkEventsInput } from '../__utils__/utils';

const mockSubmitFn = jest.fn();
const isocode = 'en_us';

let wrapper;

beforeEach(async () => {
    await act(async () => {
        wrapper = mount(<Form config={changePasswordConfig} submitFn={mockSubmitFn} isocode={isocode} />);
    })
});

afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
});

describe('Feature: Change Password Form', () => {
    describe('Scenario: Rendering', () => {
        describe('When initial render', () => {
            it('Then the snapshot should match', async () => {
                let json
                await renderer.act(async () => {
                    json = renderer.create(<Form config={changePasswordConfig} submitFn={mockSubmitFn} isocode={isocode} />);
                });
                
                expect(json).toMatchSnapshot();
            });

            it('Then it should render a current password field',  async ()=>{                 
                checkRenderInput(wrapper, "currentPassword");
            });

            let isValidation = false;
            it('Then it should render a password field', async () => {
                checkRenderPassword(wrapper, "newPassword", isValidation);
            });

            it('Then it should render a password validation div', async () => {
                checkRenderPasswordRequirements(wrapper);
            });

            isValidation = true;
            it('Then it should render a password confirmation field', async () => {
                checkRenderPassword(wrapper, "confirmNewPassword", isValidation);
            });           

            const isDisabledButton = true;
            it('Then it should render a disabled submit button', async () => {
                checkRenderSubmitButton(wrapper, "Change Password", isDisabledButton);
            });

            it('Then it should render a form', async () => {
                const form = wrapper.find('form');
                expect(form.exists()).toEqual(true);
            });

        });

        describe('Checking Events', () => {

            it('Then it should check events on current password field',  async ()=> {
                checkEventsInput(wrapper, "currentPassword");                       
            });
            
            it('Then it should check events on password field', async () => {
                checkEventsInput(wrapper, "newPassword");
            });

            it('Then it should check events on confirm password field', async () => {
                checkEventsInput(wrapper, "confirmNewPassword");
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