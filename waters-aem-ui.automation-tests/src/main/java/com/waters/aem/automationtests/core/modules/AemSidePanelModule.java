package com.waters.aem.automationtests.core.modules;

import com.cognifide.qa.bb.aem.core.sidepanel.internal.SidePanel;
import com.cognifide.qa.bb.aem.core.sidepanel.internal.SidePanelTabBar;
import com.google.inject.AbstractModule;
import com.waters.aem.automationtests.core.sidepanel.SidePanelImpl;
import com.waters.aem.automationtests.core.sidepanel.SidePanelTabBarImpl;

/**
 * Overridden bindings for AEM's Side Panel.
 */
public class AemSidePanelModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(SidePanel.class).to(SidePanelImpl.class);
        bind(SidePanelTabBar.class).to(SidePanelTabBarImpl.class);
    }
}
