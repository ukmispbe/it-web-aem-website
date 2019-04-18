package com.waters.aem.automationtests.bobcat.actions;

import com.cognifide.qa.bb.aem.core.component.actions.ConfigureComponentData;
import com.cognifide.qa.bb.aem.core.component.configuration.ComponentConfigReader;
import com.cognifide.qa.bb.aem.core.component.configuration.ComponentConfiguration;
import com.cognifide.qa.bb.aem.core.component.dialog.ConfigDialog;
import com.cognifide.qa.bb.aem.core.component.toolbar.CommonToolbarOptions;
import com.cognifide.qa.bb.aem.core.component.toolbar.ComponentToolbar;
import com.cognifide.qa.bb.aem.core.sidepanel.internal.SidePanel;
import com.cognifide.qa.bb.api.actions.ActionWithData;
import com.cognifide.qa.bb.qualifier.FindPageObject;
import com.cognifide.qa.bb.qualifier.Global;
import com.cognifide.qa.bb.qualifier.PageObject;
import com.google.inject.Inject;
import com.waters.aem.automationtests.bobcat.sidepanel.SidePanelTabs;
import io.qameta.allure.Step;

/**
 * An {@link ActionWithData} that configures an AEM component. Consumes {@link ConfigureComponentData}.
 */
@PageObject
public class ConfigureComponent implements ActionWithData<ConfigureComponentData> {

    @Inject
    private ComponentConfigReader componentConfigReader;

    @Global
    @FindPageObject
    private ConfigDialog configDialog;

    @FindPageObject
    private SidePanel sidePanel;

    @Global
    @FindPageObject
    private ComponentToolbar componentToolbar;

    @SuppressWarnings("unchecked")
    @Override
    @Step("Configure component")
    public void execute(ConfigureComponentData data) {
        selectComponent(data);
        componentToolbar.clickOption(CommonToolbarOptions.CONFIGURE.getTitle());
        ComponentConfiguration componentConfiguration =
            componentConfigReader.readConfiguration(data.getConfigLocation());
        configDialog.configureWith(componentConfiguration);
    }

    private void selectComponent(ConfigureComponentData actionData) {
        sidePanel.selectTab(SidePanelTabs.CONTENT_TREE.getCssClass());
        sidePanel.selectComponentToEdit(actionData.getComponentPath(), actionData.getComponentName(),
            actionData.getComponentOrder()).click();
    }
}
