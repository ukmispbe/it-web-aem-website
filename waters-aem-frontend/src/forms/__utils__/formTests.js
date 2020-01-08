export const formTests = (wrapper) => {
     
    describe('Scenario Form Rendering', () => {
        const errorBoundaryForm = wrapper.find("ErrorBoundaryForm"); 
        it('Should render the ErrorBoundaryForm component', () => {          
        expect(errorBoundaryForm.length).toBe(1);
        });

        const errorBoundary = errorBoundaryForm.find("ErrorBoundary");  
        it('Should render the ErrorBoundary component', () => {                 
            expect(errorBoundary.length).toBe(1);
        });

        const Form = errorBoundary.find("Form");  
        it('Should render the Form component', () => {                 
            expect(Form.length).toBe(1);
        });

        const form = errorBoundary.find(".cmp-form");  
        it('Should render the form component', () => {                 
            expect(form.length).toBe(1);
        });

        const FormStateProvider = form.find("FormStateProvider");  
        it('Should render the FormStateProvider component', () => {                 
            expect(FormStateProvider.length).toBe(1);
        });

        const ErrorsProvider = FormStateProvider.find("ErrorsProvider");  
        it('Should render the ErrorsProvider component', () => {                 
            expect(ErrorsProvider.length).toBe(1);
        });

        it('Should render the Submit Button in a disabled state', () => {
            const button = wrapper.find('button');
            expect(button.length).toBe(1);
            expect(button.getDOMNode().disabled).toBe(true);            
        });
    });
};