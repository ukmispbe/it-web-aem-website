import { keys, keys2 } from './keys';

export const dropDownTests = (input, isReadOnly) => {

    const stateManager = input.find('StateManager');
    it('Should render the State Manager field', () => {
        expect(stateManager.length).toBe(1);
    });

    const select = input.find('Select[name="country"]');
    it('Should render the Select field', () => {
        expect(select.length).toBe(1);
    });

    const selectContainer = select.find('SelectContainer');
    it('Should render the Select Container', () => {
        expect(selectContainer.length).toBe(1);
    });
 
    const dropDownControl = selectContainer.find('.cmp-custom-dropdown__control');
    it('Should render the dropDownControl', () => {
        expect(dropDownControl.length).toBe(1);
    });

    const dropDownValueContainer = dropDownControl.find('.cmp-custom-dropdown__value-container');
    it('Should render the dropDownValueContainer', () => {
        expect(dropDownValueContainer.length).toBe(1);
    });

    const dropDownValuePlaceholder = dropDownValueContainer.find('.cmp-custom-dropdown__placeholder');
    it('Should render the dropDownValuePlaceholder', () => {
        expect(dropDownValuePlaceholder.length).toBe(1);
    });

    const inputControl = dropDownControl.find('input');
    it('Should render the dropDownValueContainer input control', () => {
        expect(inputControl.length).toBe(1);
    });

    const autosizeInput = dropDownControl.find('AutosizeInput');
    it('Should render the autosizeInput', () => {
        expect(autosizeInput.length).toBe(1);
    });

    const customDropDownInput = autosizeInput.find('div[className="cmp-custom-dropdown__input"]');
    it('Should render the customDropDownInput', () => {
        expect(customDropDownInput.length).toBe(1);
    });

    const dropDownIndicators = selectContainer.find('.cmp-custom-dropdown__indicators');
    it('Should render the dropDownIndicators', () => {
        expect(dropDownIndicators.length).toBe(1);
    });

    const dropDownIndicatorSeperator = selectContainer.find('.cmp-custom-dropdown__indicator-separator');
    it('Should render the dropDownIndicatorSeperator', () => {
        expect(dropDownIndicatorSeperator.length).toBe(1);
    });

    const dropDownIndicator = dropDownIndicators.find('.cmp-custom-dropdown__dropdown-indicator');
    it('Should render the dropDownIndicator', () => {
        expect(dropDownIndicator.length).toBe(1);
    });

    if (!isReadOnly) {
        const hiddenInputField = stateManager.find('input[type="hidden"]');
        it('Should render the hiddenInputField field', () => {
            expect(hiddenInputField.length).toBe(1);
        });
    }
}