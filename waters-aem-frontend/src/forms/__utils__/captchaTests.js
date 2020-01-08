import { keys} from './keys';
import { act } from "react-dom/test-utils";

export const captchaTests = (inputs, inputType) => {

    describe(`Scenario ${inputType} Input Rendering`, () => {

        const fieldValidationDisplay = inputs.find(`Memo(FieldValidationDisplay)[name="${inputType}"]`);
        it('Should render the FieldValidationDisplay field', () => {                 
            expect(fieldValidationDisplay.length).toBe(1);
        });

        const mainDiv = fieldValidationDisplay.find(`.cmp-form-field-${keys[inputType][0]}`);  
        it('Should render the main div field', () => {                 
            expect(mainDiv.length).toBe(1);
        });

        const memoInput = mainDiv.find(`Memo(${keys[inputType][1]})[name="${inputType}"]`);
        it('Should render the input wrapper field', () => {                 
            expect(memoInput.length).toBe(1);
        });

        const  asyncScriptLoaderReCAPTCHA = mainDiv.find('AsyncScriptLoader(ReCAPTCHA)');
        it('Should render the asyncScriptLoaderReCAPTCHA field', () => {                 
            expect(memoInput.length).toBe(1);
        });
        const asyncScriptLoader = asyncScriptLoaderReCAPTCHA.find('AsyncScriptLoader');
        it('Should render the asyncScriptLoader field', () => {                 
            expect(memoInput.length).toBe(1);
        });
        const reCAPTCHA = asyncScriptLoader.find('ReCAPTCHA');
        it('Should render the reCAPTCHA field', () => {                 
            expect(reCAPTCHA.length).toBe(1);
        });
        
        
        
    });
};
