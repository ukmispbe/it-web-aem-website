package com.waters.aem.automationtests.modules;

import com.google.inject.AbstractModule;
import com.waters.aem.automationtests.components.Anchor;
import com.waters.aem.automationtests.components.Text;
import com.waters.aem.automationtests.components.Title;
import com.waters.aem.automationtests.components.Image;
import com.waters.aem.automationtests.components.ExternalHeader;
import com.waters.aem.automationtests.components.impl.AnchorImpl;
import com.waters.aem.automationtests.components.impl.TextImpl;
import com.waters.aem.automationtests.components.impl.TitleImpl;
import com.waters.aem.automationtests.components.impl.ImageImpl;
import com.waters.aem.automationtests.components.impl.ExternalHeaderImpl;

/**
 * Module for Waters components.
 */
public class WatersComponentModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(Text.class).to(TextImpl.class);
        bind(Title.class).to(TitleImpl.class);
        bind(Anchor.class).to(AnchorImpl.class);
        bind(Image.class).to(ImageImpl.class);
        bind(ExternalHeader.class).to(ExternalHeaderImpl.class);
    }
}