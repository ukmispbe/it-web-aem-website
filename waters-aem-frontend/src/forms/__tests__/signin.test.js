import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Form from '../form';
import { signInConfig } from '../__mocks__/en_US/mockData';
import mockBodyHTML from '../../__mocks__/en_US/html/mock-body-html';
import { mockDigitalDataJSON } from '../../__mocks__/en_US/html/mock-html-json';

import { checkRenderInput, 
    checkRenderPassword, 
    checkRenderSubmitButton,
    checkEventsInput } from '../__utils__/utils';

const mockSubmitFn = jest.fn();
const isocode = 'en_us';
let wrapper;

beforeAll(() => {
    window.digitalData = mockDigitalDataJSON.html;

    Object.defineProperty(global.window, 'scrollTo', {
        value: jest.fn()
    });
});

beforeEach(async () => {
    await act(async () => {
        wrapper = mount(<Form config={signInConfig} submitFn={mockSubmitFn} isocode={isocode} />);
    })
});

afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
});

describe('Feature: Sign In Form', () => {
    document.body.innerHTML = mockBodyHTML;

    describe('Scenario: Rendering', () => {
        describe('When initial render', ()=>{

            it('Then the snapshot should match', () => {
                const json = renderer.create(<Form config={signInConfig} submitFn={mockSubmitFn} isocode={isocode} />);
                expect(json).toMatchSnapshot();
            });

            it('Then it should render an email field', async () => {
                checkRenderInput(wrapper, "email");
            });

            let isValidation = false;
            it('Then it should render a password field', async () => {
                checkRenderPassword(wrapper, "password", isValidation);
            });

            it('Then it should render a link', async ()=>{
                const link = wrapper.find('div.cmp-form-field-link--forgotPassword').find('a');
                expect(link.exists()).toEqual(true);
            });

            let isDisabled = false;
            it('Then it should not render a disabled submit button', async () => {
                checkRenderSubmitButton(wrapper, "SIGN IN", isDisabled);
            });
        });

        describe('Checking Events', () => {

            it('Then it should check events on email field', async () => {
                checkEventsInput(wrapper, "email");
            });
            
            it('Then it should check events on password field', async () => {
                checkEventsInput(wrapper, "password");
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