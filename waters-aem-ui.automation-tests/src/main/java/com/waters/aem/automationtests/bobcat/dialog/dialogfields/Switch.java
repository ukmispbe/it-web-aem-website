package com.waters.aem.automationtests.bobcat.dialog.dialogfields;

import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.DialogField;
import com.cognifide.qa.bb.qualifier.PageObject;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

/**
 * Represents switch dialog field.
 */
@PageObject
public class Switch implements DialogField {

    @FindBy(css = ".coral3-Switch-input")
    private WebElement switchElement;

    /**
     * Performs click action on the checkbox.
     */
    public void select() {
        switchElement.click();
    }

    /**
     * Performs click action on the switch if passed param is 'true' string.
     *
     * @param value string boolean representation
     */
    @Override
    public void setValue(Object value) {
        if (Boolean.valueOf(String.valueOf(value))) {
            select();
        }
    }
}

