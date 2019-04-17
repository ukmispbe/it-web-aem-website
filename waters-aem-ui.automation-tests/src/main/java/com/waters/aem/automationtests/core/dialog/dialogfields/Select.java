package com.waters.aem.automationtests.core.dialog.dialogfields;

import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.DialogField;
import com.cognifide.qa.bb.qualifier.PageObject;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.List;

/**
 * This class represent multiple choice select dialog component.
 */
@PageObject
public class Select implements DialogField {

    private static final String SELECT_OPTIONS_CSS = ".coral-SelectList-item";

    @FindBy(css = ".coral-Select")
    private WebElement selectField;

    /**
     * Selects given options of select component.
     *
     * @param value String value of comma delimited field names which will be selected.
     */
    @Override
    public void setValue(Object value) {
        selectField.click();
        List<WebElement> options = selectField.findElements(By.cssSelector(SELECT_OPTIONS_CSS));
        options.stream().filter(o -> value.toString().equals(o.getText()))
            .findFirst()
            .orElseThrow(() -> new NoSuchElementException(
                String.format("Option with text %s not found", value.toString()))).click();
    }
}
