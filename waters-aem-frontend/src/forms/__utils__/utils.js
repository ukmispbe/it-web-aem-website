export const checkRenderInput = (wrapper, fieldName) => {
    const label = wrapper.find(`label[htmlFor="${fieldName}"]`);
    expect(label.exists()).toEqual(true);

    const input = wrapper.find(`input[name="${fieldName}"]`);
    expect(input.exists()).toEqual(true);
}

export const checkRenderCheckbox = (wrapper, fieldName) => {
    const label = wrapper.find(`label[htmlFor="${fieldName}"]`);
    expect(label.exists()).toEqual(true);

    const input = wrapper.find(`input[name="${fieldName}"]`);
    expect(input.exists()).toEqual(true);
}

export const checkRenderDropdown = (wrapper, fieldName, isDisabled) => {
    const dropdownContainer = wrapper.find(".cmp-form-field-dropdown");
    const label = dropdownContainer.find(`label[htmlFor="${fieldName}"]`);
    expect(label.exists()).toEqual(true);

    const input = dropdownContainer.find("input");
    expect(input.exists()).toEqual(true);

    expect(input.first().instance().disabled).toEqual(isDisabled);
    if (!isDisabled) {
        const hiddenInput = dropdownContainer.find(`input[name="${fieldName}"]`);
        expect(hiddenInput.exists()).toEqual(true);
        expect(hiddenInput.instance().type).toEqual("hidden");
    }

}

export const checkRenderDivByClass = (wrapper, className, textValue) => {
    const div = wrapper.find(`.${className}`);
    expect(div.exists()).toEqual(true);
    expect(div.first().text()).toContain(textValue);
}

export const checkRenderPassword = (wrapper, fieldName, isValidation) => {
    const passwordDiv =  wrapper.find(".cmp-form-field-password");
    let innerPasswordDiv = passwordDiv.find(".cmp-form-field--input").first();
    if (isValidation) {
        innerPasswordDiv = passwordDiv.find(".cmp-form-field--input").last();
    }
    const label = passwordDiv.find(`label[htmlFor="${fieldName}"]`);
    expect(label.exists()).toEqual(true);
    const input = passwordDiv.find(`input[name="${fieldName}"]`);
    expect(input.exists()).toEqual(true);
    expect(input.instance().type).toEqual("password");
    expect(innerPasswordDiv.find('ReactSVG[className="showHide-icon toggled"]').exists()).toEqual(true);
    expect(innerPasswordDiv.find('div[className="showHide-icon toggled"]').exists()).toEqual(true);
    expect(innerPasswordDiv.find('ReactSVG[className="showHideOff-icon"]').exists()).toEqual(true);
    expect(innerPasswordDiv.find('div[className="showHideOff-icon"]').exists()).toEqual(true);
    expect(innerPasswordDiv.find('ReactSVG[className="valid-icon"]').exists()).toEqual(true);
    expect(innerPasswordDiv.find('div[className="valid-icon"]').exists()).toEqual(true);
    expect(innerPasswordDiv.find('ReactSVG[className="invalid-icon"]').exists()).toEqual(true);
    expect(innerPasswordDiv.find('div[className="invalid-icon"]').exists()).toEqual(true);
}

export const checkRenderPasswordRequirements = (wrapper) => {
    const container = wrapper.find(".cmp-form-field--input-requirements");
    expect(container.exists()).toEqual(true);
    checkRenderDivByClass(container, "requirements-title", "Your password must include");
    checkRenderSingleValidation(container, "shortPassword", 0, "at least 8 characters");
    checkRenderSingleValidation(container, "noUppercase", 1, "at least 1 uppercase letter");
    checkRenderSingleValidation(container, "noLowercase", 2, "at least 1 lowercase letter");
    checkRenderSingleValidation(container, "noDigits", 3, "at least 1 number");
    checkRenderSingleValidation(container, "noSpecial", 4, "at least 1 symbol (for example, !, $, #, %)");
}

export const checkRenderSingleValidation = (container, id, index, textValue) => {
    const reactSVG = container.find(`ReactSVG[id="${id}"]`);
    expect(reactSVG.length).toBe(1);
    const div = container.find(`div[id="${id}"]`);
    expect(div.length).toBe(1);
    expect(container.find(".requirements-info").at(index).text()).toContain(textValue);
}

export const checkRenderReCAPTCHA = (wrapper, sitekey) => {
    const reCAPTCHADiv =  wrapper.find(".cmp-form-field-captcha");
    expect(reCAPTCHADiv.exists()).toEqual(true);
    const reCAPTCHA = reCAPTCHADiv.find("ReCAPTCHA");
    expect(reCAPTCHA.exists()).toEqual(true);
    expect(reCAPTCHA.props().sitekey).toEqual(sitekey)
}

export const checkRenderSubmitButton = (wrapper, buttonText, isDisabled) => {
    const button = wrapper.find('button');
    expect(button.exists()).toEqual(true);
    expect(button.instance().disabled).toEqual(isDisabled);
    expect(button.instance().type).toEqual("submit");
    expect(button.text()).toEqual(buttonText);
}

const mockSubmitFn = jest.fn();

export const checkEventsInput = (wrapper, fieldName) => {

    const input = wrapper.find(`input[name="${fieldName}"]`);
    input.props().onBlur = mockSubmitFn;               
    input.props().onBlur();
    expect(mockSubmitFn).toHaveBeenCalledTimes(1);

    input.props().onChange = mockSubmitFn;               
    input.props().onChange();
    expect(mockSubmitFn).toHaveBeenCalledTimes(2); 

    input.props().onFocus = mockSubmitFn;               
    input.props().onFocus();
    expect(mockSubmitFn).toHaveBeenCalledTimes(3);       
}

export const checkEventsDropdown = (wrapper, fieldName) => {
    const dropdownContainer = wrapper.find(".cmp-form-field-dropdown");
    const input = dropdownContainer.find("input");
    input.props().onBlur = mockSubmitFn;               
    input.props().onBlur();
    expect(mockSubmitFn).toHaveBeenCalledTimes(1);

    input.props().onChange = mockSubmitFn;               
    input.props().onChange();
    expect(mockSubmitFn).toHaveBeenCalledTimes(2); 

    input.props().onFocus = mockSubmitFn;               
    input.props().onFocus();
    expect(mockSubmitFn).toHaveBeenCalledTimes(3);       
}

export const checkEventsCheckbox = (wrapper, fieldName) => {
    const input = wrapper.find(`input[name="${fieldName}"]`);
    input.props().onChange = mockSubmitFn;               
    input.props().onChange();
    expect(mockSubmitFn).toHaveBeenCalledTimes(1); 
}

export const checkEventsReCAPTCHA = (wrapper) => {
    const reCAPTCHA = wrapper.find("ReCAPTCHA");
    reCAPTCHA.props().onChange = mockSubmitFn;               
    reCAPTCHA.props().onChange();
    expect(mockSubmitFn).toHaveBeenCalledTimes(1); 
}




