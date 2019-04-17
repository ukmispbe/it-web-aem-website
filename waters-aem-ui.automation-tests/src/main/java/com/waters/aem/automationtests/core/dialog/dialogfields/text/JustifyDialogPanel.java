package com.waters.aem.automationtests.core.dialog.dialogfields.text;

import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.DialogField;
import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.text.ControlToolbar;
import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.text.JustifyControls;
import com.cognifide.qa.bb.qualifier.FindPageObject;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.cognifide.qa.bb.wait.BobcatWait;
import com.google.inject.Inject;
import org.openqa.selenium.support.FindBy;

/**
 * Represents text justification dialog field.
 */
@PageObject
public class JustifyDialogPanel implements DialogField {

    @FindPageObject
    private ControlToolbar controlToolbar;

    @FindBy(css = ".coral-Popover[data-id='justify'] .coral-Popover-content")
    private JustifyControls justifyControls;

    @Inject
    private BobcatWait bobcatWait;

    /**
     * Performs one of justification actions depending on passed parameter value:
     * <ul>
     * <li>JUSTIFY_LEFT</li>
     * <li>JUSTIFY_RIGHT</li>
     * <li>JUSTIFY_CENTER</li>
     * </ul>
     *
     * @param value string value representing desired action.
     */
    @Override
    public void setValue(Object value) {
        String actionText = (String) value;
        JustifyPanelActions action = JustifyPanelActions.valueOf(actionText.toUpperCase());

        switch (action) {
            case JUSTIFY_LEFT:
                openJustifyPopover();
                justifyControls.getJustifyLeftBtn().click();
                break;
            case JUSTIFY_CENTER:
                openJustifyPopover();
                justifyControls.getJustifyCenterBtn().click();
                break;
            case JUSTIFY_RIGHT:
                openJustifyPopover();
                justifyControls.getJustifyRightBtn().click();
                break;
            default:
                throw new IllegalArgumentException("There is no action defined for " + actionText);
        }
    }

    private void openJustifyPopover() {
        controlToolbar.selectText();
        bobcatWait.until(input -> controlToolbar.getToggleJustifyButton().isEnabled());
        controlToolbar.getToggleJustifyButton().click();
    }

    private enum JustifyPanelActions {
        JUSTIFY_LEFT,
        JUSTIFY_CENTER,
        JUSTIFY_RIGHT
    }
}
