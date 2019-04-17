package com.waters.aem.automationtests.core.dialog.dialogfields;

import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.DialogField;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;

import java.util.Arrays;
import java.util.List;

import static org.openqa.selenium.Keys.BACK_SPACE;
import static org.openqa.selenium.Keys.CONTROL;
import static org.openqa.selenium.Keys.RETURN;

/**
 * This class represents rich text dialog field.
 */
@PageObject
public class RichText implements DialogField {

    @FindBy(css = ".coral-RichText")
    private WebElement input;

    @Inject
    private Actions actions;

    /**
     * This method deleted already set rich text value and sets new one.
     *
     * @param value desired string value of field. \\\\n will be replaced with RETURN key value.
     */
    @Override
    public void setValue(Object value) {
        String text = (String) value;

        actions.keyDown(input, CONTROL) //
            .sendKeys("a") //
            .keyUp(CONTROL) //
            .sendKeys(BACK_SPACE);

        List<String> textDividedByLines = Arrays.asList(text.split("\\\\n"));

        for (int i = 0; i < textDividedByLines.size(); i++) {
            if (i != 0) {
                actions.sendKeys(RETURN);
            }
            actions.sendKeys(textDividedByLines.get(i).trim());
        }

        actions.perform();
    }
}
