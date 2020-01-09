import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Form from '../form';

const config =
    {
        "submitEndpoint": "https://test-www.waters.com:8443/api/waters/user/v1/login",
        "siteKey": "6Ld5WMIUAAAAACZQvEc7I75aEg5AC8YUUO0W7zRG",
        "formName": "signin",
        "buttonText": "SIGN IN",
        "icons": {
            "checkmarkIcon": "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
            "validIcon": "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
            "invalidIcon": "/content/dam/waters/en/brand-assets/icons/attention.svg",
            "eyeIcon": "/content/dam/waters/en/brand-assets/icons/eye.svg",
            "eyeOffIcon": "/content/dam/waters/en/brand-assets/icons/eye-off.svg",
            "signInIcon": "/content/dam/waters/en/brand-assets/icons/user.svg"
        },
        "fields": [
            {
                "type": "email",
                "name": "email",
                "label": "Email Address",
                "validation": {
                    "required": true,
                    "validateFnName": "email",
                    "requiredMsg": "Please enter a valid email address.",
                    "validationMsg": "Please enter a valid email address."
                }
            },
            {
                "type": "password",
                "name": "password",
                "label": "Password",
                "validation": {
                    "required": true,
                    "validateFnName": "noValidation",
                    "requiredMsg": ""
                }
            },
            {
                "type": "link",
                "name": "forgotPassword",
                "text": "Having trouble signing in?",
                "link": "/nextgen/be.html"
            }
        ]
    };

const submitFn = jest.fn();
const isocode = 'en_us';
// Silence console.error warnings for now
console.error = jest.fn();

describe('Feature: Sign In Form', () => {
    describe('Scenario: Rendering', () => {
        describe('When initial render', ()=>{
            it('Then it should render an email address field', async ()=>{
                let wrapper;
                await act(async () => {
                    wrapper = mount(<Form config={config} submitFn={submitFn} isocode={isocode} />);
                });
                wrapper.setProps();

                const label = wrapper.find('label[htmlFor="email"]');
                expect(label.exists()).toEqual(true);

                const input = wrapper.find('input[name="email"]');
                expect(input.exists()).toEqual(true);
            })
            it('Then it should render a password field', async ()=>{
                let wrapper;
                await act(async () => {
                    wrapper = mount(<Form config={config} submitFn={submitFn} isocode={isocode} />);
                });
                wrapper.setProps();

                const label = wrapper.find('label[htmlFor="password"]');
                expect(label.exists()).toEqual(true);

                const input = wrapper.find('input[name="password"]');
                expect(input.exists()).toEqual(true);
            })
            it('Then it should render a link', async ()=>{
                let wrapper;
                await act(async () => {
                    wrapper = mount(<Form config={config} submitFn={submitFn} isocode={isocode} />);
                });
                wrapper.setProps();

                const link = wrapper.find('div.cmp-form-field-link--forgotPassword').find('a');
                expect(link.exists()).toEqual(true);
                expect(link.text()).toEqual('Having trouble signing in?');
            })
            it('Then it should render a submit button', async ()=>{
                let wrapper;
                await act(async () => {
                    wrapper = mount(<Form config={config} submitFn={submitFn} isocode={isocode} />);
                });
                wrapper.setProps();

                const button = wrapper.find('button');
                expect(button.exists()).toEqual(true);
                expect(button.text()).toEqual('SIGN IN');
            })
        })
    })
})