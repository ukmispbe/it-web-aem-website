import React from 'react';
import { mount } from 'enzyme';
import { act } from "react-dom/test-utils";
import Form from '../form'
import { registrationSubmit } from '../services/submit';
import { personalConfig } from '../__mocks__/index';
import DigitalData from '../../scripts/DigitalData';
import { formTests } from '../__utils__/formTests';
import { inputTests } from '../__utils__/inputTests';
import { checkboxTests } from '../__utils__/checkboxTests';

describe('Feature Personal [Form]', () => {

    describe('Scenario Rendering', () => {

        let wrapper;
        act(() => {
            wrapper  = mount( <Form config={personalConfig} submitFn={registrationSubmit} isocode={DigitalData.language} />);
        });
        
        // Check all the Forn & Wrapper Components
        formTests(wrapper);

        const inputs = wrapper.find("Memo(FieldValidationDisplay)");  
        it('Should render the 7 Input components', () => {                 
            expect(inputs.length).toBe(7);
        });
        
        inputTests(inputs, "firstName");
        inputTests(inputs, "lastName");
        inputTests(inputs, "company");
        const isReadOnly = true;
        const checkDescription = false;
        inputTests(inputs, "email", checkDescription, isReadOnly);
        inputTests(inputs, "phone");
        checkboxTests(inputs, "communications");
     
        inputTests(inputs, "country", checkDescription , isReadOnly);
        // afterEach(() => {
        //     // const fieldValidationDisplay2 = inputs.find(`Memo(FieldValidationDisplay)[name="email"]`);
        //     // console.log(fieldValidationDisplay2.debug({ verbose: true }));;
        // });
    });

 })