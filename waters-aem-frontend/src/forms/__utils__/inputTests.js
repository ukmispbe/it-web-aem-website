import { passwordTests } from './passwordTests';
import { keys} from './keys';
import { dropDownTests } from './dropDownTests';
import { act } from "react-dom/test-utils";
import { validIconsTest } from '../__utils__/validIconsTest';

export const inputTests = (inputs, inputType, checkDescription, isReadOnly) => {

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

        const label = memoInput.find(`label[htmlFor="${inputType}"]`);
        it('Should render the label field', () => {                 
            expect(label.length).toBe(1);
        });

        const input = memoInput.find(`${keys[inputType][2]}[name="${inputType}"]`);
        it('Should render the input field', () => {                 
            expect(input.length).toBe(1);
        });

        if (inputType === "email") {
            // console.log(input.debug({ verbose: true }));
            // console.log(fieldValidationDisplay.debug({ verbose: true }));;
            act(() => {
                input.simulate('change', { target: { value: 'paul_beard' } });
            });
            act(() => {
                input.simulate('blur');
            });
        }
        
        let isCurrentPassword = false;
        let isNewPassword = false;
        switch (inputType) {
            case "country": 
                dropDownTests(memoInput, isReadOnly);
                const iconHolderX = memoInput.find('Memo(Icons)');
                validIconsTest(memoInput, 1, isReadOnly);
                // if (!isReadOnly) {
                //     let iconHolder = memoInput.find('Memo(Icons)');
                //     const validIcon = iconHolder.find('ReactSVG[className="valid-icon"]');
                //     it('Should render the valid icon', () => {                 
                //         expect(validIcon.length).toBe(1);
                //     });
            
                //     const invalidIcon = iconHolder.find('ReactSVG[className="invalid-icon"]');
                //     it('Should render the invalid icon', () => {                 
                //         expect(invalidIcon.length).toBe(1);
                //     });
                // }
                // else {
                //     let iconHolder = memoInput.find('Memo(Icons)');
                //     const lockIcon = iconHolder.find('ReactSVG[className="lock-icon"]');
                //     console.log(iconHolder.debug());
                //     it('Should render the lock icon', () => {                 
                //         expect(lockIcon.length).toBe(1);
                //     });                   
                // }
            break;
            case "email": 
                validIconsTest(memoInput, 1, isReadOnly);
            break;
            case "password": 
                passwordTests(memoInput, isCurrentPassword, isNewPassword);
            break;
            case "newPassword": 
                isNewPassword = true;
                passwordTests(memoInput, isCurrentPassword, isNewPassword);
            break;            
            case "currentPassword": 
            isCurrentPassword = true;
                passwordTests(memoInput, isCurrentPassword, isNewPassword);
            break;
            default:
                validIconsTest(memoInput, 1, isReadOnly);
        }

        const displayMessage = memoInput.find(`Memo(DisplayMessage)[name="${inputType}"]`);
        it('Should render the displayMessage field', () => {                 
            expect(displayMessage.length).toBe(1);
        });
               
        const span = displayMessage.find('.cmp-form-field--errorText');
        it('Should render the displayMessage span', () => {                 
            expect(span.length).toBe(1);
        });

        switch (inputType) {
            case "email": 
                if (checkDescription) {
                    const desc = memoInput.find('.cmp-form_description');
                    it('Should render the Description field', () => {                 
                        expect(desc.length).toBe(1);
                    });
                }
            break;
            default:
        }
        
        
    });

   
};