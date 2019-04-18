package com.waters.aem.automationtests.bobcat.dialog.dialogfields.text;

import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.text.ControlToolbar;
import com.cognifide.qa.bb.javascriptexecutor.JsScripts;
import com.cognifide.qa.bb.qualifier.CurrentScope;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

/**
 * Override of {@link ControlToolbar} for AEM 6.3.
 */
@PageObject(css = ".coral-ButtonGroup.rte-toolbar.is-active")
public class ControlToolbarImpl implements ControlToolbar {

    private static final String TOOLBAR_ITEM_SELECTOR = ".rte-toolbar-item";

    @Inject
    @CurrentScope
    private WebElement scope;

    @FindBy(css = TOOLBAR_ITEM_SELECTOR + "[data-action='format#bold']")
    private WebElement toggleBoldButton;

    @FindBy(css = TOOLBAR_ITEM_SELECTOR + "[data-action='format#italic']")
    private WebElement toggleItalicButton;

    @FindBy(css = TOOLBAR_ITEM_SELECTOR + "[data-action='format#underline']")
    private WebElement toggleUnderlineButton;

    @FindBy(css = TOOLBAR_ITEM_SELECTOR + "[data-action='#justify']")
    private WebElement toggleJustifyButton;

    @FindBy(css = TOOLBAR_ITEM_SELECTOR + "[data-action='#lists']")
    private WebElement toggleListButton;

    @Inject
    private JavascriptExecutor javascriptExecutor;

    @Override
    public void selectText() {
        javascriptExecutor.executeScript(JsScripts.SELECT_ALL);
    }

    @Override
    public WebElement getScope() {
        return scope;
    }

    @Override
    public WebElement getToggleBoldButton() {
        return toggleBoldButton;
    }

    @Override
    public WebElement getToggleItalicButton() {
        return toggleItalicButton;
    }

    @Override
    public WebElement getToggleUnderlineButton() {
        return toggleUnderlineButton;
    }

    @Override
    public WebElement getToggleJustifyButton() {
        return toggleJustifyButton;
    }

    @Override
    public WebElement getToggleListButton() {
        return toggleListButton;
    }
}
