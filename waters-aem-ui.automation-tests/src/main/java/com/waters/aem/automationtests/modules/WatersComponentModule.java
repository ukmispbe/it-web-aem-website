package com.waters.aem.automationtests.modules;

import com.google.inject.AbstractModule;
import com.waters.aem.automationtests.components.*;
import com.waters.aem.automationtests.components.impl.*;

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
        bind(Header.class).to(HeaderImpl.class);
        bind(Footer.class).to(FooterImpl.class);
        bind(Links.class).to(LinksImpl.class);
        bind(Button.class).to(ButtonImpl.class);
        bind(Modal.class).to(ModalImpl.class);
        bind(Iframe.class).to(IframeImpl.class);
        bind(Notification.class).to(NotificationImpl.class);


    }
}