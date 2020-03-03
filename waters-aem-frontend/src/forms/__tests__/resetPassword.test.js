import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Form from '../form';

import { resetPasswordConfig } from '../__mocks__/en_US/mockData';
import { checkRenderPassword, 
        checkRenderPasswordRequirements,
        checkRenderSubmitButton,
        checkEventsInput } from '../__utils__/utils';

const mockSubmitFn = jest.fn();
const isocode = 'en_us';

let wrapper;

beforeEach(async () => {
    await act(async () => {
        wrapper = mount(<Form config={resetPasswordConfig} submitFn={mockSubmitFn} isocode={isocode} />);
    })
});

afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
});

describe('Feature: Reset Password Form', () => {
    describe('Scenario: Rendering', () => {
        describe('When initial render', () => {
            it('Then the snapshot should match', async () => {
                let json
                await renderer.act(async () => {
                    json = renderer.create(<Form config={resetPasswordConfig} submitFn={mockSubmitFn} isocode={isocode} />);
                });
                expect(json).toMatchSnapshot();
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

            const isDisabledButton = true;
            it('Then it should render a disabled submit button', async () => {
                checkRenderSubmitButton(wrapper, "Reset Password", isDisabledButton);
            });

            it('Then it should render a form', async () => {
                const form = wrapper.find('form');
                expect(form.exists()).toEqual(true);
            });

        });

        describe('Checking Events', () => {
            
            it('Then it should check events on password field', async () => {
                checkEventsInput(wrapper, "password");
            });

            it('Then it should check events on confirm password field', async () => {
                checkEventsInput(wrapper, "confirmPassword");
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