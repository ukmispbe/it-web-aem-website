package com.waters.aem.automationtests.bobcat.dialog.dialogfields;

import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.DialogField;
import com.cognifide.qa.bb.qualifier.PageObject;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

/**
 * This class represents single line text dialog field.
 */
@PageObject
public class Textfield implements DialogField {

    @FindBy(css = ".coral-Textfield:not([type='hidden']")
    private WebElement input;

    /**
     * Sets text value of component.
     *
     * @param value desired string value.
     */
    @Override
    public void setValue(Object value) {
        input.clear();
        input.sendKeys(String.valueOf(value));
    }
}
