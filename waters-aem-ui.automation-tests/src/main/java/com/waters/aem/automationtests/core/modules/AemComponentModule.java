package com.waters.aem.automationtests.core.modules;

import com.cognifide.qa.bb.aem.core.api.AemActions;
import com.cognifide.qa.bb.aem.core.component.dialog.ConfigDialog;
import com.cognifide.qa.bb.aem.core.component.dialog.DialogFieldRetriever;
import com.cognifide.qa.bb.aem.core.component.toolbar.CommonToolbarOption;
import com.cognifide.qa.bb.aem.core.component.toolbar.CommonToolbarOptions;
import com.cognifide.qa.bb.aem.core.component.toolbar.ComponentToolbar;
import com.cognifide.qa.bb.aem.core.component.toolbar.ToolbarOption;
import com.cognifide.qa.bb.api.actions.ActionWithData;
import com.google.inject.multibindings.MapBinder;
import com.waters.aem.automationtests.core.actions.ConfigureComponent;
import com.waters.aem.automationtests.core.actions.EditComponent;
import com.waters.aem.automationtests.core.dialog.ConfigDialogImpl;
import com.waters.aem.automationtests.core.dialog.DialogFieldRetrieverImpl;
import com.waters.aem.automationtests.core.toolbar.ComponentToolbarImpl;

import java.util.Arrays;

/**
 * Module that contains bindings for AEM 6.3 components.
 */
public class AemComponentModule extends com.cognifide.qa.bb.aem.core.modules.AemComponentModule {

    @Override
    protected void configure() {
        bindComponentActions();
        bind(ComponentToolbar.class).to(ComponentToolbarImpl.class);
        bind(ConfigDialog.class).to(ConfigDialogImpl.class);
        bind(DialogFieldRetriever.class).to(DialogFieldRetrieverImpl.class);
        bindCommonToolbarOptions();
    }

    private void bindComponentActions() {
        MapBinder<String, ActionWithData> componentActions =
            MapBinder.newMapBinder(binder(), String.class, ActionWithData.class);

        componentActions.addBinding(AemActions.EDIT_COMPONENT).to(EditComponent.class);
        componentActions.addBinding(AemActions.CONFIGURE_COMPONENT)
            .to(ConfigureComponent.class);
    }

    private void bindCommonToolbarOptions() {
        MapBinder<String, ToolbarOption> toolbarOptions =
            MapBinder.newMapBinder(binder(), String.class, ToolbarOption.class);

        Arrays.stream(CommonToolbarOptions.values()).forEach(
            option -> toolbarOptions.addBinding(option.getTitle())
                .toInstance(new CommonToolbarOption(option.getTitle())));
    }
}
