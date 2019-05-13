package com.waters.aem.automationtests.bobcat.dialog.dialogfields;

import com.cognifide.qa.bb.aem.core.component.dialog.dialogfields.DialogField;
import com.cognifide.qa.bb.dragdrop.DragAndDropFactory;
import com.cognifide.qa.bb.qualifier.FindPageObject;
import com.cognifide.qa.bb.qualifier.Global;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.waters.aem.automationtests.bobcat.sidepanel.SidePanelImpl;
import com.waters.aem.automationtests.bobcat.sidepanel.SidePanelTabs;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import com.cognifide.qa.bb.dragdrop.Draggable;
import com.cognifide.qa.bb.dragdrop.Droppable;
import com.cognifide.qa.bb.scope.frame.FramePath;

import javax.inject.Inject;

/**
 * This class represents Image dialog field with drag'n'drop functionality.
 */
@PageObject
public class Image implements DialogField {

    @Inject
    private DragAndDropFactory dragAndDropFactory;

    @Global
    @FindPageObject
    private SidePanelImpl sidePanel;

    @FindBy(css = ".cq-FileUpload-thumbnail")
    private WebElement dropArea;

    /**
     * Sets image assets in image component.
     *
     * @param value string data path to desired asset.
     */
    @Override
    public void setValue(Object value) {
        sidePanel.selectTab(SidePanelTabs.ASSETS.getCssClass());
        Draggable draggable = sidePanel.searchForAsset(String.valueOf(value));
        Droppable droppable = dragAndDropFactory.createDroppable(dropArea, FramePath.parsePath("/"));
        draggable.dropTo(droppable);
    }


}
