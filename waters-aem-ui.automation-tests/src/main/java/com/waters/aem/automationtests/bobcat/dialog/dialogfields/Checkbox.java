package com.waters.aem.automationtests.bobcat.dialog.dialogfields;

import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.DialogField;
import com.cognifide.qa.bb.qualifier.PageObject;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

/**
 * Represents checkbox dialog field.
 */
@PageObject
public class Checkbox implements DialogField {

    @FindBy(css = ".coral-Checkbox-input")
    private WebElement checkboxElement;

    /**
     * Performs click action on the checkbox.
     */
    public void select() {
        checkboxElement.click();
    }

    /**
     * Performs click action on the checkbox if passed param is 'true' string.
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
