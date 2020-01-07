const ExampleTest = {
    greet: (firstName, lastName) => `Hello ${firstName} ${lastName}`
}

describe('Given the ExampleTest object', () => {
    describe('When greeting with first and last name', () => {
        it('Then the message should contain both first and last name', () => {
            const firstName = 'John';
            const lastName = 'Snow';
            const actual = ExampleTest.greet(firstName, lastName);

            expect(actual.indexOf(firstName)).not.toEqual(-1);
            expect(actual.indexOf(lastName)).not.toEqual(-1);
        });
    });
});