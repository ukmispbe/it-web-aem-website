import React from 'react';
import { mount } from 'enzyme';
import { act } from "react-dom/test-utils";
import Form from '../form'
import { registrationSubmit } from '../services/submit';
import { troubleSigningInConfig } from '../__mocks__/index';
import DigitalData from '../../scripts/DigitalData';
import { formTests } from '../__utils__/formTests';
import { inputTests } from '../__utils__/inputTests';
import  { captchaTests } from '../__utils__/captchaTests';

describe('Feature Trouble Signing In [Form]', () => {

    describe('Scenario Rendering', () => {

        let wrapper;
        act(() => {
            wrapper  = mount( <Form config={troubleSigningInConfig} submitFn={registrationSubmit} isocode={DigitalData.language} />);
        });

        // Check all the Forn & Wrapper Components
        formTests(wrapper);

        const inputs = wrapper.find("Memo(FieldValidationDisplay)");  
        it('Should render the 2 Input components', () => {                 
            expect(inputs.length).toBe(2);
        });
        
        const checkDescription = false;
        const isReadOnly = false;
        inputTests(inputs, "email", checkDescription, isReadOnly);
        captchaTests(inputs, "captcha");

        afterEach(() => {
            // const fieldValidationDisplay2 = inputs.find(`Memo(FieldValidationDisplay)[name="email"]`);
            // console.log(fieldValidationDisplay2.debug({ verbose: true }));;
        });
    });

 })