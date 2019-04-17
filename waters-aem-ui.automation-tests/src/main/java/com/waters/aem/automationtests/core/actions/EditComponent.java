package com.waters.aem.automationtests.core.actions;

import com.cognifide.qa.bb.aem.core.component.actions.ComponentData;
import com.cognifide.qa.bb.aem.core.component.toolbar.CommonToolbarOptions;
import com.cognifide.qa.bb.aem.core.component.toolbar.ComponentToolbar;
import com.cognifide.qa.bb.aem.core.sidepanel.internal.SidePanel;
import com.cognifide.qa.bb.api.actions.ActionWithData;
import com.cognifide.qa.bb.qualifier.FindPageObject;
import com.cognifide.qa.bb.qualifier.Global;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.waters.aem.automationtests.core.sidepanel.SidePanelTabs;
import io.qameta.allure.Step;

/**
 * An {@link ActionWithData} that edits the component described in {@link ComponentData}
 */
@PageObject
public class EditComponent implements ActionWithData<ComponentData> {

    @FindPageObject
    private SidePanel sidePanel;

    @Global
    @FindPageObject
    private ComponentToolbar componentToolbar;

    @Override
    @Step("Edit component")
    public void execute(ComponentData data) {
        sidePanel.selectTab(SidePanelTabs.CONTENT_TREE.getCssClass());
        sidePanel.selectComponentToEdit(data.getComponentPath(), data.getComponentName(),
            data.getComponentOrder()).click();
        componentToolbar.clickOption(CommonToolbarOptions.EDIT.getTitle());
    }
}
