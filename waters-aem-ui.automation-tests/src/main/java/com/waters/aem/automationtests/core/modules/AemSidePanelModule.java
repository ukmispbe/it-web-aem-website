/*-
 * #%L
 * Bobcat
 * %%
 * Copyright (C) 2018 Cognifide Ltd.
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */
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
