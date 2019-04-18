package com.waters.aem.automationtests.bobcat.modules;

import com.cognifide.qa.bb.aem.core.modules.AemConfigModule;
import com.cognifide.qa.bb.aem.core.modules.AemCoreModule;
import com.cognifide.qa.bb.aem.core.modules.AemLoginModule;
import com.cognifide.qa.bb.aem.core.modules.AemPageModule;
import com.cognifide.qa.bb.aem.core.modules.AemSitesAdminModule;
import com.cognifide.qa.bb.aem.core.modules.SlingPageActionsModule;
import com.google.inject.AbstractModule;

/**
 * Overrides default Bobcat AEM 6.4 module.
 */
public class Aem63FullModule extends AbstractModule {

    @Override
    protected void configure() {
        install(new AemCoreModule());
        install(new AemLoginModule());
        install(new AemSitesAdminModule());
        install(new SlingPageActionsModule());
        install(new AemComponentModule());
        install(new AemSidePanelModule());
        install(new AemPageModule());
        install(new AemFieldsModule());
        install(new AemConfigModule());
    }
}
