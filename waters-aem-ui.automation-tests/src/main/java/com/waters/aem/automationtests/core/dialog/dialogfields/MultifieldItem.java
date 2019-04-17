package com.waters.aem.automationtests.core.dialog.dialogfields;

import com.cognifide.qa.bb.aem.core.component.configuration.FieldConfig;
import com.cognifide.qa.bb.aem.core.component.configuration.MultifieldEntry;
import com.cognifide.qa.bb.aem.core.component.dialog.DialogFieldRetriever;
import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.DialogField;
import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

/**
 * A {@link DialogField} representing a single item of {@link Multifield}
 */
@PageObject
public class MultifieldItem implements DialogField {

    @Inject
    private DialogFieldRetriever dialogFieldRetriever;

    @Inject
    @CurrentScope
    private WebElement item;

    @FindBy(css = "button.coral-Multifield-remove")
    private WebElement deleteButton;

    @Override
    public void setValue(Object value) {
        MultifieldEntry entry = (MultifieldEntry) value;
        entry.getItem().forEach(this :: setFieldInMultifield);
    }

    /**
     * Deletes this item
     */
    public void deleteItem() {
        deleteButton.click();
    }

    private void setFieldInMultifield(FieldConfig fieldConfig) {
        dialogFieldRetriever.getDialogField(item, fieldConfig.getLabel(), fieldConfig.getType())
            .setValue(fieldConfig.getValue());
    }
}
