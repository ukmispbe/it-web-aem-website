package com.waters.aem.automationtests.modules;

import com.google.inject.AbstractModule;
import com.waters.aem.automationtests.components.Text;
import com.waters.aem.automationtests.components.impl.TextImpl;

/**
 * Module for Waters components.
 */
public class WatersComponentModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(Text.class).to(TextImpl.class);
    }
}