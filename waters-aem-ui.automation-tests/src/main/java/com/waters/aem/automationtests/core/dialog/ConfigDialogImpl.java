package com.waters.aem.automationtests.core.dialog;

import com.cognifide.qa.bb.aem.core.component.AuthorLoader;
import com.cognifide.qa.bb.aem.core.component.configuration.ComponentConfiguration;
import com.cognifide.qa.bb.aem.core.component.configuration.FieldConfig;
import com.cognifide.qa.bb.aem.core.component.dialog.ConfigDialog;
import com.cognifide.qa.bb.aem.core.component.dialog.DialogFieldRetriever;
import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.DialogField;
import com.cognifide.qa.bb.constants.HtmlTags;
import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.cognifide.qa.bb.wait.BobcatWait;
import com.google.inject.Inject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.List;

import static org.apache.commons.lang3.StringUtils.containsIgnoreCase;
import static org.openqa.selenium.support.ui.ExpectedConditions.invisibilityOfElementLocated;
import static org.openqa.selenium.support.ui.ExpectedConditions.visibilityOf;

/**
 * Default implementation of {@link ConfigDialog} for AEM 6.4
 */
@PageObject(css = ConfigDialogImpl.FORM_CQ_DIALOG)
public class ConfigDialogImpl implements ConfigDialog {

    public static final String FULLSCREEN_CLASS = "cq-dialog-fullscreen";

    static final String FORM_CQ_DIALOG = "form.cq-dialog";

    @Inject
    private BobcatWait bobcatWait;

    @Inject
    private AuthorLoader authorLoader;

    @Inject
    @CurrentScope
    private WebElement currentScope;

    @Inject
    private DialogFieldRetriever dialogConfigurer;

    @Inject
    @CurrentScope
    private WebElement dialog;

    @FindBy(css = "button.cq-dialog-submit")
    private WebElement okButton;

    @FindBy(css = "button.cq-dialog-layouttoggle")
    private WebElement toggleFullscreenButton;

    @FindBy(css = ".coral-Tab")
    private List<WebElement> tabs;

    @FindBy(css = ".coral-Panel.is-selected")
    private WebElement activeTab;

    /**
     * Method used to verify if this element is visible.
     */
    @Override
    public void verifyIsDisplayed() {
        authorLoader.verifyIsHidden();
        bobcatWait.until(visibilityOf(currentScope));
    }

    /**
     * Method can be used to verify if this element is hidden.
     */
    @Override
    public void verifyIsHidden() {
        authorLoader.verifyIsHidden();
        bobcatWait.until(invisibilityOfElementLocated(By.cssSelector(FORM_CQ_DIALOG)));
    }

    /**
     * Method can be used to determine if dialog is open in fullscreen.
     */
    @Override
    public void verifyFullscreen() {
        bobcatWait.until(webDriver -> containsIgnoreCase(dialog.getAttribute(HtmlTags.Attributes.CLASS),
            FULLSCREEN_CLASS));
    }

    /**
     * Method used to confirm changes in the dialog
     */
    @Override
    public void confirm() {
        okButton.click();
        verifyIsHidden();
    }

    /**
     * Method used to toggle dialog in fullscreen mode.
     */
    @Override
    public void toggleFullscreen() {
        toggleFullscreenButton.click();
        verifyFullscreen();
    }

    /**
     * Method used to configure component with specified config in parameter
     *
     * @param config ComponentConfiguration
     */
    @Override
    public void configureWith(ComponentConfiguration config) {
        verifyIsDisplayed();
        configure(config);
        confirm();
    }

    /**
     * Method used to access DialogField for further configuration.
     *
     * @param label Label of element to access
     * @param tab Name of a tab that element is placed on
     * @param fieldType Type of field we would like to access
     * @return DialogField with our field
     */
    @Override
    public DialogField getFieldOnTab(String label, String tab, String fieldType) {
        switchTab(tab);
        return getField(label, fieldType);
    }

    /**
     * Method used to configure a field on a dialog.
     *
     * @param label Label of field to configure
     * @param fieldType Type of field to configure
     * @param value Value that field will be filled with
     * @return ConfigDialog this instance
     */
    @Override
    public ConfigDialog setField(String label, String fieldType, Object value) {
        getField(label, fieldType).setValue(value);
        return this;
    }

    /**
     * Method can be used to access a field on currently opened tab
     *
     * @param label Field's label to access
     * @param fieldType Type of field to access
     * @return DialogField with our field
     */
    @Override
    public DialogField getField(String label, String fieldType) {
        WebElement parent = determineParentScope();
        return dialogConfigurer.getDialogField(parent, label, fieldType);
    }

    /**
     * Method used to change actual opened tab on a dialog
     *
     * @param tabLabel Label of tab to be opened
     * @return ConfigDialog this instance
     */
    @Override
    public ConfigDialog switchTab(String tabLabel) {
        if (!tabs.isEmpty()) {
            tabs.stream() //
                .filter(tab -> containsIgnoreCase(tab.getText(), tabLabel)) //
                .findFirst() //
                .orElseThrow(() -> new IllegalStateException("Tab not found")) //
                .click();
        }
        return this;
    }

    private void configure(ComponentConfiguration config) {
        config.getTabs().forEach(tab -> {
            switchTab(tab.getTabName());
            setFields(config.getConfigurationForTab(tab.getTabName()));
        });
    }

    private void setFields(List<FieldConfig> value) {
        WebElement parent = determineParentScope();
        value.forEach(fieldConfig -> dialogConfigurer
            .getDialogField(parent, fieldConfig.getLabel(), fieldConfig.getType())
            .setValue(fieldConfig.getValue()));
    }

    private WebElement determineParentScope() {
        WebElement parent;
        if (tabs.isEmpty()) {
            parent = dialog;
        } else {
            parent = activeTab;
        }
        return parent;
    }
}
