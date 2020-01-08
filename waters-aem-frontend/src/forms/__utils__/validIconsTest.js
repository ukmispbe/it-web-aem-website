export const validIconsTest = (input, numberOfIcons, isReadOnly) => {
    
    const iconHolders = input.find('Memo(Icons)');
    it('Should render the Icon fields', () => {
        expect(iconHolders.length).toBe(numberOfIcons);
    });

    if (!isReadOnly) {
        const validIcons = iconHolders.find('ReactSVG[className="valid-icon"]');
        it('Should render the valid icons', () => {
            expect(validIcons.length).toBe(numberOfIcons);
        });

        const invalidIcons = iconHolders.find('ReactSVG[className="invalid-icon"]');
        it('Should render the invalid icons', () => {
            expect(invalidIcons.length).toBe(numberOfIcons);
        });
    }
    else {
        const lockIcon = iconHolders.find('ReactSVG[className="lock-icon"]');
        it('Should render the lock icon', () => {                 
            expect(lockIcon.length).toBe(1);
        });        
    }
}