package com.waters.aem.automationtests.bobcat.dialog.dialogfields;

import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.DialogField;
import com.cognifide.qa.bb.constants.HtmlTags;
import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.cognifide.qa.bb.wait.BobcatWait;
import com.google.inject.Inject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

import static org.apache.commons.lang3.StringUtils.contains;

/**
 * This class represents path browser dialog field.
 */
@PageObject
public class PathBrowser implements DialogField {

    private static final String TEXT_FIELD_CLASS = "coral-Textfield";

    @FindBy(className = TEXT_FIELD_CLASS)
    private WebElement input;

    @Inject
    @CurrentScope
    private WebElement currentScope;

    @Inject
    private BobcatWait bobcatWait;

    /**
     * Sets path in path browser.
     *
     * @param value string path value.
     */
    @Override
    public void setValue(Object value) {
        if (contains(currentScope.getAttribute(HtmlTags.Attributes.CLASS), TEXT_FIELD_CLASS)) {
            currentScope.clear();
            currentScope.sendKeys(String.valueOf(value));
        } else {
            input.clear();
            input.sendKeys(String.valueOf(value));
        }

        bobcatWait.until(ExpectedConditions.visibilityOfElementLocated(
            By.cssSelector(".foundation-picker-buttonlist.coral-Overlay.is-open")));

        currentScope.findElement(By.className("coral-Form-fieldlabel")).click();
    }

}
