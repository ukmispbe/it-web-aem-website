import React from 'react';
import { mount} from 'enzyme';
import { act } from "react-dom/test-utils";
import Form from '../form'
import { registrationSubmit } from '../services/submit';
import { changePasswordConfig } from '../__mocks__/index';
import DigitalData from '../../scripts/DigitalData';
import { formTests } from '../__utils__/formTests';
import { inputTests } from '../__utils__/inputTests';


describe('Feature Change Password [Form]', () => {

    describe('Scenario Rendering', () => {
        let wrapper;
        act(() => {
            wrapper  = mount( <Form config={changePasswordConfig} submitFn={registrationSubmit} isocode={DigitalData.language} />);
        });
        
        // Check all the Forn & Wrapper Components
        formTests(wrapper);
    

        const inputs = wrapper.find("Memo(FieldValidationDisplay)");  
        it('Should render the 2 Input components', () => {                 
            expect(inputs.length).toBe(2);
        });
        
        inputTests(inputs, "currentPassword");
        inputTests(inputs, "newPassword");


        afterEach(() => {
            
        });     
    });

 })