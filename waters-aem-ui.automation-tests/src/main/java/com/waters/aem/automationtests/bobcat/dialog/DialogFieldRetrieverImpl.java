package com.waters.aem.automationtests.bobcat.dialog;

import com.cognifide.qa.bb.aem.core.component.dialog.DialogFieldRetriever;
import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.DialogField;
import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.Fields;
import com.cognifide.qa.bb.utils.AopUtil;
import com.cognifide.qa.bb.utils.PageObjectInjector;
import com.google.inject.Inject;
import org.apache.commons.lang3.StringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;
import java.util.Map;

import static org.apache.commons.lang3.StringUtils.containsIgnoreCase;

/**
 * Override of {@link DialogFieldRetriever} for AEM 6.3.
 */
public class DialogFieldRetrieverImpl implements DialogFieldRetriever {

    private static final By FIELD_LOCATOR = By.cssSelector(".coral-Form-fieldwrapper");

    private static final By LABEL_SELECTOR = By
        .cssSelector("label.coral-Form-fieldlabel, label.coral-Form-field");

    private static final By CHECKBOX_LABEL_SELECTOR = By
        .cssSelector("label.coral-Checkbox-description");

    private static final By IMAGE_LOCATOR = By.cssSelector(".coral-Form-field.cq-FileUpload");

    private static final By CHECKBOX_LOCATOR = By.cssSelector(".coral-Form-field.coral-Checkbox");

    private static final By RADIO_GROUP_LOCATOR =
        By.cssSelector(".coral-Form-field.coral-RadioGroup");

    private static final By SWITCH_LOCATOR = By.cssSelector(".foundation-field-edit.coral-Form-fieldwrapper");

    private static final By RICH_TEXT_LOCATOR = By.cssSelector(".cq-RichText");

    @Inject
    private Map<String, DialogField> fieldTypeRegistry;

    @Inject
    private PageObjectInjector pageObjectInjector;

    /**
     * Finds the dialog field of given type within a WebElement based on the provided label. If label is not present,
     * returns the first field from the tab.
     * <p>
     * {@inheritDoc}
     */
    @Override
    public DialogField getDialogField(WebElement parentElement, String label, String type) {
        List<WebElement> fields = getFields(parentElement, type);

        if (fields.isEmpty()) {
            throw new IllegalStateException("There are no fields in the tab");
        }

        WebElement scope = fields.stream() //
            .filter(field -> matchesLabel(field, label, type)) //
            .findFirst() //
            .orElseThrow(() -> new IllegalStateException("Dialog field not found"));

        return getFieldObject(scope, type);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public DialogField getDialogField(WebElement parentElement, String type) {
        WebElement scope = parentElement.findElement(By.tagName("input"));
        return getFieldObject(scope, type);
    }

    private boolean matchesLabel(WebElement field, String label, String type) {
        String fieldLabel = getFieldLabel(field, type);

        boolean matches;

        if (label == null) {
            matches = fieldLabel.isEmpty();
        } else {
            matches = containsIgnoreCase(fieldLabel, label);
        }

        return matches;
    }

    private List<WebElement> getFields(WebElement parentElement, String type) {
        List<WebElement> toReturn;
        switch (type) {
            case Fields.IMAGE:
                toReturn = parentElement.findElements(IMAGE_LOCATOR);
                break;
            case Fields.CHECKBOX:
                toReturn = parentElement.findElements(CHECKBOX_LOCATOR);
                break;
            case Fields.RADIO_GROUP_MULTI:
                toReturn = parentElement.findElements(RADIO_GROUP_LOCATOR);
                break;
            case Fields.RICHTEXT:
                toReturn = parentElement.findElements(RICH_TEXT_LOCATOR);
                break;
            default:
                toReturn = parentElement.findElements(FIELD_LOCATOR);
                break;
        }

        return toReturn;
    }

    /**
     * Returns the label of given field. Label may not be present in the field, thus a workaround using list is
     * introduced here.
     *
     * @param field WebElement corresponding to the given field
     * @return label of the field or {@code StringUtils.Empty} when there is none
     */
    private String getFieldLabel(WebElement field, String type) {
        List<WebElement> labelField =
            type.equals(Fields.CHECKBOX) ? field.findElements(CHECKBOX_LABEL_SELECTOR)
                : field.findElements(LABEL_SELECTOR);
        return labelField.isEmpty() ? StringUtils.EMPTY : labelField.get(0).getText();
    }

    private DialogField getFieldObject(WebElement scope, String type) {
        DialogField dialogField = fieldTypeRegistry.get(type);
        return (DialogField) pageObjectInjector
            .inject(AopUtil.getBaseClassForAopObject(dialogField.getClass()), scope);
    }
}
