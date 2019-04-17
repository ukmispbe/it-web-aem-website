package com.waters.aem.automationtests.core.dialog.dialogfields;

import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.DialogField;
import com.cognifide.qa.bb.qualifier.PageObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.List;

/**
 * A {@link DialogField} representing a radio group.
 */
@PageObject
public class RadioGroup implements DialogField {

    @FindBy(css = ".coral-Radio-description")
    private List<WebElement> radioOptions;

    @Override
    public void setValue(Object value) {
        WebElement radioLabel = radioOptions.stream()
            .filter(radioOption -> radioOption.getText().equals(value)).findFirst().orElseThrow(
                () -> new IllegalStateException("Provided option is not present in the group"));

        radioLabel.findElement(By.xpath(".//..")).click();
    }
}
