import React from 'react';
import { mount } from 'enzyme';
import { act } from "react-dom/test-utils";
import Form from '../form'
import { registrationSubmit } from '../services/submit';
import { registrationConfig } from '../__mocks__/index';
import DigitalData from '../../scripts/DigitalData';
import { formTests } from '../__utils__/formTests';
import { inputTests } from '../__utils__/inputTests';
import { checkboxTests } from '../__utils__/checkboxTests';
import  { captchaTests } from '../__utils__/captchaTests';

describe('Feature Registration [Form]', () => {

    describe('Scenario Rendering', () => {
        
        let wrapper;
        act(() => {
            wrapper  = mount( <Form config={registrationConfig} submitFn={registrationSubmit} isocode={DigitalData.language} />);
        });

        // Check all the Forn & Wrapper Components
        formTests(wrapper);

        const inputs = wrapper.find("Memo(FieldValidationDisplay)");  
        it('Should render the 9 Input components', () => {                 
            expect(inputs.length).toBe(9);
        });
        
        const checkDescription = true;
        inputTests(inputs, "email", checkDescription);
        inputTests(inputs, "firstName");
        inputTests(inputs, "lastName");
        inputTests(inputs, "company");
        inputTests(inputs, "country");
        inputTests(inputs, "password");
        checkboxTests(inputs, "communications");
        checkboxTests(inputs, "privacy");
        captchaTests(inputs, "captcha");
        
        afterEach(() => {
            //wrapper = null;
        });
    });

 })