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

export const checkRenderDropdown = (wrapper, fieldName) => {
    const dropdownContainer = wrapper.find(".cmp-form-field-dropdown");
    const label = dropdownContainer.find(`label[htmlFor="${fieldName}"]`);
    expect(label.exists()).toEqual(true);

    const input = dropdownContainer.find("input");
    expect(input.exists()).toEqual(true);
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


