import { keys } from './keys';

export const checkboxTests = (inputs, inputType) => {
    describe(`Scenario ${inputType} Input Rendering`, () => {
        const fieldValidationDisplay = inputs.find(`Memo(FieldValidationDisplay)[name="${inputType}"]`);
        it('Should render the FieldValidationDisplay field', () => {                 
            expect(fieldValidationDisplay.length).toBe(1);
        });

        const checkboxOrRadio = fieldValidationDisplay.find(`Memo(CheckboxOrRadio)[name="${inputType}"]`);
        it('Should render the checkboxOrRadio field', () => {                 
            expect(checkboxOrRadio.length).toBe(1);
        });

        const checkbox = checkboxOrRadio.find(`input[name="${inputType}"]`);
        it('Should render the checkbox field', () => {                 
            expect(checkbox.length).toBe(1);
        });

        const label = checkboxOrRadio.find(`label[htmlFor="${inputType}"]`);
        it('Should render the label field', () => {                 
            expect(label.length).toBe(1);
        });
    });
}