export const passwordTests = (input, isCurrentPassword, isNewPassword) => {

    let numberOfIcons = 2;
    if (isCurrentPassword) {
        numberOfIcons = 1;
    }
    
    const iconHolders = input.find('Memo(Icons)');
    it('Should render the Icon fields', () => {
        expect(iconHolders.length).toBe(numberOfIcons);
    });

    const validIcons = iconHolders.find('ReactSVG[className="valid-icon"]');
    it('Should render the valid icons', () => {
        expect(validIcons.length).toBe(numberOfIcons);
    });

    const invalidIcons = iconHolders.find('ReactSVG[className="invalid-icon"]');
    it('Should render the invalid icons', () => {
        expect(invalidIcons.length).toBe(numberOfIcons);
    });

    const showHideOffIcons = iconHolders.find('ReactSVG[className="showHideOff-icon"]');
    it('Should render the showHideOff icons', () => {
        expect(showHideOffIcons.length).toBe(numberOfIcons);
    });

    const showHideIcons = iconHolders.find('ReactSVG[className="showHide-icon toggled"]');
    it('Should render the showHide icons', () => {
        expect(showHideIcons.length).toBe(numberOfIcons);
    });
    if (!isCurrentPassword) {
        describe('Password Requirements', () => {

            const requirementsDiv = input.find('ForwardRef(Requirements)');
            it('Should render the Requirements Div', () => {
                expect(requirementsDiv.length).toBe(1);
            });

            it('Should render the short Password warning', () => {
                expect(requirementsDiv.find('ReactSVG[id="shortPassword"]').length).toBe(1);
            });

            it('Should render the no uppercase warning', () => {
                expect(requirementsDiv.find('ReactSVG[id="noUppercase"]').length).toBe(1);
            });

            it('Should render the no lowercase warning', () => {
                expect(requirementsDiv.find('ReactSVG[id="noLowercase"]').length).toBe(1);
            });
            it('Should render the no digits warning', () => {
                expect(requirementsDiv.find('ReactSVG[id="noDigits"]').length).toBe(1);
            });

            it('Should render the no special characters warning', () => {
                expect(requirementsDiv.find('ReactSVG[id="noSpecial"]').length).toBe(1);
            });
        });

        describe('Confirm Password Requirements', () => {

            let searchString = "confirmPassword";
            if (isNewPassword) {
                searchString = "confirmNewPassword";
            }

            const mainInput = input.find(`Input[name="${searchString}"]`);
            it('Should render the confirm password Input wrapper', () => {
                expect(mainInput.length).toBe(1);
            });

            const label = mainInput.find(`label[htmlFor="${searchString}"]`);
            it('Should render the label field', () => {
                expect(label.length).toBe(1);
            });

            const minorInput = input.find(`input[name="${searchString}"]`);
            it('Should render the confirm password input', () => {
                expect(minorInput.length).toBe(1);
            });
            
        });
    }
};
